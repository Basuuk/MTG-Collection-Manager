import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
    selector: "mtg-collection",
    templateUrl: "mtg-collection.component.html"
})

export class MtgCollectionComponent implements OnInit {

    cards: any[] = [];

    constructor(private cardService: CardService) {}

    ngOnInit(): void {
        this.cardService.findAll(0, 10).subscribe((r: any) => this.cards = r.content);
    }
}