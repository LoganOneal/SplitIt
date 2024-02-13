import { IFirebaseUser } from "./IAuthentication";

export interface ILocation {
    id?: number;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
  }