const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const assert = require('assert')
const User = require('./models').User;
// const Game = require("./models").Game;

const Game = require("./models").Game;

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())

if (! fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.post('/create/user', function(req, res) {
  console.log("reached post request", req.body)
  if (req.body.username && req.body.password && req.body.age) {
    let newUser = User({
    let newUser = User({
      username: req.body.username,
      password: req.body.password
    })
    newUser.save()
      .then((saved) => {
        console.log("User saved in database", saved)
      })
      .catch((err) => {
        console.log("failed to save user")
      })
  } else {
    console.log('something went wrong with adding user')
  }
  res.json({"success": true})
});

app.post('/login', function(req, res) {
  console.log("reached login post", req.body)
  Player.findOne({username: req.body.username}, function(err, user) {
    if (err) {
      console.log("Error finding user")
    } else if (user) {
      res.json({success: true})
    } else {
      res.json({success: false})
    }
  })
});

app.post("/create", (req, res) => {

})

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
