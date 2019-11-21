let cachedGraphData;

//returns an array of (an array of time values for commits)
let getPunchAbility = function (result) {
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(
            octokit.repos.getPunchCardStats({
                owner: input,
                repo: e.name
            }))
    });
    Promise.all(pAr).then(repos => {
        simplifyCommitTimes(repos.map(e => e.data), result.data)
        return repos.map(e => e.data)
    })
}

// ********************
// Get lang stats
// returns an array of objects containing languages
let getLangStats = function (result) {
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(octokit.repos.listLanguages({
            owner: input,
            repo: e.name
        }))
    })

    Promise.all(pAr).then(langs => {
        result = result.data.map(e => e.name)
        console.log({langStatsRaw:langs.map(e => e.data), repoNames:result})
        getLocByLang(langs.map(e => e.data))
        drawLangPie(langs.map(e => e.data), result)
        return langs.map(e => e.data);
    })
}

// ********************
// get community metrics (inactive api)
let getCommuStats = function (result) {
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(octokit.repos.retrieveCommunityProfileMetrics({
            owner: input,
            repo: e.name
        }))
    })

    Promise.all(pAr).then(comm => {
        // console.log(comm.map(e => e.data));
        return comm.map(e => e.data);
    })
}

// ********************
// get generic user data
let getUserStats = function (usrName) {
    let thePromise = octokit.users.getByUsername({ username: usrName });
    thePromise.then(function (result) {
        console.log(result); // "Stuff worked!"
    }, function (err) {
        console.log(err); // Error: "It broke"
    });
}

// ********************
// get commit data and fire off the rest
let launcher = function (usrName) {
    let usrPromise = octokit.repos.listForUser({
        username: usrName
    })

    usrPromise.then(function (result) {
        // getPunchAbility(result); // get punch cards 

        // getUserStats(input); //get a user's stats

        getLangStats(result); // get languages

        // getCommuStats(result); // currently not useable
    }, function (err) {
        console.log(err);
    })
}

let simplifyCommitTimes = function (rawData, names) {
    let combArr = new Array(7).fill(0)
    // console.log({arr:combArr, dl:rawData[0].length})
    combArr.forEach((elem, index) => {combArr[index] = new Array(24).fill(0)})
    // console.log({array:combArr, expected: new Array(24).fill(0)})
    rawData.forEach(repo => {
        repo.forEach(slice => {
            combArr[slice[0]][slice[1]] += slice[2]
        })
    })
    cachedGraphData = {ribbon: {combArr:combArr, names:names, div:'myDiv'}, line: {combArr:combArr, days:days, div:'myDiv'}}
    // drawCommitTimeRibbon(combArr, names)
    drawCommitTimeGraphs(combArr, days, 'myDiv')
    return combArr
}


//***************************************************************
//***************************************************************
//***************************************************************

let input = window.prompt("Pick a user:", "darts");
let octokit;
if (env.AUTH_TOKEN !== undefined) {
    octokit = Octokit({
        auth: env.AUTH_TOKEN,
        userAgent: 'myApp v1.2.3'
    });
} else {
    console.log("No Access Token Found! \n Rates will be limited.")
    octokit = Octokit({
        userAgent: 'myApp v1.2.3'
    });
}
launcher(input);

//TODO Add dynamic language graph with total LOC in centre, languages split by repos (on hover) on outside
//TODO Some user graph showing followers and their followers as bubbles
//TODO Update to allow functioning without key
//TODO Add some ability to graph comments per repo, bar chart (3d based on time?)

//[...Array(N).keys()]
