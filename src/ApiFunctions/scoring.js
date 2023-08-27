
export const matchObj = JSON.parse(localStorage.getItem("matches_obj"))
export const extraTypeEnum = ['WD','NB','BYE','LB']

export const getStriker = (delivery,lastBall=false,newBatsman=null) => {
    let odds = [1,3,5,7]
    let evens = [0,2,4,6]
    let totalRun = Number(delivery.runs) + (delivery?.extras?.run && Number(delivery.extras.run) || 0)
    let obj = {striker:delivery.striker,non_striker:delivery.non_striker}
    if(newBatsman){
        if(delivery.striker === delivery.wicket.player_out){
            obj.striker = newBatsman
        }else if(delivery.non_striker === delivery.wicket.player_out){
            obj.non_striker = newBatsman
        }
    }
    if(lastBall){
        if(evens.includes(totalRun)){
            let temp = obj.striker
            obj.striker = obj.non_striker
            obj.non_striker = temp
        }
    }else{
        if(odds.includes(totalRun)){
            let temp = obj.striker
            obj.striker = obj.non_striker
            obj.non_striker = temp
        }
    }
    return obj
}

export const changeInning = (striker,non_striker,bowler) => {
    let matchObjCopy = matchObj
    matchObjCopy.innings[1].striker = striker
    matchObjCopy.innings[1].non_striker = non_striker
    matchObjCopy.innings[1].bowler = bowler
    localStorage.setItem("matches_obj",JSON.stringify(matchObjCopy))
    return matchObjCopy
}

export const endMatch = (match_obj) => {
    let matchDetailedData = getMatchDetailData()
    let outcome = {winner:null,by:{}}
    if(matchDetailedData[1].run_scored > matchDetailedData[0].run_scored){
        outcome = {winner : matchDetailedData[1].team,by:{
            wickets:(match_obj.info.players[match_obj.innings[1].team].length-matchDetailedData[1].wicket_lost)-1}}
    }else if(Number(matchDetailedData[0].run_scored) && (Number(matchDetailedData[1].run_scored) === Number(matchDetailedData[0].run_scored))){
        outcome = {winner:"draw",by:{}}
    }else if(((match_obj.info.players[match_obj.innings[1].team].length-1) === match_obj.innings[1].wicket_lost) 
    || getApproxOvers(matchDetailedData[1].overPlayed) === getApproxOvers(match_obj.info.overs)){
        outcome = {winner : matchDetailedData[0].team,by:{
            runs:matchDetailedData[0].run_scored > matchDetailedData[1].run_scored}}
    }else{
        outcome = {winner:"no result",by:{}}
    }
    return outcome
}

export const undoInning = (match_obj,team) => {
    let matchCopy = JSON.parse(JSON.stringify(match_obj))
    if(matchCopy.innings[1].team === team && matchCopy.innings[1].overs.length > 0){
        matchCopy.innings[1].overs[matchCopy.innings[1].overs.length-1].deliveries.pop()
    }else if(matchCopy.innings[0].team === team && matchCopy.innings[0].overs.length > 0) {
        matchCopy.innings[0].overs[matchCopy.innings[0].overs.length-1].deliveries.pop()
    }
    localStorage.setItem("matches_obj",JSON.stringify(matchCopy))
    return matchCopy
}

export const addRunApi = (teamname,delivery_obj,new_batsman=null) => {
    let matchObjCopy = matchObj
    let ball = String(Number(delivery_obj.ball).toFixed(1)).split(".")
    let inning_obj = matchObjCopy.innings[0].team === teamname ? matchObjCopy.innings[0] : matchObjCopy.innings[1]
    if(inning_obj.overs.length > 0){
        if(Number(ball[1]) === 1){
            inning_obj.overs.push({over:inning_obj.overs.length,deliveries:[{...delivery_obj}]})
            inning_obj = {...inning_obj,...getStriker(delivery_obj,false,new_batsman),bowler:delivery_obj.bowler}
        }else if(Number(ball[1]) === 6 && (!delivery_obj?.extras?.type || ["BYE","LB"].includes(delivery_obj?.extras?.type))){
            inning_obj.overs[inning_obj.overs.length -1].deliveries.push(delivery_obj)
            inning_obj = {...inning_obj,...getStriker(delivery_obj,true,new_batsman),bowler:delivery_obj.bowler}
        }else{
            inning_obj.overs[inning_obj.overs.length -1].deliveries.push(delivery_obj)
            inning_obj = {...inning_obj,...getStriker(delivery_obj,false,new_batsman),bowler:delivery_obj.bowler}
        }
    }else{
        inning_obj.overs.push({over:inning_obj.overs.length,deliveries:[{...delivery_obj}]})
        inning_obj = {...inning_obj,...getStriker(delivery_obj,false,new_batsman),bowler:delivery_obj.bowler}
    }
    if(matchObjCopy.innings[0].team === teamname){
        matchObjCopy.innings[0] = {...inning_obj}
    }else{
        matchObjCopy.innings[1] = {...inning_obj}
    }
    localStorage.setItem("matches_obj",JSON.stringify(matchObjCopy))
    return matchObjCopy
}

