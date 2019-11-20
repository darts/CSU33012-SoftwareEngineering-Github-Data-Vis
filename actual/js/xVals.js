let buildTimes = function () {
    let days = ["Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat ", "Sun "]
    let hours = [...Array(24).keys()]
    let X_AXIS_VALS = []

    days.forEach(day => {
        hours.forEach(hour => {
            X_AXIS_VALS.push((day + "@ "+ String(hour)))
        })
    })
    return X_AXIS_VALS
}

let dubArr = function(arr){
    let newArr = []
    arr.forEach(item => {
        newArr.push([item, item])
    })
    return newArr
}

let genWidthArr = function(strips){
    let newArr = []
    for(let i = 0, j = 2; i < strips; i++){
        let tmpArr = new Array(168).fill([i, i+1])
        newArr.push(tmpArr)
    }
    return newArr
}

let genPairs = function(length){
    return dubArr([...Array(length).keys()])
}
