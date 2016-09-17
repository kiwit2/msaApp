var Twit = require("twit");
var config = require("./config");

var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var tweets = {"tweets": []};

app.use(bodyParser.urlencoded({extended: true}));

var allowCrossDomain = function(req, res, callback) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'json,jsonp');

    callback();
}

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
})

app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', function(req, res) {
	res.sendFile(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css");
});

app.get('/css/style.css', function(req, res) {
	res.sendFile(__dirname + "/css/style.css");
})

app.get('/node_modules/jquery/dist/jquery.min.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
})

app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js', function(req, res) {
	res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.min.js');
})

app.get('/js/main.js', function(req, res) {
	res.sendFile(__dirname + '/js/main.js');
})

app.get('/Twitter_bird_logo.png', function(req, res) {
	res.sendFile(__dirname + '/Twitter_bird_logo.png');
})

app.get('/css/design-background.jpg', function(req, res) {
	res.sendFile(__dirname + '/css/design-background.jpg');
})

app.get('/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', function(req, res) {
	res.sendFile(__dirname + '/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2');
})

app.get('/tweets', function(req, res) {
	allowCrossDomain(req, res, function() {
		res.end(JSON.stringify(tweets));
		tweets.tweets = [];
	});
});

app.post('/terms', function(req, res) {
	console.log(req.body.data);
	terms = req.body.data;
	twit_bot.run();
	allowCrossDomain(req, res, function() {
		res.end(JSON.stringify({response: "success"}));
	});
});

var server = app.listen(8081, 'localhost', function() {
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
