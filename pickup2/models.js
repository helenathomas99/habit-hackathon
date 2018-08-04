let mongoose  = require('mongoose');
let Schema = mongoose.Schema;

//contact model
<<<<<<< HEAD
let UserSchema = new Schema({
    username: String,
    password: String,
});

let User =  mongoose.model('User', UserSchema)




module.exports = {
  User: User
=======
let PlayerSchema = new Schema({
    username: String,
    password: String,
    name: String,
    age: String,
    position: String,
    skill: String,
    imgUrl: {
      type: String,
      default: "https://horizons-static.s3.amazonaws.com/horizons_h.png"
    }
});

let Player =  mongoose.model('Player', PlayerSchema)

let GameSchema = new Schema({
  players: {
    type: [],
    ref: "Player"
  },
  gameType: String,
  time: Date,
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Player"
  }
})

let Game = mongoose.model("Game", GameSchema);

let CourtSchema = new Schema({
  allGames: {
    type: [],
    ref: "Game"
  },
  location: {
    latitude: Number,
    longitude: Number
  }

})

let Court = mongoose.model("Court", CourtSchema)

module.exports = {
  Player: Player,
  Game: Game,
  Court: Court
>>>>>>> 89244eb82446e9851372bc0a23fa86a22137fbb5
}
