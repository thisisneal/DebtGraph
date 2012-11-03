var fs = require('fs');
var express = require('express'),
    app = express();
    app.use(express.bodyParser());
    app.use(app.router);
    
eval(fs.readFileSync('./graph.js')+'');

if (process.argv.length <= 2) tcpport = 8888;
else tcpport = process.argv[2]; //port of the HTTP server

var dg = {};

app.get('/', function(req, res){
    indexer = fs.readFileSync('index.html').toString()
    res.send(indexer);
});

app.use("/assets", express.static(__dirname + '/assets'));

//Accept post request
app.post('/addTransPost', addTransaction, function(req, res) {
});

//Handle a user's request for their transaction information
app.post('/requestTransDict', serveTrans, function(req, res) {
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

function addTransaction(req, res) {
    console.log("Attempt to Add Transaction");
    var myError, myStatus;

    var lender = req.body.lender;
    var borrower = req.body.borrower;
    var amount = req.body.amount;
    var description = req.body.description;

    if(isNumber(amount) && amount >= 0) {
        myError = "";
        myStatus = 1;

        var cyclePath = bestPath(dg, borrower, lender, parseFloat(amount));
        if (cyclePath != "none") {
            // ???
        }

        console.log(cyclePath);

        addTransactionHalf(dg, borrower, lender,
                           parseFloat(amount), description);
        addTransactionHalf(dg, lender, borrower,
                           parseFloat(-amount), description);
    } else {
        myError = "Amount is not a positive number.";
        myStatus = 0;
    }

    res.send({status:myStatus, error:myError});
}

// Thank you "CMS" on Stack Overflow 
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function serveTrans(req, res) {
    var user = req.body.user;
    var netValue = getNet(dg, user);
    var myNeighbors = getNeighbors(dg, user);

    res.send({value:netValue, neighbors:myNeighbors});
}
