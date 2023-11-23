import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
