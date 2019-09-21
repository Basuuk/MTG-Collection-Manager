import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommunicationService {

    private subject = new Subject<any>();

    emit(message: any) {
        this.subject.next({ msg: message });
    }

    getObservable(): Observable<any> {
        return this.subject.asObservable();
    }
}