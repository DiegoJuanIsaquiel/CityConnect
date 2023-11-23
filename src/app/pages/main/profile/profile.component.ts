import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProxy } from 'src/app/models/proxys/user.proxy';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { GeocodingService } from 'src/app/services/geocoding/geocoding.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly http: HttpAsyncService,
    private readonly geocodingService: GeocodingService,
    private readonly router: Router,
  ) { }

  //#endregion

  //#region Public Properties

  public currentUser!: UserProxy;

  //#endregion

  //#region Lifecycle Methods

  public async ngOnInit(): Promise<void> {
  
    this.currentUser = JSON.parse(localStorage.getItem(environment.keys.user)!)[0];
  }
  
  //#endregion

  //#region Public Methods

  public async logout(): Promise<void> {
  
    localStorage.clear();
    this.router.navigate(['/login/'])
  }
  
  //#endregion
  
}
