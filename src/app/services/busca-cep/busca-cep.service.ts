//#region imports

import { Injectable } from "@angular/core";
import { BuscaCepInteractor } from "src/app/interactors/busca-cep/busca-cep.interactor";
import { AddressProxy } from "src/app/models/proxys/address.proxy";
import { getErrorMessage } from "src/app/utils/functions";

//#endregion

@Injectable({
    providedIn: 'root'
})
export class BuscaCepService {

    //#region constructor

    constructor(
        private readonly buscaCepInteractor: BuscaCepInteractor,
    ) { }

    //#endregion

    //#region public methods


    public async getAddress(cep: string): Promise<[AddressProxy | null, string]> {
        const { success, error } = await this.buscaCepInteractor.getAddress(cep);

        if (!success)
          return [null, getErrorMessage(error)];

        return [success, ''];
      }

    //#endregion
}