let env = {}
let drawCommitTimeGraphs = function (theArr, names, divName) {
    // document.getElementById(divName).innerHTML = ""
    let xArr = buildTimes()
    let traceArr = []
    theArr.forEach((set, index) => {
        let trace = {
            x: xArr,
            y: set,
            mode: 'marker+line',
            type: 'scatter',
            marker: { size: 12 },
            line: { shape: 'linear', width: 2 },
            name: names[index]
        }
        traceArr.push(trace)
    })
    let layout = {
        title: 'Commits by day and time',
        xaxis: { title: "Time of day (24hr)" },
        yaxis: { title: "Number of commits" }
    };
    Plotly.newPlot(divName, traceArr, layout, { displayModeBar: false });
}

let drawCommitTimeRibbon = function (theArr, names, divName) {
    document.getElementById(divName).innerHTML = ""
    let actXList = genWidthArr(names.length)
    let xArr = buildTimes()
    let traceArr = []



    theArr.forEach((set, index) => {
        // let anArr = new Array(168).fill(index)
        // console.log({z:dubArr(set), x: genPairs(168), y:actXList[index]})
        let trace = {
            z: dubArr(set),
            x: genPairs(168),
            y: actXList[index],
            mode: 'lines',
            name: names[index],
            type: 'surface',
            showscale: false,
            showlegend: false
        }
        traceArr.push(trace)
    })
    let layout = {
        showlegend: false,
        autosize: true,
        margin: { "l": 0, "r": 0, "b": 0, "t": 0 },
        scene: {
            xaxis: { title: "Time of day (24hr)" },
            yaxis: { title: "Day of the week (Sun - Sat)" },
            zaxis: { title: "Number of commits" }
        }
    };
    Plotly.newPlot(divName, traceArr, layout, { displayModeBar: false });
}

let drawLangPie = function (langStats, repoNames) {
    let labels = genLabels(getTotalLocAndLocsByLang(langStats, repoNames.data.map(a => a.name)))
    var data = [
        {
            "type": "sunburst",
            "ids": labels.ids,
            "labels": labels.labels,
            "parents": labels.parents,
            "values": labels.values,
            "leaf": { "opacity": 0.4 },
            "marker": { "line": { "width": 2 } },
            "branchvalues": 'total'
        }];

    var layout = {
        "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
    };
    Plotly.newPlot('langSunBurst', data, layout, { displayModeBar: false })
}

let drawBarChartsShort = function (repoName) {
    drawBarCharts(repoName, fillScrollBarDates(repoName, namesS, 0).date)
}

let drawBarCharts = function (repoName, endDate) {

    let a = getValsStartingAt(repoName, preParsedValues[repoName], endDate)
    var trace1 = {
        x: a.dates,
        y: a.addList,
        type: 'bar',
        name: 'Additions',
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    };

    var trace2 = {
        x: a.dates,
        y: a.delList,
        type: 'bar',
        name: 'Deletions',
        marker: {
            color: 'rgb(204,204,204)',
            opacity: 0.5
        }
    };

    var data = [trace1, trace2];

    var layout = {
        title: 'Additions vs Deletions',
        xaxis: {
            tickangle: -45
        },
        barmode: 'group'
    };

    Plotly.newPlot('churn', data, layout, { responsive: true, displayModeBar: false });
}

let updateUserOnPage = function (data) {
    document.getElementById("userData").innerHTML = `<img src="${data.avatar_url}" style="margin-top:0px ;padding=1px 1px 1px 1px; border-radius:5px; width:95%; align:left"></img><br/>
    Followers: ${data.followers}  \n<br/>
    Following: ${data.following}  \n<br/>
    Public Repos: ${data.public_repos}  \n<br/>
    Hireable: ${data.hireable == null ? "Not published" : data.hireable}  \n<br/>
    Username:${data.login}  \n<br/>
    Name: ${data.name == null ? "Not published" : data.name}  \n<br/>
    Bio: ${data.bio}  \n<br/>
    Location: ${data.location}  \n`
}
