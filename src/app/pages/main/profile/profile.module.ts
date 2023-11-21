import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';

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
    CpfPipe,
    PhonePipe
  ]
})
export class ProfileModule { }
