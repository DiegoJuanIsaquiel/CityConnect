//#region imports

import { Injectable } from "@angular/core";
import { AddressProxy } from "src/app/models/proxys/address.proxy";
import { AsyncResult } from "src/app/modules/http-async/models/async-result";
import { HttpAsyncService } from "src/app/modules/http-async/services/http-async.service";

//#endregion

@Injectable({
    providedIn: 'root'
})
export class BuscaCepInteractor {

    //#region constructor

    constructor(
        private readonly http: HttpAsyncService,
    ) { }

    //#endregion

    //#region public methods

    public async getAddress(cep: string): Promise<AsyncResult<AddressProxy>> {
        const url = 'https://viacep.com.br/ws/' + cep + '/json/';

        return await this.http.get<AddressProxy>(`${url}`);
    }

    //#endregion

}