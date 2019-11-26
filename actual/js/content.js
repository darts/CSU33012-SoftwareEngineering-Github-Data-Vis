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
    let thePromise = octokit.users.getByUsername({ username: usrName })
    thePromise.then(function (result) {
        updateUserOnPage(result.data)
    }, function (err) {
        console.log(err)
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

        getUserStats(input); //get a user's stats

        getLangStats(result) // get languages

        // getCommuStats(result); // currently not useable

        getCommitAmounts(result)
    }, function (err) {
        console.log(err);
    })
}

let simplifyCommitTimes = function (rawData, names) {

    let combArr = new Array(7).fill(0)
    combArr.forEach((elem, index) => { combArr[index] = new Array(24).fill(0) })
    rawData.forEach(repo => {
        try {
            repo.forEach(slice => {
                combArr[slice[0]][slice[1]] += slice[2]
            })
        } catch (e) {
            console.error(e)
        }
    })
    // console.log({combArr:combArr, names:names})
    cachedGraphData = { ribbon: { combArr: combArr, names: days, div: 'commitGraph' }, line: { combArr: combArr, days: days, div: 'commitGraph' } }
    drawCommitTimeGraphs(combArr, days, 'commitGraph')
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
        let tmp = preParseChurnNames2(e.map(a => a.data), repos.data.map(a => a.name), input)
        preParsedValues = tmp.preParse
        namesS = tmp.repoNames
        fillScrollBarRepoNames(tmp.repoNames)
    }).catch(e => {
        console.error(e)
    })
}

//***************************************************************
//***************************************************************
//***************************************************************

let search = document.getElementById("inputForm");
search.addEventListener("submit", theBar => {
    theBar.preventDefault()
    console.log(document.getElementById("authToken").value)
    startSearch(document.getElementById("userName").value, (document.getElementById("authToken").value !== "" ? undefined : document.getElementById("authToken").value) )
})

let octokit
let input
let startSearch = function (inputF, userAuthToken) {
    input = inputF
    if (inputF === null)
        window.location.reload(false)
    else {
        if (env.AUTH_TOKEN !== undefined) {
            octokit = Octokit({
                auth: env.AUTH_TOKEN,
                userAgent: 'GitHub API Access and Visualisation'
            });
        } else if (userAuthToken !== undefined){
            octokit = Octokit({
                auth: userAuthToken,
                userAgent: 'GitHub API Access and Visualisation'
            });
        }else{
            console.log("No Access Token Found! \n Rates will be limited.")
            octokit = Octokit({
                userAgent: 'GitHub API Access and Visualisation'
            });
        }
        launcher(inputF);
    }
}

let injectCards = function(){
    
}
