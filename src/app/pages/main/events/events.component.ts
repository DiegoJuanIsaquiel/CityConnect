import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EventProxy } from 'src/app/models/proxys/event.proxy';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly http: HttpAsyncService,
    private readonly toast: ToastController,
  ) {}

  //#endregion

  //#region Public Properties

  public eventsList: EventProxy[] = [];

  public upcomingEvents: EventProxy[] = []

  public othersEvents: EventProxy[] = []

  public isLoading: boolean = false;

  //#endregion

  //#region LifeCycle Methods

  public async ngOnInit(): Promise<void> {

    this.isLoading = true;

    const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.eventos.get}`);

    this.isLoading = false;

    if (error || !success){
      if (error || !success) {
        const toast = this.toast.create({
          message: 'Ocorreu um erro ao tentar obter os eventos da cidade. Por favor, tente novamente mais tarde',
          position: 'top',
          duration: 5000,
        });
  
        return (await toast).present();
      }
  
    }

    this.eventsList = success.dadosEventos;

    this.eventsList.forEach((item) => {
      let maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);

      if (item.DataEvento <= maxDate) {
        this.upcomingEvents.push(item)
      }
      else {
        this.othersEvents.push(item)
      }

    })

    this.upcomingEvents = this.upcomingEvents.sort((b, a) => new Date(b.DataEvento).getTime() - new Date(a.DataEvento).getTime());
    this.othersEvents = this.othersEvents.sort((b, a) => new Date(b.DataEvento).getTime() - new Date(a.DataEvento).getTime());
  }

  //#endregion

}
