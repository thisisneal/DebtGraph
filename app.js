var fs = require('fs');
var express = require('express'),
    app = express();
    app.use(express.bodyParser());
    app.use(app.router);

if (process.argv.length <= 2) tcpport = 8888;
else tcpport = process.argv[2]; //port of the HTTP server

app.get('/', function(req, res){
    indexer = fs.readFileSync('index.html').toString()
    res.send(indexer);
});

//Accept post request
app.post('/addTransPost', addTrans, function(req, res) {
    //console.log(req.body)
    //res.send(req.body);
});

try {
    app.listen(tcpport);
} catch(err) {
    console.log(err);
    console.log("Could not start express server!");
    process.exit();
}
console.log('Express server started on port ' + tcpport.toString() + 
                '\nGo to http://localhost:'+ tcpport.toString() + 
                '/ with your web browser.');

function addTrans(req, res) {
    var lender = req.body.lender;
    var borrower = req.body.borrower;
    var amount = req.body.amount;

    

    res.send(req.body);
}
