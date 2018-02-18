const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: String,
    name: String,
    display_name: String,
    first_name: String,
    last_name: String,
    image: String
  },
  {
    collection: 'players',
    read: 'nearest'
  }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
