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
        getPunchAbility(result) // get punch cards 

        // getUserStats(input); //get a user's stats

        getLangStats(result) // get languages

        // getCommuStats(result); // currently not useable

        getCommitAmounts(result)
    }, function (err) {
        console.log(err);
    })
}

let simplifyCommitTimes = function (rawData, names) {
    let combArr = new Array(7).fill(0)
    // console.log({arr:combArr, dl:rawData[0].length})
    combArr.forEach((elem, index) => { combArr[index] = new Array(24).fill(0) })
    // console.log({array:combArr, expected: new Array(24).fill(0)})
    rawData.forEach(repo => {
        try {
            repo.forEach(slice => {
                combArr[slice[0]][slice[1]] += slice[2]
            })
        } catch (e) {
            console.error(e)
        }
    })
    cachedGraphData = { ribbon: { combArr: combArr, names: names, div: 'myDiv' }, line: { combArr: combArr, days: days, div: 'myDiv' } }
    // drawCommitTimeRibbon(combArr, names)
    drawCommitTimeGraphs(combArr, days, 'myDiv')
    return combArr
}

let getCommitAmounts = function (repos) {
    let pAr = []
    repos.data.forEach(repo => {
        pAr.push(octokit.repos.getContributorsStats({
            owner: input,
            repo: repo.name
        }))
    })
    Promise.all(pAr).then(e => {
        console.log(calcChurn(e.map(a => a.data), repos.data.map(a => a.name), input))
        // console.log(e.map(a => a.data))
    })
    // Promise.all(pAr).then(resp => {
    //     resp.map(elem => elem
    // })
}

//***************************************************************
//***************************************************************
//***************************************************************

let input = window.prompt("Pick a user:", "darts");
if (input === null)
    window.location.reload(false)
else {
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
}

//TODO Some user graph showing followers and their followers as bubbles
//TODO Add some ability to graph comments per repo, bar chart (3d based on time?)

//[...Array(N).keys()]
