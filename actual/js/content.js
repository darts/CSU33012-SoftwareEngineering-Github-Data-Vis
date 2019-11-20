var input = window.prompt("Pick a user:", "dartse");

const octokit = Octokit({
    auth: AUTH_TOKEN,
    userAgent: 'myApp v1.2.3'
});

// ********************
// get generic user data
// let thePromise = octokit.users.getByUsername({ username: input });
// thePromise.then(function (result) {
//     console.log(result); // "Stuff worked!"
// }, function (err) {
//     console.log(err); // Error: "It broke"
// });


// ********************
// get commit time data
let usrPromise = octokit.repos.listForUser({
    username: input
})

usrPromise.then(function (result) {
    // getPunchAbility(result); // get punch cards 

    // getLangStats(result); // get languages
    
    getCommuStats(result); // 
}, function (err) {
    console.log(err);
})

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
        return repos.map(e => e.data);
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
// get community metrics
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


