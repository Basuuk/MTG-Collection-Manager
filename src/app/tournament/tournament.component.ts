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
import { CommunicationService } from '../services/communication.service';
import { Tournament } from '../models/tournament';

@Component({
    selector: "tournament",
    templateUrl: "tournament.component.html",
    styleUrls: ["./tournament.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
})

export class TournamentComponent implements OnInit, AfterViewInit {

    length: number;
    dataSource: TournamentDataSource;
    displayedColumns: string[] = ["date", "deck", "result", "title", "location", "comments", "actions"];
    expandedElement: any;
    tRounds: any[];
    tDeck: string;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private tournamentService: TournamentService,
        private roundService: RoundService,
        private pDTService: PlayerDeckTournamentService,
        private activePlayerService: ActivePlayerService,
        private comService: CommunicationService) { }

    ngOnInit() {
        this.dataSource = new TournamentDataSource(this.tournamentService);
        this.dataSource.findTournaments(0, 10);
        this.comService.getObservable().subscribe(() => this.loadLessonsPage());
        setTimeout(() => this.length = this.tournamentService.length, 100);
    }

    lapicito(h: Tournament) {
        console.log("LAPICITO");
        console.log(h);
    }

    papelerita(tournament: Tournament) {
        console.log("PAPELERITA");
        console.log(tournament);
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
        this.roundService.findByTournamentAndPlayer(row.id, this.activePlayerService.getActivePlayer()).pipe(
            catchError(() => of([])))
            .subscribe(rounds => this.tRounds = rounds as any[]);
    }

    getFinalResult(row: any): any {
        let playerResult = row.pdt.filter((x) => x.player.id == this.activePlayerService.getActivePlayer());
        return playerResult[0] ? playerResult[0].finalResult : "";
    }

    getPlayer1Deck(row: any): any {
        let playerResult = row.pdt.filter((x) => x.player.id == this.activePlayerService.getActivePlayer());
        return playerResult[0] ? playerResult[0].deck.name : "";
    }

}