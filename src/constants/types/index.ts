import { IFirebaseUser } from "../../interfaces/IAuthentication";
import { IReceipt } from "../../interfaces/IReceipt";
export interface ILocation {
  id?: number;
  city?: string;
  state?: string;
  country?: string;
}
export interface IUseData {
  receipts: IReceipt[];
  setReceipts: (data?: IReceipt[]) => void;
}

export interface IGuest {
  name: string;
}

export interface ISearchedGuest {
  name: string;
  email: string;
  uid: string;
  onReceipt: boolean;
}