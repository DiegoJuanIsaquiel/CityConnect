import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [{ path: '', component: ProfileComponent }];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],

  exports: [
    ProfileComponent
  ],
  declarations: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
