import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [{ path: '', component: EventsComponent }];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    EventsComponent
  ],
  declarations: [
    EventsComponent,
  ]
})
export class EventsModule { }
