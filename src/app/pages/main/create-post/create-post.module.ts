import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: CreatePostComponent }];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
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
