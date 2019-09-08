import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';

export class TournamentDataSource implements DataSource<any> {

    private tournamentSubject = new BehaviorSubject<Tournament[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private tournamentService: TournamentService) { }

    findTournaments(pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.tournamentService.findAll(pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)))
            .subscribe(tournaments => this.tournamentSubject.next(tournaments));

    }

    connect(collectionViewer: CollectionViewer): Observable<Tournament[]> {
        return this.tournamentSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tournamentSubject.complete();
        this.loadingSubject.complete();
    }
}