import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { TournamentDataSource } from '../datasources/tournament.datasource';
import { TournamentService } from '../services/tournament.service';

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

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private tournamentService: TournamentService) { }

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
        console.log(row);
    }

}