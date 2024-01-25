import { IFirebaseUser } from "../../interfaces/IAuthentication";

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

export interface IReceiptCategory {
  id?: number;
  name?: string;
}

export interface IReceiptItem {
  id?: number;
  title?: string;
  price?: number;
  paid?: boolean;
}

export interface IReceipt {
  id?: number;
  title?: string;
  image?: string;
  location?: ILocation;
  host?: IFirebaseUser;
  members?: IFirebaseUser[];
  items?: IReceiptItem[];
  total: number;
  subtotal: number;
  received: number;
  tax: number; 
  tip: number;
  timestamp?: number;
  onPress?: (event?: any) => void;
}

export interface IGroupMember {
  id?: number;
  name: string;
  phoneNumber: string;
}