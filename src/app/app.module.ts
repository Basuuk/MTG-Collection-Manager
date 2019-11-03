import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivePlayerComponent } from './active-player/active-player.component';
import { AddComponent } from './add/add.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { MtgCollectionComponent } from './mtg-collection/mtg-collection.component';
import { ActivePlayerService } from './services/active-player.service';
import { AddService } from './services/add.service';
import { CardService } from './services/card.service';
import { CommunicationService } from './services/communication.service';
import { PlayerDeckTournamentService } from './services/player-deck-tournament.service';
import { RoundService } from './services/round.service';
import { TournamentService } from './services/tournament.service';
import { StatsComponent } from './stats/stats.component';
import { TournamentComponent } from './tournament/tournament.component';
import { FormatService } from './services/format.service';
import { TypeService } from './services/type.service';

@NgModule({
  declarations: [
    AppComponent,
    MtgCollectionComponent,
    TournamentComponent,
    ActivePlayerComponent,
    StatsComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CardService,
    RoundService,
    TournamentService,
    PlayerDeckTournamentService,
    ActivePlayerService,
    CommunicationService,
    AddService,
    FormatService,
    TypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
