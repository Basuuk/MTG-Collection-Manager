import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { TournamentDataSource } from '../datasources/tournament.datasource';
import { TournamentService } from '../services/tournament.service';

@Component({
    selector: "stats",
    templateUrl: "stats.component.html",
    styleUrls: ["./stats.component.scss"]
})

export class StatsComponent implements OnInit, AfterViewInit {

    length: number;
    dataSource: TournamentDataSource;
    displayedColumns: string[] = ['title', 'location', 'date'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private tournamentService: TournamentService) { }

    ngOnInit() {
        this.dataSource = new TournamentDataSource(this.tournamentService);
        this.dataSource.findTournaments(0, 15);
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

}