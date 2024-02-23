import { ILocation } from "../interfaces/IShared";
import { IReceiptItem, IReceipt } from "../interfaces/IReceipt";
import { useFirestore } from "./useFirestore";

export const receiptAnalyzedUpload = () => {
  const receipt: IReceipt = {
    id: 0,
    joinCode: "",
    name: "",
    //vendor: "",
    //image: "",
    location: {} as ILocation,
    //host: {} as IFirebaseUser,
    //members: [] as IFirebaseUser[],
    items: [] as IReceiptItem[],
    total: 0,
    subtotal: 0,
    received: 0,
    tax: 0,
    tip: 0,
    timestamp: 0,
    //onPress: () => void 0,
  };
  const { createReceipt } = useFirestore();

  const extractDetails = async (result: any): Promise<string> => {
    result.analyzeResult.documents.forEach((document: any, index: any) => {
      console.log(`--------Recognizing receipt #${index + 1}--------`);
      const merchantName: any = document.fields["MerchantName"];
      if (merchantName) {
        receipt.name = merchantName.valueString;
        console.log(
          `Merchant Name: ${merchantName.valueString} has confidence: ${merchantName.confidence}`
        );
      }
      const merchantAddress: any = document.fields["MerchantAddress"];
      if (merchantAddress) {
        const location: ILocation = {
          id: 0,
          street: merchantAddress.valueAddress.streetAddress,
          city: merchantAddress.valueAddress.city,
          state: merchantAddress.valueAddress.state,
          country: merchantAddress.valueAddress.countryRegion
            ? merchantAddress.valueAddress.countryRegion
            : "USA",
        };
        console.log(JSON.stringify(merchantAddress.valueAddress));
        console.log(JSON.stringify(location));
        receipt.location = location;
        console.log(
          `Merchant Address: ${merchantAddress.content} has confidence: ${merchantAddress.confidence}`
        );
      }
      const transactionDate: any = document.fields["TransactionDate"];
      if (transactionDate) {
        receipt.timestamp = transactionDate.valueDate;
        console.log(
          `Transaction Date: ${transactionDate.valueDate} has confidence: ${transactionDate.confidence}`
        );
      }
      const items: any[] = document.fields["Items"]?.valueArray || [];
      if (items.length > 0) {
        console.log("Receipt items:");
        const receiptItems: IReceiptItem[] = [];
        items.forEach((item: any, itemIndex: number) => {
          const receiptItem: IReceiptItem = {
            id: itemIndex,
            name: item.valueObject.Description?.valueString,
            price: item.valueObject.TotalPrice?.valueNumber,
            paid: false,
          };
          receiptItems.push(receiptItem);
          console.log(`...Item #${itemIndex + 1}`);
          const description: string =
            item.valueObject.Description?.valueString ||
            "Description not available";
          const totalPrice: number =
            item.valueObject.TotalPrice?.valueNumber || 0;
          console.log(
            `......Item Description: ${description} has confidence: ${item.confidence}`
          );
          console.log(
            `......Total Price: ${totalPrice} has confidence: ${item.confidence}`
          );
        });
        receipt.items = receiptItems;
      }
      const subtotal: any = document.fields["Subtotal"];
      if (subtotal) {
        receipt.subtotal = subtotal.valueNumber;
        console.log(
          `Subtotal: ${subtotal.valueNumber} has confidence: ${subtotal.confidence}`
        );
      }
      const tax: any = document.fields["TotalTax"];
      if (tax) {
        receipt.tax = tax.valueNumber;
        console.log(
          `Tax: ${tax.valueNumber} has confidence: ${tax.confidence}`
        );
      }
      const tip: any = document.fields["Tip"];
      if (tip) {
        receipt.tip = tip.valueNumber;
        console.log(
          `Tip: ${tip.valueNumber} has confidence: ${tip.confidence}`
        );
      }
      const total: any = document.fields["Total"];
      if (total) {
        receipt.total = total.valueNumber;
        console.log(
          `Total: ${total.valueNumber} has confidence: ${total.confidence}`
        );
      }
      console.log("--------------------------------------");
    });
    return await createReceipt(receipt);
  };
  return {extractDetails};
};
