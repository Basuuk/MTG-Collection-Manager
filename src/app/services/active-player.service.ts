import { Injectable } from '@angular/core';

@Injectable()
export class ActivePlayerService {

    activePlayer: number = 1;

    getActivePlayer(): number {
        return this.activePlayer;
    }

    setActivePlayer(activePlayer: number): void {
        this.activePlayer = activePlayer;
    }
}