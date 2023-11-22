import { UserProxy } from "./user.proxy";

export interface BaseCrudProxy {
    createdBy: UserProxy;
    updatedBy: UserProxy;
}