export const getMatchDetailData = (runningMatchData=null) => {
    let matchObjCopy = runningMatchData || matchObj
    let innings = []
    innings[0] = {
        team : matchObjCopy.innings[0].team,
        ...getInningDetailedData(matchObjCopy,matchObjCopy.innings[0].team)
    }
    innings[1] = {
        team : matchObjCopy.innings[1].team,
        ...getInningDetailedData(matchObjCopy,matchObjCopy.innings[1].team)
    }
    return innings
}

export const getInningDetailedData = (matchdata,team) => {
    let inning_obj = matchdata.innings[0].team === team ? matchdata.innings[0] : matchdata.innings[1]
    let newinning = {
        run_scored : 0,
        wicket_lost : 0,
        overPlayed : 0,
        run_rate : 0,
        batsman : {
            [inning_obj.striker]:{ run_scored : 0,ball_faced : 0,fours : 0,sixes : 0,strike_rate : 0},
            [inning_obj.non_striker]:{ run_scored : 0,ball_faced : 0,fours : 0,sixes : 0,strike_rate : 0}},
        bowler : {},
        didNotBat : [],
        extras : {WD:0,NB:0,BYE:0,LB:0},
    }
    if(inning_obj.overs.length === 0){
        return newinning
    }else{
        let last_delivery = inning_obj.overs[inning_obj.overs.length-1].deliveries[inning_obj.overs[inning_obj.overs.length-1].deliveries.length-1]
        newinning.overPlayed = last_delivery.ball
        for(let i=0;i<inning_obj.overs.length;i++){
            for(let j=0;j<inning_obj.overs[i].deliveries.length;j++){
                let del = inning_obj.overs[i].deliveries[j]
                let totalDelRun = Number(del.runs) + (del?.extras?.run && Number(del.extras.run) || 0)
                if(del?.extras && del.extras.type === 'LB' && del.extras.type === 'BYE'){
                    newinning.run_scored += Number(totalDelRun)
                    newinning.extras[del.extras.type] += Number(del.extras.run)
                }else if(del?.extras?.type){
                    newinning.run_scored += (Number(totalDelRun)+1)
                    newinning.extras[del.extras.type] += (Number(del.extras.run)+1)
                }else{
                    newinning.run_scored += Number(totalDelRun)
                }
                newinning.wicket_lost += (del?.wicket && 1 || 0)
                newinning.run_rate = ((newinning.run_scored / getBallFromOver(newinning.overPlayed)) * 6).toFixed(2)
                newinning.batsman = {...newinning.batsman,[del.striker]:{...getBatsmanData(newinning.batsman[del.striker],del)}}
                newinning.bowler = {...newinning.bowler,[del.bowler]:{...getBowlerData(newinning.bowler[del.bowler],del)}}
            }
        }
    }
    return newinning
}

