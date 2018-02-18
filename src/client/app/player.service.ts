import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from './player';

const api = '/api';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {}

  getPlayers() {
    return this.http.get<Array<Player>>(`${api}/players`)
  }

  deletePlayer(player: Player) {
    return this.http.delete(`${api}/player/${player.id}`);
  }

  addPlayer(player: Player) {
    return this.http.post<Player>(`${api}/player/`, player);
  }

  updatePlayer(player: Player) {
    return this.http.put<Player>(`${api}/player/${player.id}`, player);
  }
}
