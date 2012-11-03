var fs = require('fs');
var express = require('express'),
    app = express();
    app.use(express.bodyParser());
    app.use(app.router);

if (process.argv.length <= 2) tcpport = 8888;
else tcpport = process.argv[2]; //port of the HTTP server

var dg = {};

app.get('/', function(req, res){
    indexer = fs.readFileSync('index.html').toString()
    res.send(indexer);
});

//Accept post request
app.post('/addTransPost', addTransaction, function(req, res) {
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

function addTransaction(req, res) {
    var lender = req.body.lender;
    var borrower = req.body.borrower;
    var amount = req.body.amount;
    var description = req.body.description;

    addTransactionHalf(borrower, lender, amount, description);
    addTransactionHalf(lender, borrower, -amount, description);

    res.send("Ok. Added Transaction");
}

function addTransactionHalf(from, to, amount, description) {
    if (dg[from] == undefined) {
        dg[from] = {};
        dg[from]["net"] = amount
        dg[from]["neighbors"] = {};
        dg[from]["neighbors"][to] = {};
        dg[from]["neighbors"][to]["net"] = amount;
        dg[from]["neighbors"][to]["transactions"] = [];
        dg[from]["neighbors"][to]["transactions"][0] = {
            "amount":amount,
            "description":description
        };
    } else if (dg[from]["neighbors"][to] == undefined) {
        dg[from]["net"] += amount;
        dg[from]["neighbors"][to] = {};
        dg[from]["neighbors"][to]["net"] = amount;
        dg[from]["neighbors"][to]["transactions"] = [];
        dg[from]["neighbors"][to]["transactions"][0] = {
            "amount":amount,
            "description":description
        };
    } else {
        dg[from]["net"] += amount;
        dg[from]["neighbors"][to]["net"] += amount;
        var length = dg[from]["neighbors"][to]["transactions"].length
        dg[from]["neighbors"][to]["transactions"][length] = {
            "amount":amount,
            "description":description
        };
    }
}

function getNet(name) {
    if (dg[name] == undefined) {
        return 0;
    } else {
        return dg[name]["net"];
    }
}

function getNetBetween(from, to) {
    if (dg[from] == undefined || dg[from]["neighbors"][to] == undefined) {
        return 0;
    } else {
        return dg[from]["neighbors"][to]["net"];
    }
}

function getNeighbors(name) {
    if (dg[name] == undefined) {
        return {};
    } else {
        return dg[name]["neighbors"];
    }
}

function getTransactions(from, to) {
    if (dg[from] == undefined || dg[from]["neighbors"][to] == undefined) {
        return [];
    } else {
        return dg[from]["neighbors"][to]["transactions"];
    }
}
