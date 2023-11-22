import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProxy } from 'src/app/models/proxys/post.proxy';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly http: HttpAsyncService,
    private readonly toast: ToastController
  ) { }

  //#endregion

  //#region Public Properties

  public postList: PostProxy[] = [];

  public isLoading: boolean = false;

  //#endregion

  public async ngOnInit(): Promise<void> {

    this.isLoading = true;

    const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.postagem.get}`);

    this.isLoading = false;

    if (error || !success) {
      const toast = this.toast.create({
        message: 'Ocorreu um erro ao tentar obter as publicações. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      return (await toast).present();
    }


    this.postList = success.dadosPostagens;
  }

}
