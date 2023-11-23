import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable, Subscriber } from 'rxjs';
import { HttpAsyncModule } from 'src/app/modules/http-async/http-async.module';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { GeocodingService } from 'src/app/services/geocoding/geocoding.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent {

  //#region Constructor

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpAsyncService,
    private readonly toast: ToastController,
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly geocodingService: GeocodingService,
  ) {
    this.formGroup = formBuilder.group({
      Usuario__c: ['', Validators.required],
      Descricao__c: ['', Validators.required],
      RecordTypeId: ['012Hu000000z819IAA', Validators.required],
      Localizacao__Latitude__s: ['', Validators.required],
      Localizacao__Longitude__s: ['', Validators.required],
      HorarioOcorrencia__c: ['', Validators.required],
      imagemBase64__c: ['', Validators.required],
      location: ['', Validators.required]
    });
   }

  //#endregion

  //#region Lifecycle Methods

  public ngAfterViewInit(): void {
    this.createMap();
  }

  //#endregion

  //#region Public Properties

  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  public currentLatitude: number = -23.469503;
  public currentLongitude: number = -47.430008;

  public reportCoordinates: {lat: number, lng: number} = {
    lat: 0,
    lng: 0
  }

  public isModalOpen: boolean = true;

  public formGroup!: FormGroup;

  public styles: any = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

  //#endregion

  //#region Public Methods

  public async createMap(): Promise<void> {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        styles: this.styles,
        center: {
          lat: this.currentLatitude,
          lng: this.currentLongitude
        },
        zoom: 20,
        mapTypeControl: false,
        disableDefaultUI: true,
      },
    })
    this.setMarker()
  }

  public async setMarker(): Promise<void> {
    let marker: Marker = {
      coordinate: {
        lat: this.currentLatitude,
        lng: this.currentLongitude
      }
    }

    const result = await this.map.addMarker(marker);

    let count: number = 0


    this.map.setOnMapClickListener(async (event) => {
      this.map.removeMarker(count.toString());

      marker = {
        coordinate: {
          lat: event.latitude,
          lng: event.longitude
        }
      }

      this.map.addMarker(marker);

      this.openModal(true);

      this.reportCoordinates = marker.coordinate;

      this.setMarkerLocation(event.latitude, event.longitude);
      count++;
    })
  }

  public async setMarkerLocation(lat: number, lng: number): Promise<void>{
    const [success, error] = await this.geocodingService.getAddress(lat, lng);

    if (!success)
      return

    this.formGroup.controls['Localizacao__Latitude__s'].setValue(lat);
    this.formGroup.controls['Localizacao__Longitude__s'].setValue(lng);
    this.formGroup.controls['location'].setValue('Região próxima a: ' + success.results[0].formatted_address);
  }

  public async uploadImage(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];

    this.convertToBase64(file);
  }

  public convertToBase64(file: File): void {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d: string) => {
      this.formGroup.controls['imagemBase64__c'].setValue(d);
    })
  }

  public readFile(file: File, subscriber: Subscriber<any>){
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

  public async onSubmit(): Promise<void> {
    this.formGroup.controls['Usuario__c'].setValue('a00Hu0000149jEEIAY');

    if(!this.formGroup.valid)
      return;

      const { error, success } = await this.http.post<any>(`${environment.api.baseUrl}${environment.api.postagem.create}`, 
      {
        publicacao: {
          Usuario__c: this.formGroup.controls['Usuario__c'].value,
          Descricao__c: this.formGroup.controls['Descricao__c'].value,
          RecordTypeId: this.formGroup.controls['RecordTypeId'].value,
          Localizacao__Latitude__s: this.formGroup.controls['Localizacao__Latitude__s'].value,
          Localizacao__Longitude__s: this.formGroup.controls['Localizacao__Longitude__s'].value,
          HorarioOcorrencia__c: this.formGroup.controls['HorarioOcorrencia__c'].value,
          imagemBase64__c: this.formGroup.controls['imagemBase64__c'].value
        }
      }
    );

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
        message: 'Ocorreu um erro ao tentar criar ocorrência. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      this.router.navigate(['/main/home']);
      return (await toast).present();
    }

    const toast = this.toast.create({
      message: 'Postagem publicada com sucesso!',
      position: 'top',
      duration: 5000,
    });

    (await toast).present();

    this.router.navigate(['/main/home']);
  }

  public openModal(isOpen: boolean): void {
    this.isModalOpen = !this.isModalOpen;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }

  public removeImage(): void {
    this.formGroup.controls['imagemBase64__c'].setValue('');
  }

  //#endregion

}
