import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MtgCollectionComponent } from './mtg-collection/mtg-collection.component';
import { TournamentComponent } from './tournament/tournament.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: 'mtg-collection', component: MtgCollectionComponent },
  { path: 'tournaments', component: TournamentComponent },
  { path: 'stats', component: StatsComponent },
  { path: '', redirectTo: "mtg-collection", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
