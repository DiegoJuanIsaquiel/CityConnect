import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly router: Router
  ) { }

  //#endregion

  //#region Lifecycle Methods

  public ngOnInit(): void { }

  //#endregion

  //#region Public Methods

  public async navigateTo(url: string): Promise<void> {
    await this.router.navigate(['/main/' + url]);
  }

  //#endregion

}
