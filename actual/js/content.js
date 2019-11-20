//returns an array of (an array of time values for commits)
let getPunchAbility = function(result){
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(
            octokit.repos.getPunchCardStats({
            owner: input,
            repo: e.name
        }))
    });
    Promise.all(pAr).then(repos => {
        simplifyCommitTimes(repos.map(e => e.data))
        return repos.map(e => e.data)
    })
}

// ********************
// Get lang stats
// returns an array of objects containing languages
let getLangStats = function(result){
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(octokit.repos.listLanguages({
            owner: input,
            repo: e.name
        }))
    })

    Promise.all(pAr).then(langs => {
        return langs.map(e => e.data);
    })
}

// ********************
// get community metrics (inactive api)
let getCommuStats = function(result){
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(octokit.repos.retrieveCommunityProfileMetrics({
            owner: input,
            repo: e.name
        }))
    })

    Promise.all(pAr).then(comm => {
        console.log(comm.map(e => e.data));
        return comm.map(e => e.data);
    })
}

// ********************
// get generic user data
let getUserStats = function(usrName){
    let thePromise = octokit.users.getByUsername({ username: usrName });
    thePromise.then(function (result) {
        console.log(result); // "Stuff worked!"
    }, function (err) {
        console.log(err); // Error: "It broke"
    });
}

// ********************
// get commit data and fire off the rest
let launcher = function(usrName){
    let usrPromise = octokit.repos.listForUser({
        username: usrName
    })

    usrPromise.then(function (result) {
        getPunchAbility(result); // get punch cards 

        // getLangStats(result); // get languages
        
        // getCommuStats(result); // currently not useable
    }, function (err) {
        console.log(err);
    })
}

let simplifyCommitTimes = function(rawData){
    let retArr = []
    rawData.forEach(repoData => {
        tmpArr = []
        repoData.forEach(aTime => {
            tmpArr.push(aTime[2])
        })
        retArr.push(tmpArr)
    })
    console.log(retArr)
    drawCommitTimeGraphs(retArr)
    return retArr
}

let drawCommitTimeGraphs = function(theArr){
    let xArr = [...Array(168).keys()]
    let traceArr = []
    theArr.forEach(set => {
        let trace = {
            x: xArr,
            y: set,
            type: 'lines+markers'
        }
        traceArr.push(trace)
    })
    console.log(traceArr)
    Plotly.newPlot('myDiv', traceArr);
}
//***************************************************************
//***************************************************************
//***************************************************************

let input = window.prompt("Pick a user:", "darts");

const octokit = Octokit({
    auth: AUTH_TOKEN,
    userAgent: 'myApp v1.2.3'
});

getUserStats(input);
launcher(input);


//[...Array(N).keys()]
