import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent {

  //#region Constructor

  constructor() { }

  //#endregion

  //#region Lifecycle Methods

  public ngAfterViewInit(): void {
    this.createMap();
  }

  //#endregion

  //#region Public Properties

  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  //#endregion

  //#region Public Methods

  public async createMap(): Promise<void> {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: -23.499832,
          lng: -47.455851
        },
        zoom: 15,
        mapTypeControl: false,
        disableDefaultUI: true,
      },
    })

  }

  //#endregion

}
