var fs = require('fs');
var express = require('express'),
    app = express();
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
    console.log('Express server started on port ' + tcpport.toString() + 
                '\nGo to http://localhost:'+ tcpport.toString() + '/ with your web browser.');
}
catch(err) {
    console.log(err);
    console.log("Could not start express server!");
    process.exit();
}

function doWork(req, res)
{
    console.log(req);
    res.send("not implemented");
}
