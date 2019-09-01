import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MtgCollectionComponent } from './mtg-collection/mtg-collection.component';

const routes: Routes = [
  { path: 'mtg-collection', component: MtgCollectionComponent },
  { path: '', redirectTo: "mtg-collection", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
