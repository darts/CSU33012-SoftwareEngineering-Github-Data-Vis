Gh3.Users.search("mad", {start_page : 3}, function (err, response) {
	if(err) {
		throw "outch ..."
	}
	//console.log(Gh3.Users.getAll());
	console.log(response.getAll());
	response.each(function (user) {
		console.log(user.name, user.login, user.repos, user)
	});
});
