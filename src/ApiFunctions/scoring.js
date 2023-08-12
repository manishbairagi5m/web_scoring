
export const matchObj = JSON.parse(localStorage.getItem("matches_obj"))
export const extraTypeEnum = ['WD','NB','BYE','LB']

export const getStriker = (delivery,lastBall=false) => {
    let odds = [0,1,3,5]
    let evens = [2,4,6,8]
    let totalRun = Number(delivery.runs) + (delivery?.extras?.run && Number(delivery.extras.run) || 0)
    let obj = {striker:delivery.striker,non_striker:delivery.non_striker}
    if(lastBall){
        if(evens.includes(totalRun)){
            obj.striker = delivery.non_striker
            obj.non_striker = delivery.striker
        }
    }else{
        if(odds.includes(totalRun)){
            obj.striker = delivery.non_striker
            obj.non_striker = delivery.striker
        }
    }
    return obj
}

export const addRunApi = (teamname,delivery_obj) => {
    let matchObjCopy = matchObj
    let ball = String(Number(delivery_obj.ball).toFixed(1)).split(".")
    let inning_obj = matchObjCopy.innings[0].team === teamname ? matchObjCopy.innings[0] : matchObjCopy.innings[1]
    if(inning_obj.overs.length > 0){
        if(Number(ball[1]) === 1 && (!delivery_obj?.extras?.type || ["BYE","LB"].includes(delivery_obj?.extras?.type))){
            inning_obj.overs.push({over:inning_obj.overs.length,deliveries:[{...delivery_obj}]})
            inning_obj = {...inning_obj,...getStriker(delivery_obj,true),bowler:delivery_obj.bowler}
        }else{
            inning_obj.overs[inning_obj.overs.length -1].deliveries.push(delivery_obj)
            inning_obj = {...inning_obj,...getStriker(delivery_obj),bowler:delivery_obj.bowler}
        }
    }else{
        inning_obj.overs.push({over:inning_obj.overs.length,deliveries:[{...delivery_obj}]})
        inning_obj = {...inning_obj,...getStriker(delivery_obj),bowler:delivery_obj.bowler}
    }
    if(matchObjCopy.innings[0].team === teamname){
        matchObjCopy.innings[0] = {...inning_obj}
    }else{
        matchObjCopy.innings[1] = {...inning_obj}
    }
    localStorage.setItem("matches_obj",JSON.stringify(matchObjCopy))
    return matchObjCopy
}

export const getMatchDetailData = () => {
    let matchObjCopy = matchObj
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
                newinning.wicket_lost += (del?.wickets && 1 || 0)
                newinning.run_rate = ((newinning.run_scored / getBallFromOver(newinning.overPlayed)) * 6).toFixed(2)
                newinning.batsman = {...newinning.batsman,[del.striker]:{...getBatsmanData(newinning.batsman[del.striker],del)}}
                newinning.bowler = {...newinning.bowler,[del.bowler]:{...getBowlerData(newinning.bowler[del.bowler],del)}}
            }
        }
    }
    return newinning
}

export const getBowlerData = (bowlername,del) => {
    let run_conceeded = (del?.extras?.type && (del.extras.type !== 'BYE' || del.extras.type !== 'LB')) && del.runs || (del.runs+(del?.extras?.run || 0))
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
            strike_rate : (batsmanname.run_scored / (ball_faced && ball_faced>0 && ball_faced && 1)) * 100
        }
    }
 
    return batsmanname
}

const getBallFromOver = (ov) => {
    let over = String(Number(ov).toFixed(1)).split(".")
    return ((Number(over[0]) * 6) + Number(over[1]))
}

const getApproxOvers = (overs) => {
    return (
      (String(overs).split(".")[1] === "6" &&
        String(Number(String(overs).split(".")[0]) + 1)) ||
      overs
    );
  }