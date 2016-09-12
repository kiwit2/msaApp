var Twit = require("twit");
var config = require("./config");

var express = require("express");
var app = express();

var tweets = {"tweets": []};

twit_bot = {
	run : function() {
		console.log("the bot is starting");
		var T = new Twit(config);

		var stream = T.stream('statuses/filter', {track: ["bernie","trump","hillary","Ted Cruz","Gary Johnson","president", "election", "vote", "Sanders", "Donald","clinton","US","america"]})

		stream.on("tweet", function(tweet) {
			if (tweet.coordinates != null) {
				console.log(tweet.text);
				if (tweet.coordinates.type === 'Point') {
					console.log(tweet.coordinates);
					tweets.tweets.push(tweet.coordinates.coordinates);
				} else {
					console.log(tweet.coordinates.type + ' unimplemented.');
				}

				console.log("----");
			}

		});
	}
}

twit_bot.run();

var allowCrossDomain = function(req, res, callback) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'json,jsonp');

    callback();
}

app.get('/tweets', function(req, res) {
	allowCrossDomain(req, res, function() {
		res.end(JSON.stringify(tweets));
		tweets.tweets = [];
	});
});

// app.get('/', function (req, res, next) {
//
//   var options = {
//     root: __dirname,
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };
//
//   var fileName = 'index.html';
//   res.sendFile(fileName, options, function (err) {
//     if (err) {
//       console.log(err);
//       res.status(err.status).end();
//     } else {
//       console.log('Sent:', fileName);
//     }
//   });
// });

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Twit Server listening at http://%s:%d", host, port);
});


/*
function gotData(err, data, response) {
	var tweets = data.statuses;


	for (var i = 0; i < tweets.length; i++){
		console.log(tweets[i].text, tweets[i].coordinates);
	}
};*/