// var input = window.prompt("Pick a user:", "dartse");

var usr_ = new Gh3.User("dartse");
var usr_repos = new Gh3.Repositories(usr_);
// console.log(usr_repos);
usr_repos.fetch({page:1, per_page:500, direction : "desc"}, "next", function(err, response){
    if(err){
        throw "seems like a you problem..."
    }
    console.log(usr_repos);
});

// k33g.fetch(function (err, resUser) {
//     if (err) {
//         throw "outch ..."
//     }
//     console.log(k33g, resUser);
//     _.each(_.keys(resUser), function (prop) {
//         userInfos.append(
//             $('<li>').append(prop + " : " + resUser[prop])
//         );
//     });
// });

// let data = [];
// Gh3.Users.search("mad", { start_page: 3 }, function (err, response) {
//     if (err) {
//         throw "outch ..."
//     }
//     response.each(function (user) {
//         data.push(user.public_repo_count)
//     });
//     var x_axis = [];
//     for (var i = 0; i < 100; i++) {
//         x_axis.push(i);
//     }
//     var y_axis = data;
//     var trace1 = {
//         x: x_axis,
//         y: y_axis,
//         type: 'scatter'
//     };
//     Plotly.newPlot('myDiv', [trace1]);
// });


