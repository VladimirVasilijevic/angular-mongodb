const Player = require('./player.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getPlayers(req, res) {
  const docquery = Player.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(players => {
      res.status(200).json(players);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postPlayer(req, res) {
  const originalPlayer = { 
    id: req.body.id, name: req.body.name,
    display_name: req.body.display_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    image: req.body.image
   };
  const player = new Player(originalPlayer);
  player.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(player);
    console.log('Player created successfully!');
  });
}

function putPlayer(req, res) {
  const originalPlayer = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    display_name: req.body.display_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    image: req.body.image
  };
  Player.findOne({ id: originalPlayer.id }, (error, player) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, player)) return;

    player.name = originalPlayer.name;
    player.display_name = originalPlayer.display_name;

    player.first_name = originalPlayer.first_name;
    player.last_name = originalPlayer.last_name;
    player.image = originalPlayer.image;

    player.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(player);
      console.log('Player updated successfully!');
    });
  });
}

function deletePlayer(req, res) {
  const id = parseInt(req.params.id, 10);
  Player.findOneAndRemove({ id: id })
    .then(player => {
      if (!checkFound(res, player)) return;
      res.status(200).json(player);
      console.log('Player deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, player) {
  if (!player) {
    res.status(404).send('Player not found.');
    return;
  }
  return player;
}

module.exports = {
  getPlayers,
  postPlayer,
  putPlayer,
  deletePlayer
};
