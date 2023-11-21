import { Component, OnInit } from '@angular/core';
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
    private readonly http: HttpAsyncService
  ) {}

  //#endregion

  //#region Public Properties

  public eventsList: EventProxy[] = [
    {
      Organizador: 'Teste',
      Nome: 'Teste',
      Local: 'Praça Prefeitura',
      Imagem: '',
      DataEvento: new Date(2024, 11, 21)
    },
    {
      Organizador: 'Teste 2',
      Nome: 'Teste 2',
      Local: 'Pracinha',
      Imagem: '',
      DataEvento: new Date(2023, 11, 7)
    }
  ];

  public upcomingEvents: EventProxy[] = []

  public othersEvents: EventProxy[] = []


  //#endregion

  //#region LifeCycle Methods

  public async ngOnInit(): Promise<void> {

    // const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.eventos.get}`);

    // if (error || !success)
    //   return

    // this.eventsList = success.dadosEventos;

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
