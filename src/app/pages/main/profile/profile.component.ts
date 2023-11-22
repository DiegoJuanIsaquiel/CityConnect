import { Component, OnInit } from '@angular/core';
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
  ) { }

  //#endregion

  //#region Public Properties

  public currentUser!: UserProxy;

  public userCity: string = 'Cidade não encontrada';

  //#endregion

  //#region Lifecycle Methods

  public async ngOnInit(): Promise<void> {
  
    this.currentUser = JSON.parse(localStorage.getItem(environment.keys.user)!)[0];

    this.getCity(this.currentUser.latitude, this.currentUser.longitude);
  }
  
  //#endregion
  
  //#region Public Methods
  
  public async getCity(latitude: number, longitude: number): Promise<void> {
    const [success, error] = await this.geocodingService.getAddress(latitude, longitude);

    if (!success)
      return
  
    this.userCity = success.results[0].formatted_address.split(',')[2];
  }

  //#endregion
}
