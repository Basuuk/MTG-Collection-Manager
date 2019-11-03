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
    finalDeckResultsModern: any[] = [];
    finalDeckResultsStandard: any[] = [];
    finalDeckResultsPioneer: any[] = [];
    decksWon: any[] = [];
    deckVictories: any[] = [];

    finalDeckResults: any = {
        1: this.finalDeckResultsModern,
        2: this.finalDeckResultsStandard,
        3: this.finalDeckResultsPioneer
    }

    constructor(private activePlayerService: ActivePlayerService,
        private pDTService: PlayerDeckTournamentService) {

    }

    ngOnInit() {
        forkJoin(this.pDTService.findByPlayer(1), this.pDTService.findByPlayer(2), this.pDTService.findByPlayer(3))
            .subscribe((pdt: any[]) => {
                pdt[0].concat(pdt[1]).concat(pdt[2]).forEach((t: any) => {
                    if (t.player.id == 1 && t.wonPrize) {
                        this.decksWon.push(t.deck.name);
                        this.nahumVictories++;
                    } else if (t.player.id == 2 && t.wonPrize) {
                        this.decksWon.push(t.deck.name);
                        this.nigekkiVictories++;
                    } else if (t.player.id == 3 && t.wonPrize) {
                        this.decksWon.push(t.deck.name);
                        this.adrikuVictories++;
                    }
                    this.deckResults.push({ deck: t.deck.name, format: t.deck.format, victories: +t.finalResult.charAt(0), loses: +t.finalResult.charAt(2), draws: t.finalResult.charAt(4) != "" ? t.finalResult.charAt(4) : 0 });
                });
                let u = [...new Set(this.decksWon)];
                u.forEach((d) => {
                    this.deckVictories.push({ deck: d, victories: this.getOccurrence(this.decksWon, d) });
                });
                this.deckResults.forEach((deck) => {
                    if (this.finalDeckResults[deck.format.id].find((f) => f.deck == deck.deck) == undefined) {
                        this.finalDeckResults[deck.format.id].push({ deck: deck.deck, tV: deck.victories, tL: deck.loses, tD: deck.draws });
                    } else {
                        let repeated: any = this.finalDeckResults[deck.format.id].find((f) => f.deck == deck.deck);
                        repeated.tV += deck.victories;
                        repeated.tL += deck.loses;
                        repeated.tD += deck.draws;
                    }
                });
                this.finalDeckResultsModern.forEach((fDR) => {
                    fDR["wR"] = (fDR.tV * 100 / (fDR.tV + fDR.tL + fDR.tD)).toFixed(1);
                });
                this.finalDeckResultsModern.sort((a, b) => b.wR - a.wR);
                this.finalDeckResultsStandard.forEach((fDR) => {
                    fDR["wR"] = (fDR.tV * 100 / (fDR.tV + fDR.tL + fDR.tD)).toFixed(1);
                });
                this.finalDeckResultsStandard.sort((a, b) => b.wR - a.wR);
                this.finalDeckResultsPioneer.forEach((fDR) => {
                    fDR["wR"] = (fDR.tV * 100 / (fDR.tV + fDR.tL + fDR.tD)).toFixed(1);
                });
                this.finalDeckResultsPioneer.sort((a, b) => b.wR - a.wR);
            });
    }

    getWinRatio(deck: any): any {
        return (deck.tV * 100 / (deck.tV + deck.tL + deck.tD)).toFixed(1);
    }

    getOccurrence(array: any[], value: any): number {
        return array.filter((v) => (v === value)).length;
    }

    getVictoryText(victories: number): string {
        return victories === 1 ? "vez." : "veces.";
    }
}