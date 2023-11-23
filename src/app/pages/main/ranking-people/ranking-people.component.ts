import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RankingPeopleProxy } from 'src/app/models/proxys/ranking-people';
import { UserProxy } from 'src/app/models/proxys/user.proxy';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ranking-people',
  templateUrl: './ranking-people.component.html',
  styleUrls: ['./ranking-people.component.scss'],
})
export class RankingPeopleComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastController,
    private readonly router: Router,
  ) { }

  //#endregion

  //#region Public Properts

  public user!: UserProxy;

  public isLoading: boolean = false;

  //#endregion

  //#region LifeCycle Methods

  public async ngOnInit(): Promise<void> {

    this.isLoading = true;

    await this.http.get<any>(`${environment.api.baseUrl}${environment.api.rankingPeople.get}`, { headers: new HttpHeaders().set('usuario', this.router.url.split('/')[3]) })
      .subscribe(async (response: any) => {
        if (response.errorMessage !== null) {
          const toast = this.toast.create({
            message: 'Ocorreu um erro ao tentar obter o usuário da cidade. Por favor, tente novamente mais tarde',
            position: 'top',
            duration: 5000,
          });

          this.isLoading = false;
          this.router.navigate(['/main/home'])
          return (await toast).present();
        }
        
        this.isLoading = false;

        this.user = response.dadosUsuarioRanking[0];           
      });      
  }

  //#endregion

}
