import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { GeocodingService } from 'src/app/services/geocoding/geocoding.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly geocodingService: GeocodingService,
  ) {
    this.formGroup = formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      datetime: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
   }

  //#endregion

  //#region Lifecycle Methods

  public ngOnInit(): void {

  }

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

    this.formGroup.controls['location'].setValue('Região próxima a: ' + success.results[0].formatted_address);
  }

  public async onSubmit(): Promise<void> {
    console.log(this.formGroup.value)
  }

  public openModal(isOpen: boolean): void {
    this.isModalOpen = !this.isModalOpen;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }

  //#endregion

}
