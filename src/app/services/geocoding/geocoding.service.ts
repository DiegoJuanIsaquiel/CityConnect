//#region imports

import { Injectable } from "@angular/core";
import { GeocodingInteractor } from "src/app/interactors/geocoding/geocoding.interactor";
import { getErrorMessage } from "src/app/utils/functions";

//#endregion

@Injectable({
    providedIn: 'root'
})
export class GeocodingService {

    //#region constructor

    constructor(
        private readonly geocodingInteractor: GeocodingInteractor,
    ) { }

    //#endregion

    //#region public methods


    public async getAddress(lat: number, lng: number): Promise<[any | null, string]> {
        const { success, error } = await this.geocodingInteractor.getAddress(lat, lng);

        if (!success)
          return [null, getErrorMessage(error)];

        return [success, ''];
      }

    //#endregion
}