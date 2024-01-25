import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, DocumentReference, updateDoc, arrayUnion, doc, getDoc, DocumentData, onSnapshot } from "firebase/firestore";

import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID, AZURE_API_KEY} from '@env'
import { MEMBERS } from "../constants/mocks";

export const useReceipts = () => {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId:PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  };

  const getDb = () => {
    const serviceApp = initializeApp(firebaseConfig);
    return getFirestore(serviceApp);
  }

  const getReceiptsCollection = () => {
    const db = getDb();
    return collection(db, "add-users-to-receipt-test");
  }

  const getReceipt = (receiptId: string) => {
    const db = getDb();
    const receipt = doc(db, "receipts", receiptId);
    // console.log(receipt.parent);
    // console.log(receipt.id)
    return receipt;
  }

  const addUserToReceipt = async (receipt: DocumentReference, name: string, phoneNumber: string) => {
    // console.log(receipt.parent);
    // const test = getReceipt(receipt.id);
    // if (test == receipt) console.log("MATCH")
    // console.log(test.parent)
    await updateDoc(receipt, {
      users: arrayUnion({
        name: name,
        phoneNumber: phoneNumber
      })
    });
  }

  const addReceipt = async () => {
    const receiptsCollection = getReceiptsCollection();
    /* To Do: Add actual receipts and users (instead of mock data) */
    const members = MEMBERS;
    const receipt = await addDoc(receiptsCollection, {
      users: []
    });
    members.forEach((member) => {
      addUserToReceipt(receipt, member.name, member.phoneNumber)
    });
    return receipt;
  }

  return {
    getReceipt,
    addReceipt,
    addUserToReceipt
  };
}