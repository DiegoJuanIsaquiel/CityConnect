//#region imports

import { Injectable } from "@angular/core";
import { AddressProxy } from "src/app/models/proxys/address.proxy";
import { AsyncResult } from "src/app/modules/http-async/models/async-result";
import { HttpAsyncService } from "src/app/modules/http-async/services/http-async.service";
import { environment } from "src/environments/environment";

//#endregion

@Injectable({
    providedIn: 'root'
})
export class GeocodingInteractor {

    //#region constructor

    constructor(
        private readonly http: HttpAsyncService,
    ) { }

    //#endregion

    //#region public methods

    public async getAddress(lat: number, lng: number): Promise<AsyncResult<any>> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsKey}`;

        return await this.http.get<any>(`${url}`);
    }

    public async getCoordinates(street: string, streetNumber: number): Promise<AsyncResult<any>> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${streetNumber}&key=${environment.mapsKey}`;

        return await this.http.get<any>(`${url}`);
    }

    //#endregion

}