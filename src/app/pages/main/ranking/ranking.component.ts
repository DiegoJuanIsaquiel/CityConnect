import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RankingProxy } from 'src/app/models/proxys/ranking.proxy';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {

  //#region Constructor

  constructor(
    private readonly http: HttpAsyncService,
    private readonly toast: ToastController
  ) { }

  //#endregion

  //#region Public Properties

  public rankingList: RankingProxy[] = [];

  public isLoading: boolean = false;

  //#endregion

  //#region Lifecycle Methods

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.ranking.get}`);

    this.isLoading = false;

    if (error || !success) {
      const toast = this.toast.create({
        message: 'Ocorreu um erro ao tentar obter o ranking de usuário. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      return (await toast).present();
    }

    this.rankingList = success.dadosRanking;
  }

  //#endregion

}
