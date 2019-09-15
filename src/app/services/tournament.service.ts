import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament';
import { map } from 'rxjs/operators';

@Injectable()
export class TournamentService {

    public length: number = 0;

    constructor(private http: HttpClient) { }

    findAll(page: number = 0, size: number = 10): Observable<Tournament[]> {
        return this.http.get("http://localhost:8080/tournaments?page=" + page + "&size=" + size).pipe(
            map(res =>  { this.length = res["totalElements"]; return res["content"]})
        );;
    }

}