export const getBowlerData = (bowlername,del) => {
    let run_conceeded = (del?.extras?.type && (del.extras.type === 'BYE' || del.extras.type === 'LB')) && del.runs 
                        || (del.runs+(del?.extras && del.extras.run+1 || 0))
    let over_bowled = bowlername?.over_bowled 
                    ? getApproxOvers(bowlername.over_bowled).split(".")[0] +"."+ String(Number(del.ball).toFixed(1)).split(".")[1] 
                    : (!del?.extras?.type || (del.extras.type === 'BYE' || del.extras.type === 'LB')) && "0.1" || "0"
    
    if(bowlername){
        bowlername = {
            run_conceeded : run_conceeded + Number(bowlername.run_conceeded),
            over_bowled : over_bowled,
            wicket : (del?.wicket && (del.wicket.kind !== 'run_out' || del.wicket.kind !== 'retired' || del.wicket.kind !== 'run_out_mankand')) 
                    && (Number(bowlername.wicket)+1) || (Number(bowlername.wicket)+0),
            economy : (((run_conceeded + Number(bowlername.run_conceeded)) / (getBallFromOver(over_bowled))) * 6).toFixed(2)
        }
    }else{
        bowlername = {
            run_conceeded : run_conceeded,
            over_bowled : over_bowled,
            wicket : (del?.wicket && (del.wicket.kind !== 'run_out' || del.wicket.kind !== 'retired' || del.wicket.kind !== 'run_out_mankand')) && 1 || 0,
            economy : (run_conceeded / (Number(getBallFromOver(over_bowled)) > 0 && getBallFromOver(over_bowled) || 1)) * 6
        }
    }
    return bowlername
}
export const getBatsmanData = (batsmanname,del) => {
        let ball_faced = (del?.extras?.type !== 'WD' || del?.extras?.type !== 'NB') && 0 || 1
        if(batsmanname){
            batsmanname = {
                run_scored : batsmanname.run_scored + del.runs,
                ball_faced : batsmanname.ball_faced + ball_faced,
                fours : batsmanname.fours + (del.runs === 4 ? 1 : 0),
                sixes : batsmanname.sixes + (del.runs === 6 ? 1 : 0),
                strike_rate : (((batsmanname.run_scored + del.runs) / (batsmanname.ball_faced+ball_faced>0 ? batsmanname.ball_faced+ball_faced : 1)) * 100).toFixed(2)
            }
        }else{
        batsmanname = {
            run_scored : del?.runs,
            ball_faced : ball_faced,
            fours : del.runs === 4 ? 1 : 0,
            sixes : del.runs === 6 ? 1 : 0,
            strike_rate : (del.runs / (ball_faced && ball_faced>0 && ball_faced && 1)) * 100
        }
    }
 
    return batsmanname
}

export const getBallFromOver = (ov) => {
    let over = String(Number(ov).toFixed(1)).split(".")
    return ((Number(over[0]) * 6) + Number(over[1]))
}

export const getApproxOvers = (overs) => {
    return (
      (String(overs).split(".")[1] === "6" &&
        String(Number(String(overs).split(".")[0]) + 1)) ||
      overs
    );
  }

export const getOutCome = (match_Obj) => {
    let matchDetailedData = getMatchDetailData()
    let outcome = ""
    if(match_Obj.info?.outcome){
        outcome = `${match_Obj.info.outcome.winner} won by ${match_Obj.info.outcome.by?.wicket 
            ? match_Obj.info.outcome.by.wicket+"Wicket" 
            : match_Obj.info.outcome.by?.runs+"Runs"}`
    }else{
        if(matchDetailedData[1].run_scored > matchDetailedData[0].run_scored){
            outcome = `${match_Obj.innings[1].team} won by ${(match_Obj.info.players[match_Obj.innings[1].team].length-1)-Number(matchDetailedData[1].wicket_lost)} wickets`
        }else if(((match_Obj.info.players[match_Obj.innings[1].team].length-1) === match_Obj.innings[1].wicket_lost) 
                || getApproxOvers(matchDetailedData[1].overPlayed) === getApproxOvers(match_Obj.info.overs)){
            outcome = `${match_Obj.innings[0].team} won by ${matchDetailedData[0].run_scored-matchDetailedData[1].run_scored} runs`
        }else if(match_Obj.innings[1]?.striker){
            outcome = `${match_Obj.innings[1].team} need ${(matchDetailedData[0].run_scored-matchDetailedData[1].run_scored)
                +1} run in ${getBallFromOver(match_Obj.info.overs)-getBallFromOver(matchDetailedData[1].overPlayed)} ball to win`
        }else{
            outcome = `${match_Obj.info.toss.winner} won the toss and elected to ${match_Obj.info.toss.decision.toLowerCase()} first`
        }
    }
    return outcome
}

export const getForceOutCome = (match_obj) => {
    let matchDetailedData = getMatchDetailData()
    let outcome = ""
    if(matchDetailedData[1].run_scored > matchDetailedData[0].run_scored){
        outcome = `${matchDetailedData[1].team} won by ${(match_obj.info.players[match_obj.innings[1].team].length-matchDetailedData[1].wicket_lost)-1} wickets`
    }else if(Number(Number(matchDetailedData[0].run_scored)>0 && (matchDetailedData[1].run_scored) === Number(matchDetailedData[0].run_scored))){
        outcome = "Match Draw"
    }else if(((match_obj.info.players[match_obj.innings[1].team].length-1) === match_obj.innings[1].wicket_lost) 
    || getApproxOvers(matchDetailedData[1].overPlayed) === getApproxOvers(match_obj.info.overs)){
        outcome = `${matchDetailedData[0].team} won by ${matchDetailedData[0].run_scored > matchDetailedData[1].run_scored} runs`
    }else{
        outcome = "no result"
    }
    return outcome
}