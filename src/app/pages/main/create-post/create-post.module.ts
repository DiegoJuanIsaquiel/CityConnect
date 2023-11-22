import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [{ path: '', component: CreatePostComponent }];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CreatePostComponent
  ],
  declarations: [
    CreatePostComponent,
  ]
})
export class CreatePostModule { }
