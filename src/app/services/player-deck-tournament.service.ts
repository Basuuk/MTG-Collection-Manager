import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PlayerDeckTournamentService {

    constructor(private http: HttpClient) { }

    findByTournament(tournamentId: number) {
        return this.http.get("http://localhost:8080/pdt?tournamentId=" + tournamentId);
    }

    findByTournamentAndPlayer(tournamentId: number, playerId: number) {
        return this.http.get("http://localhost:8080/playerPdt?tournamentId=" + tournamentId + "&playerId=" + playerId);
    }

    findByPlayer(playerId: number) {
        return this.http.get("http://localhost:8080/onlyPlayerPdt?playerId=" + playerId);
    }

    findAll() {
        return this.http.get("http://localhost:8080/pdts");
    }

}