import { Component, OnInit } from '@angular/core';

import { Player } from './player';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {
  addingPlayer = false;
  edit = false;
  players: any = [];
  selectedPlayer: Player;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.getPlayers();
  }

  editPlayer() {
    this.edit = true;
  }

  cancel() {
    this.addingPlayer = false;
    this.edit = false;
    this.selectedPlayer = null;
  }

  deletePlayer(player: Player) {
    this.playerService.deletePlayer(player).subscribe(res => {
      this.players = this.players.filter(h => h !== player);
      if (this.selectedPlayer === player) {
        this.selectedPlayer = null;
      }
    });
  }

  getPlayers() {
    return this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

  enableAddMode() {
    this.addingPlayer = true;
    this.edit = true;
    this.selectedPlayer = new Player();
  }

  onSelect(player: Player) {
    this.addingPlayer = false;
    this.edit = false;
    this.selectedPlayer = player;
  }

  save() {
    if (this.addingPlayer) {
      this.playerService.addPlayer(this.selectedPlayer).subscribe(player => {
        this.addingPlayer = false;
        this.edit = false;
        this.selectedPlayer = null;
        this.players.push(player);
      });
    } else {
      this.playerService.updatePlayer(this.selectedPlayer).subscribe(player => {
        this.addingPlayer = false;
        this.edit = false;
        this.selectedPlayer = null;
      });
    }
  }
}
