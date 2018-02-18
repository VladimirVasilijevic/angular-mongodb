const express = require('express');
const router = express.Router();

const playerService = require('./player.service');

router.get('/players', (req, res) => {
  playerService.getPlayers(req, res);
});

router.post('/player', (req, res) => {
  playerService.postPlayer(req, res);
});

router.put('/player/:id', (req, res) => {
  playerService.putPlayer(req, res);
});

router.delete('/player/:id', (req, res) => {
  playerService.deletePlayer(req, res);
});

module.exports = router;
