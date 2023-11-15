import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild(routes)
  ],
  exports:[
    SignUpComponent
  ],
  declarations: [
    SignUpComponent,
    CpfPipe,
    PhonePipe
  ],
})
export class SignUpModule { }
