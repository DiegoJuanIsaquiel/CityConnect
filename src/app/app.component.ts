import { Component, OnInit } from '@angular/core';
import { HttpAsyncModule } from './modules/http-async/http-async.module';
import { HttpAsyncService } from './modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';
import { TokenPayload } from './models/payloads/token.payload';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{}
