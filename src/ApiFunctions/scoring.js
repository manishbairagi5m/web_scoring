
export const matchObj = localStorage.getItem("matches_obj")
export const extraTypeEnum = ['WD','NB','BYE','LB']

export const getStriker = (delivery,lastBall=false) => {
    let odds = [0,1,3,5]
    let evens = [2,4,6,8]
    let totalRun = Number(delivery.runs) + (delivery?.extras?.run && Number(delivery.extras.run) || 0)
    let obj = {striker:delivery.striker,non_striker:delivery.non_striker}
    if(lastBall){
        if(evens.includes(totalRun)){
            obj.striker = delivery.non_striker
            obj.non_striker = delivery._striker
        }
    }else{
        if(odds.includes(totalRun)){
            obj.striker = delivery.non_striker
            obj.non_striker = delivery._striker
        }
    }
    return obj
}

export const addRunApi = (teamname,delivery_obj) => {
    let matchObjCopy = matchObj
    let inning_obj = matchObjCopy.innings[0].team === teamname ? matchObjCopy.innings[0] : matchObjCopy.innings[1]
    if(inning_obj.overs.length > 0){
        let last_delivery = inning_obj.overs[inning_obj.overs.length -1].deliveries[inning_obj.overs[inning_obj.overs.length -1].deliveries]
        if(ball === "0.6" && (!last_delivery.extras.type || ["BYE","LB"].includes(last_delivery.extras.type))){
            inning_obj.overs.push({over:inning_obj.overs.length,deliveries:[{...delivery_obj}]})
            inning_obj = {...inning_obj,...getStriker(delivery_obj,true)}
        }else{
            inning_obj.overs[inning_obj.overs.length -1].deliveries.push(delivery_obj)
            inning_obj = {...inning_obj,...getStriker(delivery_obj)}
        }
    }else{
        inning_obj.overs.push({over:inning_obj.overs.length,deliveries:[{...delivery_obj}]})
        inning_obj = {...inning_obj,...getStriker(delivery_obj)}
    }
    if(matchObjCopy.innings[0].team === teamname){
        matchObjCopy.innings[0] = {...inning_obj}
    }else{
        matchObjCopy.innings[1] = {...inning_obj}
    }
    localStorage.setItem("matches_obj",matchObjCopy)
}

