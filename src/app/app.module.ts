import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivePlayerComponent } from './active-player/active-player.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { MtgCollectionComponent } from './mtg-collection/mtg-collection.component';
import { CardService } from './services/card.service';
import { PlayerDeckTournamentService } from './services/player-deck-tournament.service';
import { RoundService } from './services/round.service';
import { TournamentService } from './services/tournament.service';
import { StatsComponent } from './stats/stats.component';
import { ActivePlayerService } from './services/active-player.service';
import { CommunicationService } from './services/communication.service';

@NgModule({
  declarations: [
    AppComponent,
    MtgCollectionComponent,
    StatsComponent,
    ActivePlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    CardService,
    RoundService,
    TournamentService,
    PlayerDeckTournamentService,
    ActivePlayerService,
    CommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
