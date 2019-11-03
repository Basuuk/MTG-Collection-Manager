import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddService {

    constructor(private http: HttpClient) { }

    addPlayer(player: any) {
        return this.http.post("http://localhost:8080/players", player);
    }

    addDeck(deck: any, format: number) {
        return this.http.post("http://localhost:8080/decks?format=" + format, deck);
    }

    addTournament(tournament: any) {
        return this.http.post("http://localhost:8080/tournaments", tournament);
    }
}