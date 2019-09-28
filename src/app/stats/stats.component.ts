import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivePlayerService } from '../services/active-player.service';
import { PlayerDeckTournamentService } from '../services/player-deck-tournament.service';

@Component({
    selector: 'stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {

    nahumPDTs: any[] = [];
    nigekkiPDTs: any[] = [];
    adrikuPDTs: any[] = [];
    nahumVictories: number = 0;
    nigekkiVictories: number = 0;
    adrikuVictories: number = 0;
    deckResults: any[] = [];
    finalDeckResults: any[] = [];

    constructor(private activePlayerService: ActivePlayerService,
        private pDTService: PlayerDeckTournamentService) {

    }

    ngOnInit() {
        forkJoin(this.pDTService.findByPlayer(1), this.pDTService.findByPlayer(2), this.pDTService.findByPlayer(3))
            .subscribe((pdt: any[]) => {
                pdt[0].concat(pdt[1]).concat(pdt[2]).forEach((t: any) => {
                    if (t.player.id == 1 && t.wonPrize) {
                        this.nahumVictories++;
                    } else if (t.player.id == 2 && t.wonPrize) {
                        this.nigekkiVictories++;
                    } else if (t.player.id == 3 && t.wonPrize) {
                        this.adrikuVictories++;
                    }
                    this.deckResults.push({ deck: t.deck.name, victories: +t.finalResult.charAt(0), loses: +t.finalResult.charAt(2), draws: t.finalResult.charAt(4) != "" ? t.finalResult.charAt(4) : 0 });
                });
                this.deckResults.forEach((deck) => {
                    if (this.finalDeckResults.find((f) => f.deck == deck.deck) == undefined) {
                        this.finalDeckResults.push({ deck: deck.deck, tV: deck.victories, tL: deck.loses, tD: deck.draws });
                    } else {
                        let repeated: any = this.finalDeckResults.find((f) => f.deck == deck.deck);
                        repeated.tV = repeated.tV + deck.victories;
                        repeated.tL = repeated.tL + deck.loses;
                        repeated.tD = repeated.tD + deck.draws;
                    }
                });
            });
    }

    getWinRatio(deck: any): any {
        return (deck.tV * 100 / (deck.tV + deck.tL + deck.tD)).toFixed(1);
    }

}