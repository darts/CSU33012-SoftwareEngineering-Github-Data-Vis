let switcharoo = function(theSwitch){
    theSwitch.forEach(element => {
        if(document.getElementById(element).style.visibility == 'hidden'){
            seek([element])
        }else{
            hide([element])
        }
    });
}

let hide = function(thingsToHide){
    thingsToHide.forEach(element =>{
        document.getElementById(element).style.visibility = "hidden";
    })
}

let seek = function(thingsToUnHide){
    thingsToUnHide.forEach(element => {
        document.getElementById(element).style.visibility = "visible";
    })
}

let graphState = false
let switchCommitTimeGraph = function() {
    if(!graphState){
        drawCommitTimeRibbon(cachedGraphData.ribbon.combArr, cachedGraphData.ribbon.names, cachedGraphData.ribbon.div)
    }else{
        drawCommitTimeGraphs(cachedGraphData.line.combArr, cachedGraphData.line.days, cachedGraphData.line.div)
    }
    graphState = !graphState
}
