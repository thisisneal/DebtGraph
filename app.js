var fs = require('fs');
var express = require('express');
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session()); 
app.use(app.router);
    
var dg = {};
var users = [];

eval(fs.readFileSync('./graph.js')+'');
eval(fs.readFileSync('./secrets.js')+'');

if (process.argv.length <= 2) tcpport = 8888;
else tcpport = process.argv[2]; //port of the HTTP server

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// Facebook connect stuff with passport
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8888/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
      // var user = users[profile.id] || 
      //            (users[profile.id] = { id: profile.id, name: profile.username });
      // done(null, user.id);
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(profile.id, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + profile.id }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
  }
));
// End facebook connect section

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
// /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' }));

app.get('/', function(req, res){
    indexer = fs.readFileSync('index.html').toString();

    console.log(users);

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

        var cyclePath = bestPath(dg, lender, borrower, parseFloat(amount));
        if (cyclePath != "none") {
            // ???
        }

        console.log(cyclePath);

        addTransactionHalf(dg, borrower, lender,
                           parseFloat(amount), description);
        addTransactionHalf(dg, lender, borrower,
                           -parseFloat(amount), description);
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
