let days = ["Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat "]
let preParsedValues;
let curDate;
let namesS;

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
    rawLangStats.forEach((repo, index) => {
        for (var lang in repo) {
            total += repo[lang]
            if (!(retObj.hasOwnProperty(lang))) {
                retObj[lang] = repo[lang]
            } else {
                retObj[lang] += repo[lang]
            }
            if (!(langBreakList.hasOwnProperty(lang))) {
                langBreakList[lang] = [{ repo: names[index], LOC: repo[lang] }]
            } else {
                langBreakList[lang].push({ repo: names[index], LOC: repo[lang] })
            }
        }
    })
    return { total: total, byLang: retObj, langBreak: langBreakList }
}

let genLabels = function (splitData) {
    let ids = ["Total"]
    let labels = ["Total"]
    let parents = [""]
    let values = [splitData.total]
    for (var lang in splitData.byLang) {
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
    return { labels: labels, parents: parents, values: values, ids: ids }
}

let calcChurn = function (dataResponse, names, userName) {
    let addArr = []
    let delArr = []
    let dateArr = []
    console.error(dataResponse)
    dataResponse.forEach(resp => {
        resp.forEach(resUser => {
            if (resUser.author.login === userName) {
                let tmp = resUser.weeks.slice((resUser.weeks.length - 10 > 0) ? resUser.weeks.length - 10 : 0, resUser.weeks.length)
                tmp.forEach(week => {
                    addArr.push(week.a)
                    delArr.push(week.d)
                    dateArr.push(week.w)
                })
            }
        })
    })
    return { addArr, delArr, dateArr }
}

// Takes the response from an array of Contributor Stats requests containing data on commits, lines written, lines deleted
// Adds them to an object with their name as the key
// Keeps only commit data from this author 
let preParseChurnNames = function (data, repoNames, authorName) {
    let i = 0
    let resultObj = []
    data.forEach(repo => {
        try {
            repo.forEach(contributorStats => {
                if (contributorStats.author.login === authorName)
                    resultObj[repoNames[i]] = contributorStats.weeks
            })
        } catch{
            console.error("Failed to parse repo... Skipping...")
        }
        i += 1
    })
    return resultObj;
}

// Takes the response from an array of Contributor Stats requests containing data on commits, lines written, lines deleted
// Adds them to an object with repo name as the key
// Keeps only commit data from this author 
// Now with improved checking and global updating
let preParseChurnNames2 = function (data, repoNames, authorName) {
    if (data.length !== repoNames.length)
        console.warn(`Num of repos != num of names, not all repos will be displayed.`)
    let retObj = []
    let newNames = repoNames
    let i = -1
    data.forEach(repo => {
        i += 1
        if (repo !== undefined) {
            if (repo.length > 0) {
                for (let userData of repo) {
                    if (userData.author.login === authorName) {
                        retObj[repoNames[i]] = userData.weeks
                        continue
                    }
                }
            } else {
                console.warn(`Empty repo '${repoNames[i]}' skipped and removed`, repo)
                newNames.splice(newNames.indexOf(repoNames[i]), 1)
            }
        }
    })
    return { preParse: retObj, repoNames: newNames }
}


let convertWeeksToObj = function (weeks) {
    let retObj = {};
    if (weeks !== undefined) {
        weeks.forEach(e => {
            if (e !== undefined)
                retObj[e.w] = { a: e.a, d: e.d }
        })
    }
    return retObj
}

// adds the names of all the repos to the dropdown menu 
// then draws the bar chart with the first repo
// names is an array of repo names
let fillScrollBarRepoNames = function (names) {
    document.getElementById("dropdownRepo").innerHTML = ""
    names.forEach(name => {
        try {
            document.getElementById("dropdownRepo").innerHTML += `<option class="dropdown-opt" onclick="drawBarChartsShort('${name}')">${name}</option>`
        } catch (e) {
            console.error(`Could not add repo to dropdown... Skipping \n ${e}`)
        }
    })
    let dates = fillScrollBarDates(names[0], names, 0)
    drawBarCharts(names[dates.num], dates.date)
}

// adds all the dates of a repo to the dropdown menu
// name is the name of the repo who's dates are being added
let fillScrollBarDates = function (name, names, num) {
    document.getElementById("dropdownDate").innerHTML = ""
    try {
        preParsedValues[name].map(e => e.w).forEach(timestamp => {
            document.getElementById("dropdownDate").innerHTML = `<option class="dropdown-opt" onclick="drawBarCharts('${name}','${timestamp}')">${new Date(timestamp * 1000).toDateString()}</option>` + document.getElementById("dropdownDate").innerHTML
        })
    } catch (e) {
        console.error(`Could not add date to dropdown... Skipping \n ${e}`)
        return fillScrollBarDates(names[num + 1], names, num + 1)
    }
    // console.log(preParsedValues[name])
    return { num: num, date: preParsedValues[name][preParsedValues[name].length - (num + 1)].w }
}

// takes an obj 'repo' -> an array of additions and deletions of the repo
// takes a number 'date' -> the UNIX timestamp of the last week 
// returns an object containing:
//      - x  -> where x is an array of human-readable dates
//      - ya -> where ya is an array of the additions (in loc)
//      - yd -> where yd is an array of the deletions (in loc)
let cachedWeeks = { repo: "", data: [] } //this is where we cache data to avoid lots of calculations
let getValsStartingAt = function (repoName, repo, date) {
    let unixWeek = 60 * 60 * 24 * 7 //(60 sec) * (60 min) * (24 hr) * (7 days)
    let dateList = [date]
    let addList = []
    let delList = []
    for (i = 0; i < 23; i += 1) { //add all the dates to the array (24 weeks)
        dateList.unshift((date -= unixWeek))
    }

    if (!(cachedWeeks.repo === repoName)) {
        cachedWeeks.data = convertWeeksToObj(repo)
        cachedWeeks.repo = repoName
    }

    dateList.forEach(date => {
        if (cachedWeeks.data[date] !== undefined) {
            addList.push(cachedWeeks.data[date].a)
            delList.push(cachedWeeks.data[date].d)
        } else {
            console.warn(`cannot get data for week ${new Date(date * 1000).toDateString()} (${date}), padding with 0s`)
            addList.push(0)
            delList.push(0)
        }
    })
    return { dates: dateList.map(e => new Date(e * 1000).toDateString()).map(e => e.substring(4, e.length)), addList: addList, delList: delList }
}
