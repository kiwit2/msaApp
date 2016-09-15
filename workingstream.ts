let Twit: any = require("twit");
let config: any = require("./config");
let express: any = require("express");
let app: any = express();
let bodyParser: any = require('body-parser')
let tweets: any = {"tweets": []};

let twit_bot: any;
let allowCrossDomain: any;

var allowCrossDomain = function(req, res, callback) void {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'json,jsonp');

    callback();
}

app.get('/tweets', function(req, res) void {
	allowCrossDomain(req, res, function() {
		res.end(JSON.stringify(tweets));
		tweets.tweets = [];
	});
});

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.post('/terms', function(req, res) void {
	console.log(req.body.data);
	terms = req.body.data;
	twit_bot.run();
	allowCrossDomain(req, res, function() void {
		res.end(JSON.stringify({response: "success"}));
	});
});

var server = app.listen(8081, function() void {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Twit Server listening at http://%s:%s", host, port);
});


twit_bot = {
	run : function() {
		console.log("the bot is starting");

		var T = new Twit(config);

		var track = {track: terms};

		var stream = T.stream('statuses/filter', track)

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


/*
function gotData(err, data, response) void {
	var tweets = data.statuses;


	for (var i = 0; i < tweets.length; i++){
		console.log(tweets[i].text, tweets[i].coordinates);
	}
};*/
