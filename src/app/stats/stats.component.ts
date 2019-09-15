import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap, catchError } from 'rxjs/operators';
import { TournamentDataSource } from '../datasources/tournament.datasource';
import { TournamentService } from '../services/tournament.service';
import { RoundService } from '../services/round.service';
import { of } from 'rxjs';
import { PlayerDeckTournamentService } from '../services/player-deck-tournament.service';
import { ActivePlayerService } from '../services/active-player.service';

@Component({
    selector: "stats",
    templateUrl: "stats.component.html",
    styleUrls: ["./stats.component.scss"],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class StatsComponent implements OnInit, AfterViewInit {

    length: number;
    dataSource: TournamentDataSource;
    displayedColumns: string[] = ['date', 'title', 'location'];
    expandedElement: any;
    tRounds: any[];
    tDeck: string;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private tournamentService: TournamentService,
        private roundService: RoundService,
        private pDTService: PlayerDeckTournamentService,
        private activePlayerService: ActivePlayerService) { }

    ngOnInit() {
        this.dataSource = new TournamentDataSource(this.tournamentService);
        this.dataSource.findTournaments(0, 10);
        setTimeout(() => this.length = this.tournamentService.length, 100);
    }

    ngAfterViewInit() {
        this.paginator.page
            .pipe(tap(() => this.loadLessonsPage()))
            .subscribe();
    }

    loadLessonsPage() {
        this.dataSource.findTournaments(this.paginator.pageIndex, this.paginator.pageSize);
    }

    selectRow(row: any) {
        this.pDTService.findByTournamentAndPlayer(row.id, this.activePlayerService.getActivePlayer()).pipe(
            catchError(() => of([])))
            .subscribe(pdt => { console.log("el pdt", pdt) });
        this.roundService.findByTournamentAndPlayer(row.id, this.activePlayerService.getActivePlayer()).pipe(
            catchError(() => of([])))
            .subscribe(rounds => { this.tRounds = rounds as any[]; console.log(this.tRounds) });
        // this.pDTService.findByTournament(row.id).pipe(
        //     catchError(() => of([])))
        //     .subscribe(pdt => {console.log("el pdt", pdt)});
        // this.roundService.findByTournament(row.id).pipe(
        //     catchError(() => of([])))
        //     .subscribe(rounds => {this.tRounds = rounds as any[]; console.log(this.tRounds)});
    }

}