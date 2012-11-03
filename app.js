var fs = require('fs');
var express = require('express'),
    app = express.createServer();
	app.use(express.bodyParser());
	app.use(app.router);

if (process.argv.length <= 3) tcpport = 8888;
else tcpport = process.argv[3]; //port of the HTTP server
	
app.get('/', function(req, res){
	indexer = fs.readFileSync('index.html').toString()
    res.send(indexer);
});

//Accept data (all pages, throws to doWork())
app.post('/do_work_son', doWork, function(req, res,next){
	//console.log(req.body)
	res.send(req.body);
});

try {
	app.listen(tcpport);
	console.log('Express server started on port ' + app.address().port.toString() + 
				'\nGo to http://localhost:'+app.address().port.toString() + '/ with your web browser.');
}
catch(err) {
	console.log("Could not start express server!");
	console.log("This is probably due to an existing node.js process that hasn't exited.");
	console.log("Try running 'killall node'.");
	process.exit();
}

function doWork(req, res)
{
	console.log(req);
	res.send("not implemented");
}
