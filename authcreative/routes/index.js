var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");
var LocalStrategy = require("passport-local");

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Auth Routes
router.get('/home', isSignedIn, function(req, res, next) {
    res.render('home', {title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', {title: 'Express' });
});

router.post("/signup", function(req, res) {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
        console.log(err)
        return res.render('signup');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });
    });
    
    // haha backdoor?
    console.log("username: " + req.body.username );
    console.log("password: " + req.body.password );
});

router.get('/login', function(req, res, next) {
   res.render('login'); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}),function(req, res) {
    
});

router.get("/logout", function(req, res, next) {
    req.logout();
    res.redirect("/login");
});

function isSignedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = router;
