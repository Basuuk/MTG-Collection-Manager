import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TypeService {

    constructor(private http: HttpClient) { }

    findAll() {
        return this.http.get("http://localhost:8080/types");
    }

}