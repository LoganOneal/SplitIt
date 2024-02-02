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
  DocumentSnapshot,
} from "firebase/firestore";
import { db, auth } from '../services/firebase'
import { IReceipt } from "../interfaces/IReceipt";
import { useAuth } from "./useAuth";
import { User, UserCredential, UserInfo } from "firebase/auth";
import { MEMBERS } from '../constants/mocks';

export const useFirestore = () => {

  const userRef = (uid: string) => doc(db, "users", uid);

  const createReceipt = async (receipt: IReceipt) => {
    const receiptsColRef = collection(db, 'receipts')
    // console.log(receiptsColRef)
    const users = [
      {
        name: auth.currentUser?.displayName + "(Host)",
        phoneNumber: "111-111-1111"
      },
      ...MEMBERS
    ]

    const receiptRef = await addDoc(receiptsColRef, {
      created: serverTimestamp(),
      host: auth.currentUser?.uid,
      guests: [],
      ...receipt
    });

    // create 8 character from receipt id
    const joinCode = receiptRef.id.substring(0, 8).toUpperCase();

    // add join code to receipt 
    await updateDoc(receiptRef, {
      joinCode: joinCode
    });

    // add receipt to user's hostReceipts
    await updateDoc(userRef(auth.currentUser?.uid!), {
      hostReceipts: arrayUnion(receiptRef.id)
    })
    return receiptRef.id;
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
          const receiptData = receiptDocSnapshot.data() as IReceipt;

          // Assuming your receipt data is in a field called 'receipt'
          console.log("Receipts Data:", receiptData)
          receipts.push(receiptData);

        }
      }

      return receipts;
    } catch (error) {
      console.error('Error fetching host receipts:', error);
      throw error;
    }
  };

  const joinReceipt = async (joinCode: string) => {
    try {
      const receiptsColRef = collection(db, 'receipts');

      // get receipt by join code 
      const receipts = await getDocs(query(receiptsColRef, where("joinCode", "==", joinCode)));
      console.log("REceipt id", receipts.docs[0].id)

      // add receipt to user's memberReceipts
      await updateDoc(userRef(auth.currentUser?.uid!), {
        memberReceipts: arrayUnion(receipts.docs[0].id)
      })

      // add user to receipt's guests 
      await updateDoc(doc(receiptsColRef, receipts.docs[0].id), {
        guests: arrayUnion(auth.currentUser?.uid)
      });

    } catch (error) {
      console.error('Error joining receipt:', error);
      throw error;
    }
  }

  const addUserToReceipt = async (receiptId: string, name: string, phoneNumber: string) => {
    try {
      const receiptsColRef = collection(db, 'receipts');
      const receiptDocRef = doc(receiptsColRef, receiptId);
      await updateDoc(receiptDocRef, {
        users: arrayUnion({
          name: name,
          phoneNumber: phoneNumber
        })
      });
    } catch (error) {
      console.error('Error adding user to receipt:', error);
      throw error;
    }
  };

  return {
    createReceipt,
    getHostReceipts,
    addUserToReceipt, 
    joinReceipt
  }
};