import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivePlayerService } from '../services/active-player.service';
import { CommunicationService } from '../services/communication.service';

@Component({
    selector: "active-player",
    templateUrl: "active-player.component.html"
})

export class ActivePlayerComponent {

    @ViewChild('btnNahum', { static: false }) btnNahum: ElementRef;
    @ViewChild('btnNigekki', { static: false }) btnNigekki: ElementRef;
    @ViewChild('btnAdriku', { static: false }) btnAdriku: ElementRef;

    previousClicked: number = 0;

    constructor(private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private activePlayerService: ActivePlayerService,
        private comService: CommunicationService) {
        this.matIconRegistry.addSvgIcon("nigekki", this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/nigekki.svg"));
        this.matIconRegistry.addSvgIcon("adriku", this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/adriku.svg"));
        this.matIconRegistry.addSvgIcon("nahum", this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/nahum.svg"));
    }

    setActivePlayer(activePlayer: number) {
        let btnMap = {
            1: this.btnNahum,
            2: this.btnNigekki,
            3: this.btnAdriku
        };
        this.previousClicked != 0 ? btnMap[this.previousClicked].color = "primary" : "";
        this.previousClicked = activePlayer;
        btnMap[activePlayer].color = "accent";
        this.activePlayerService.setActivePlayer(activePlayer);
        this.comService.emit(true);
    }

}