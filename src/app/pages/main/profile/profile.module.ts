import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CPFPipeModule, CpfPipe } from 'src/app/pipes/cpf.pipe';
import { PhonePipe, PhonePipeModule } from 'src/app/pipes/phone.pipe';

const routes: Routes = [{ path: '', component: ProfileComponent }];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PhonePipeModule,
    CPFPipeModule,
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
