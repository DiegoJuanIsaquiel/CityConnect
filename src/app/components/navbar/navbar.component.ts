import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  public userImage: string = JSON.parse(localStorage.getItem(environment.keys.user)!)[0].FotoPerfil;

}
