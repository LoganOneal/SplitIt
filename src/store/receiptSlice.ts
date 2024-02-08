import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReceipt, IReceiptItem} from "../interfaces/IReceipt";
import { ILocation } from "../interfaces/IShared";
import { IFirebaseUser } from "../interfaces/IAuthentication";
import { RootState } from "./appStore";

const initialState: IReceipt = {
    id: 0,
    joinCode: "",
    name: "",
    vendor: "",
    image:  "",
    location:{} as ILocation,
    host: {} as IFirebaseUser,
    members: [] as IFirebaseUser[],
    items: [] as IReceiptItem[],
    total: 0,
    subtotal: 0,
    received: 0,
    tax: 0, 
    tip: 0,
    timestamp: 0,
    onPress: void 0,
}

const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {
        setReceiptId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setReceiptJoinCode: (state, action: PayloadAction<string>) => {
            state.joinCode = action.payload;
        },
        setReceiptName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setReceiptVendor: (state, action: PayloadAction<string>) => {
            state.vendor = action.payload;
        },
        setReceiptImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setReceiptLocation: (state, action: PayloadAction<ILocation>) => {
            state.location = action.payload;
        },
        setReceiptHost: (state, action: PayloadAction<IFirebaseUser>) => {
            state.host = action.payload;
        },
        setReceiptMembers: (state, action: PayloadAction<IFirebaseUser[]>) => {
            state.members = action.payload;
        },
        setReceiptItems: (state, action: PayloadAction<IReceiptItem[]>) => {
            state.items = action.payload;
        },
        setReceiptTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        setReceiptSubtotal: (state, action: PayloadAction<number>) => {
            state.subtotal = action.payload;
        },
        setReceiptReceived: (state, action: PayloadAction<number>) => {
            state.received = action.payload;
        },
        setReceiptTax: (state, action: PayloadAction<number>) => {
            state.tax = action.payload;
        },
        setReceiptTip: (state, action: PayloadAction<number>) => {
            state.tip = action.payload;
        },
        setReceiptTimestamp: (state, action: PayloadAction<number>) => {
            state.timestamp = action.payload;
        },
        setReceiptOnPress: (state, action: PayloadAction<() => void>) => {
            state.onPress = action.payload;
        },
    },
});

export const {setReceiptName, setReceiptVendor, setReceiptImage, setReceiptLocation, setReceiptHost, setReceiptMembers, setReceiptItems, setReceiptTotal, setReceiptSubtotal, setReceiptReceived, setReceiptTax, setReceiptTip, setReceiptTimestamp, setReceiptOnPress} = receiptSlice.actions;
export default receiptSlice.reducer;
export const selectAuthState = (state: RootState): IReceipt => state.receipt;