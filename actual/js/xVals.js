let days = ["Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat "]
let preParsedValues;
let curDate;

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

let genLabels = function(splitData){
    let ids = ["Total"]
    let labels = ["Total"]
    let parents = [""]
    let values = [splitData.total]
    for(var lang in splitData.byLang){
        labels.push(lang)
        parents.push("Total")
        ids.push(lang)
        values.push(splitData.byLang[lang])
        splitData.langBreak[lang].forEach(e => {
            labels.push(e.repo)
            parents.push(lang)
            values.push(e.LOC)
            ids.push(String(lang) + String(e.repo))
        })
        
    }
    return {labels:labels, parents:parents, values:values, ids:ids}
}

let calcChurn = function(dataResponse, names, userName){
    //change this so a week can be selected in a dropdown as an end date
    let addArr = []
    let delArr = []
    let dateArr = []
    console.error(dataResponse)
    dataResponse.forEach(resp => {
        resp.forEach(resUser => {
            if(resUser.author.login === userName){
                let tmp = resUser.weeks.slice((resUser.weeks.length - 10 > 0) ? resUser.weeks.length - 10 : 0 , resUser.weeks.length)
                tmp.forEach(week => {
                    addArr.push(week.a)
                    delArr.push(week.d)
                    dateArr.push(week.w)
                })
            }
        })
    })
    return {addArr, delArr, dateArr}
}

// Takes the response from an array of Contributor Stats requests containing data on commits, lines written, lines deleted
// Adds them to an object with their name as the key
// Keeps only commit data from this author 
let preParseChurnNames = function(data, repoNames, authorName){
    let i = 0
    let resultObj = []
    data.forEach(repo => {
        repo.forEach(contributorStats => {
            if(contributorStats.author.login === authorName)
                resultObj[repoNames[i]] = contributorStats.weeks
        })
        i+=1
    })
    return resultObj;
}

let fillScrollBarRepoNames = function(names){
    names.forEach(name => {
        document.getElementById("dropdownRepo").innerHTML += `<option onclick="drawBarChartsShort('${name}')">${name}</option>`
    })
    fillScrollBarDates(names[0])
}

let fillScrollBarDates = function(name){
    preParsedValues[name].map(e => e.w).map(e => new Date(e*1000)).map(e => e.toDateString()).forEach(date => {
        document.getElementById("dropdownDate").innerHTML += `<option onclick="updateDateRepo('${date}')">${date}</option>`
    })
    return new Date(preParsedValues[name][0].w*1000).toDateString()
}
