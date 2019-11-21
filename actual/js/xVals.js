let days = ["Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat "]
let buildTimesOld = function () {
    let hours = [...Array(24).keys()]
    let X_AXIS_VALS = []

    days.forEach(day => {
        hours.forEach(hour => {
            X_AXIS_VALS.push((day + "@ " + String(hour)))
        })
    })
    return X_AXIS_VALS
}

let buildTimes = function () {
    return X_AXIS_VALS = [...Array(24).keys()]
}

let dubArr = function (arr) {
    let newArr = []
    arr.forEach(item => {
        newArr.push([item, item])
    })
    return newArr
}

let genWidthArr = function (strips) {
    let newArr = []
    for (let i = 0, j = 2; i < strips; i++) {
        let tmpArr = new Array(168).fill([i, i + 0.5])
        newArr.push(tmpArr)
    }
    return newArr
}

let genPairs = function (length) {
    return dubArr([...Array(length).keys()])
}


let getTotalLocAndLocsByLang = function (rawLangStats, names) {
    let retObj = []
    let langBreakList = []
    let total = 0
    rawLangStats.forEach((repo,index) => {
        for (var lang in repo) {
            total += repo[lang]
            if (!(retObj.hasOwnProperty(lang))) {
                retObj[lang] = repo[lang]
            } else {
                retObj[lang] += repo[lang]
            }
            if(!(langBreakList.hasOwnProperty(lang))){
                langBreakList[lang] = [{repo:names[index], LOC:repo[lang]}]
            }else{
                langBreakList[lang].push({repo:names[index], LOC:repo[lang]})
            }
        }
    })
    return { total: total, byLang: retObj, langBreak: langBreakList }
}


// obselete
// let getLangBreakdown = function(rawLangStats, names){
//     let langBreakList = []
//     rawLangStats.forEach((repo, index) => {
//         for(var lang in repo){
//             if(!(langBreakList.hasOwnProperty(lang))){
//                 langBreakList[lang] = [{repo:names[index], LOC:repo[lang]}]
//             }else{
//                 langBreakList[lang].push({repo:names[index], LOC:repo[lang]})
//             }
//         }
//     })
//     return langBreakList
// }



//obselete
// let getLocByLang = function (rawLangStats) {
//     let retObj = []
//     rawLangStats.forEach(e => {
//         for (var lang in e) {
//             if (!(retObj.hasOwnProperty(lang))) {
//                 retObj[lang] = e[lang]
//             } else {
//                 retObj[lang] += e[lang]
//             }
//         }
//     })
//     return retObj
// }
