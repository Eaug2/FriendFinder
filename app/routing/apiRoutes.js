// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. 
//    * This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`.
//    *  This will be used to handle incoming survey results.
//    *  This route will also be used to handle the compatibility
//    *  logic. 

var friends = require("../data/friends.js");

module.exports = function(app){
	app.get("/api/friends", function(req, res){
			res.json(friends);
		});

	app.post("/api/friends", function(req, res){

		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};
		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;

		var totalDifference = 0;

		for(var i = 0; i < friends.length; i++){
			console.log(friends[i].name);
            totalDifference = 0;
            console.log(totalDifference);

           
			for(var j = 0; j < 10; j++){
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				if (totalDifference <= bestMatch.friendDifference){
					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
                }
                
            }
            console.log(totalDifference);
		}
        friends.push(userData);
        console.log(userData);
        console.log("--------------");
		res.json(bestMatch);
	});
};
