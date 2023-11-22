import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
      { path: 'events', loadChildren: () => import('./events/events.module').then((m) => m.EventsModule) },
      { path: 'add-report', loadChildren: () => import('./add-report/add-report.module').then((m) => m.AddReportModule) },
      { path: 'create-post', loadChildren: () => import('./create-post/create-post.module').then((m) => m.CreatePostModule) },
      { path: 'ranking', loadChildren: () => import('./ranking/ranking.module').then((m) => m.RankingModule) },
      { path: 'ranking/:id', loadChildren: () => import('./ranking-people/ranking-people.module').then((m) => m.RankingPeopleModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) },
      // { path: '**', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MainComponent
  ],
})
export class MainModule { }
