import { initializeApp } from "firebase/app";
import {
  IFirebaseUser,
  IFirebaseResponse,
} from "../interfaces/IAuthentication";
import {
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  where, 
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from '../services/firebase'
import { IReceipt } from "../interfaces/IReceipt";
import { useAuth } from "./useAuth";
import { User, UserCredential, UserInfo } from "firebase/auth";

export const useFirestore = () => {

  const userRef = (uid: string) => doc(db, "users", uid);

  const createReceipt = async (receipt: IReceipt) => {
    const receiptsColRef = collection(db, 'receipts')

    const receiptRef = await addDoc(receiptsColRef, {
      created: serverTimestamp(),
      host: auth.currentUser?.uid,
      receipt: receipt,
    });

    await updateDoc(userRef(auth.currentUser?.uid!), {
      hostReceipts: arrayUnion(receiptRef.id)
    })
  }

  const getHostReceipts = async (): Promise<IReceipt[]> => {
    try {
      // get receipts where receipt id is in user's hostReceipts
      const receiptsColRef = collection(db, 'receipts');
      const userDoc = await getDoc(userRef(auth.currentUser?.uid!));
      const hostReceiptsIds = userDoc.data()?.hostReceipts || [];
  
      const receipts: IReceipt[] = [];
  
      // Fetch each receipt individually based on its ID
      for (const receiptId of hostReceiptsIds) {
        const receiptDocRef = doc(receiptsColRef, receiptId);
        const receiptDocSnapshot: DocumentSnapshot<DocumentData> = await getDoc(receiptDocRef);
  
        if (receiptDocSnapshot.exists()) {
          const receiptData = receiptDocSnapshot.data();
          // Assuming your receipt data is in a field called 'receipt'
          if (receiptData?.receipt) {
            receipts.push(receiptData.receipt);
          }
        }
      }
  
      console.log(receipts);
      return receipts;
    } catch (error) {
      console.error('Error fetching host receipts:', error);
      throw error;
    }
  };

return {
  createReceipt,
  getHostReceipts,
}
};