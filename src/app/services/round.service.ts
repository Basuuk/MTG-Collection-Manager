import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoundService {

    constructor(private http: HttpClient) { }

    findByTournament(tournamentId: number) {
        return this.http.get("http://localhost:8080/rounds?tournamentId=" + tournamentId);
    }

}