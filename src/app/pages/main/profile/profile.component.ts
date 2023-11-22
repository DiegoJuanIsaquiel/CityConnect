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

  public currentUser: UserProxy = {
    Usuario: '@brunaantunes',
    telefone: '11993994504',
    pontuacao: '1',
    Nome: 'Bruna Andressa Bragatti Antunes',
    latitude: -23.465303,
    longitude: -47.428604,
    fotoPerfil: '',
    Email: 'antunes.bruna@hotmail.com',
    dataNascimento: new Date(1999, 2, 23),
    dadosConquista: [
      {
        Nome: 'Avançado',
        Descricao: 'Você atingiu 20 ocorrências, se tornou um cidadão assíduo.'
      },
      {
        Nome: 'Iniciante',
        Descricao: 'Você criou sua primeira ocorrência. Parabéns!'
      }
    ],
    CPF: '47186391826'
  };

  public userCity: string = '';

  //#endregion

  //#region Lifecycle Methods

  public async ngOnInit(): Promise<void> {
    // const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.usuario.get}`);

    // if (error || !success)
    //   return

    // this.currentUser = success.dadosUsuario;
    this.getCity(this.currentUser.latitude, this.currentUser.longitude)
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
