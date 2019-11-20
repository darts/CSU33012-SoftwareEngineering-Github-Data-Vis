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
let ppp = octokit.repos.listForUser({
    username: input
})

ppp.then(function (result) {
    // console.log(result.data);
    let pAr = [];
    result.data.forEach(e => {
        pAr.push(
            octokit.repos.getPunchCardStats({
            owner: input,
            repo: e.name
        }))
    });
    Promise.all(pAr).then(repos => {
        repos.map(e => e.data).forEach(repo => {
            console.log(repo);
        })
    })

    // dankGetLangDeets(result.data[0], 0);
    // result.data.forEach(dankGetLangDeets);
    console.log(result);
}, function (err) {
    console.log(err);
})

// ********************
// Get lang stats

let dankGetLangDeets = function(repo, index){
    let pp = octokit.repos.listLanguages({
        owner: input,
        repo: repo
    })

    pp.then(function(result){
        console.log(result);
    }, function (err){
        console.log(err);
    })
}

