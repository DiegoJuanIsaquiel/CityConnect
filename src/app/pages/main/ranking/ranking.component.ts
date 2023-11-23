import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly toast: ToastController,
    private readonly router: Router
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
        message: 'A sua sessão expirou, por favor, entre novamente para continuar acessando o aplicativo.',
        position: 'top',
        duration: 5000,
      });

      localStorage.clear();
      this.router.navigate(['/login/']);
      return (await toast).present();
    }

    if (success.errorMessage !== null) {
      const toast = this.toast.create({
        message: 'Ocorreu um erro ao tentar obter o ranking de usuários. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      return (await toast).present();
    }

    this.rankingList = success.dadosRanking;
  }

  //#endregion

  //#region Public Methods

  public async navigateTo(username: string): Promise<void> {
    this.router.navigate(['/main/ranking/' + username])
  }

  //#endregion

}
