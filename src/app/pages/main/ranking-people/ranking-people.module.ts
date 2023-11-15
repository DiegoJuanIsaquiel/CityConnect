import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RankingPeopleComponent } from './ranking-people.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [{ path: '', component: RankingPeopleComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
  exports: [
    RankingPeopleComponent,
  ],
  declarations: [
    RankingPeopleComponent,
  ]
})
export class RankingPeopleModule { }
