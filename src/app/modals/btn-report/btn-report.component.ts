import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PageEnum } from 'src/app/models/enums/pages.enum';

@Component({
  selector: 'app-btn-report',
  templateUrl: './btn-report.component.html',
  styleUrls: ['./btn-report.component.scss'],
})
export class BtnReportComponent implements OnInit {

  //#region Constructor

  constructor(
    private router: Router,
    private modalController: ModalController,
  ) {
    this.setCurrentPage(this.router.url.split('/')[2]);
  }

  //#endregion

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

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
      case 'add-report':
        this.currentPage = this.pageEnum.ADD_REPORT;
        break;
      case 'create-post':
        this.currentPage = this.pageEnum.ADD_POST;
        break;
    }
  }

  public addReport(): void {
    this.navigateTo('add-report');
    this.modalController.dismiss();
  }

  public createPost(): void {
    this.navigateTo('create-post');
    this.modalController.dismiss();
  }

  //#endregion

}
