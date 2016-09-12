let Twit: any = require("twit");
let config: any = require("./config");
let express: any = require("express");
let app: any = express();

let tweets: any = {"tweets": []};

let twit_bot: any;

twit_bot = {
	run : function(){
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


var server = app.listen(8081, function(){
	let host: any = server.address().address;
	var port: number = server.address().port;
	
	console.log("Twit Server listening at http://%s:%s", host, port);	
});

