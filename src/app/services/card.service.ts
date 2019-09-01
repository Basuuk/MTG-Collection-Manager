import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CardService {

    constructor(private http: HttpClient) { }

    findAll(page: number = 0, size: number = 10) {
        return this.http.get("http://localhost:8080/cards?page=" + page + "&size=" + size);
    }

}