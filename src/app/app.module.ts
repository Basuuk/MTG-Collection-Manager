import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { MtgCollectionComponent } from './mtg-collection/mtg-collection.component';
import { CardService } from './services/card.service';
import { RoundService } from './services/round.service';
import { TournamentService } from './services/tournament.service';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    MtgCollectionComponent,
    StatsComponent
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
    TournamentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
