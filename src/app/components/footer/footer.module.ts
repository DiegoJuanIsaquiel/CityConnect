import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ],
})
export class FooterModule { }
