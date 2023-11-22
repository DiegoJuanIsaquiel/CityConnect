import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './ranking.component';
import { RankingPeopleModule } from '../ranking-people/ranking-people.module';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [{ path: '', component: RankingComponent }];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RankingComponent,
  ],
  declarations: [
    RankingComponent,
  ]
})
export class RankingModule { }
