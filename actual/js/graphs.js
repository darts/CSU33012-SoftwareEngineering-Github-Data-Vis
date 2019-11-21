let env = {}
let drawCommitTimeGraphs = function (theArr, names, divName) {
    document.getElementById(divName).innerHTML = ""
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
    let layout = { title: 'Commits by day and time', xaxis: { title: "Time of day (24hr)" }, yaxis: { title: "Number of commits" } };
    Plotly.newPlot(divName, traceArr, layout);
}

let drawCommitTimeRibbon = function (theArr, names, divName) {
    document.getElementById(divName).innerHTML = ""
    let actXList = genWidthArr(names.length)
    let xArr = buildTimes()
    let traceArr = []

    theArr.forEach((set, index) => {
        let anArr = new Array(168).fill(index)
        // console.log(actXList[index])
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
    let layout = { showlegend: false, title: 'Commits by day and time', scene: { xaxis: { title: "Time of day (24hr)" }, yaxis: { title: "Day of the week (Sun - Sat)" }, zaxis: { title: "Number of commits" } } };
    Plotly.newPlot(divName, traceArr, layout);
}

let drawLangPie = function (langStats, repoNames) {
    console.log({ totalLOC: getTotalLocAndLocsByLang(langStats, repoNames.data.map(a => a.name)) })

    var data = [
        {
            "type": "sunburst",
            "labels": ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
            "parents": ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve"],
            "values": [65, 14, 12, 10, 2, 6, 6, 4, 4],
            "leaf": { "opacity": 0.4 },
            "marker": { "line": { "width": 2 } },
            "branchvalues": 'total'
        }];

    var layout = {
        "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
    };


    Plotly.newPlot('myDiv2d', data, layout)

    return
}
