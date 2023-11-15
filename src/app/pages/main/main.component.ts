import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEnum } from 'src/app/models/enums/pages.enum';

@Component({
  selector: 'app-main',
  template: `
  <app-navbar *ngIf="shouldShowNavbar"></app-navbar>
    <router-outlet></router-outlet>
  <app-footer *ngIf="shouldShowFooter"></app-footer>
  `,
  styles: [
    `app-footer {
      box-shadow: 0 -3px 0 var(--primary-color);
      position: sticky;
      bottom: 0;

      width: 100vw;
    }`
  ]
})
export class MainComponent implements OnInit {

  //#region Constructor Region
  constructor(
    private router: Router,
  ) {
    this.setCurrentPage(this.router.url.split('/')[2]);
  }

  //#endregion

  //#region Lifecycle Methods

  public async ngOnInit(): Promise<void> {
    if(this.currentPage == this.pageEnum.ADD_REPORT || this.currentPage == this.pageEnum.PROFILE)
      this.shouldShowNavbar = false;

    if(this.currentPage == this.pageEnum.ADD_REPORT)
      this.shouldShowFooter = false;
  }


  //#endregion

  //#region Public Properties

  public shouldShowNavbar: boolean = true;

  public shouldShowFooter: boolean = true;

  public pageEnum: typeof PageEnum = PageEnum;

  public currentPage: number = 0;

  //#endregion

  //#region Public Methods

  public setCurrentPage(url: string): void {
    switch (url) {
      case 'home':
        this.currentPage = this.pageEnum.HOME;
        break;
      case 'events':
        this.currentPage = this.pageEnum.EVENTS;
        break;
      case 'add-report':
        this.currentPage = this.pageEnum.ADD_REPORT;
        break;
      case 'ranking':
        this.currentPage = this.pageEnum.RANKING;
        break;
      case 'profile':
        this.currentPage = this.pageEnum.PROFILE;
        break;
    }
  }

  //#endregion

}
