// [1:50pm] I misinterpreted the instructions, that it
//	said that it's not necessary to use express.js, I 
//	thought that this signifies that it would be realistic
//	to do the first part with node.js only, so I began
//	that and tested it. Then I noticed that the entire ap
//	will be this server; as I only used previously express.js in nodejs
//	to make web apps, it would be faster that I use express.js
//	for this assessment, so I begin from the beginning.
//	what I did until now I leave in the comment below:
/*
const fs = require("fs"), util = require("util"),
	http = require("http"),
	ctrl_t = require("./controllers/taskController");
const PORT = 3333;

http.createServer( function (req, res)
{
	console.log("dirname: %s, url: %s", __dirname, req.url);
	// note - will redirect any url not "/" to "secret.html"
	fs.readFile( util.format("%s/views/%s",
		__dirname,
		(!req.url.slice(1) ?
			"index.html" : "secret.html")
		), function(err, dat)
	{
		if (err) console.log(err);
		res.writeHead(200);
		res.end(dat);
		return;
	});
}).listen(PORT);
*/
const express = require("express"), path = require("path"),
	t_ctrl = require("./controllers/taskController");
const app0 = express();
const port = 3333;
// [2:35pm] note - these two use() calls suppose
//		that new files are not
//		added with conflicting names:
app0.use( express.static(
	path.join( __dirname, "..", "views" ),
	{extensions: ["html"]}
));
app0.use( express.static(
	path.join( __dirname, "..", "assets" )
));

app0.get( "/tasks", t_ctrl.t_get );
app0.post( "/tasks", t_ctrl.t_post );

app0.use( (err, req, res, next) => console.log(err) );
app0.listen( port, () => console.log(
	"app0 listens at http://localhost:%i", port)
);
