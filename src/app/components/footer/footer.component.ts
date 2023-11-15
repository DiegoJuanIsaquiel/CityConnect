import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PageEnum } from 'src/app/models/enums/pages.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  //#region Constructor Region
  constructor(
    private router: Router,
  ) {
    this.setCurrentPage(this.router.url.split('/')[2]);
  }

  //#endregion

  //#region Public Properties

  public pageEnum: typeof PageEnum = PageEnum;

  public currentPage: number = 0;

  //#endregion

  //#region Public Methods

  public async navigateTo(url: string): Promise<void> {
    await this.router.navigate(['/main/' + url]);
    await this.setCurrentPage(url);
  }

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
