var input = window.prompt("Pick a user:", "dartse");

const octokit = Octokit({
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
    result.data.forEach(dankPrintRepo);
    dankGetLangDeets(result.data[0], 0);
    // result.data.forEach(dankGetLangDeets);
    console.log(result);
}, function (err) {
    console.log(err);
})


let dankPrintRepo = function (repo, index) {
    let pp = octokit.repos.getPunchCardStats({
        owner: input,
        repo: repo
    })

    pp.then(function (result) {
        // console.log(result);
    }, function (err) {
        console.log(err);
    })
}

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

