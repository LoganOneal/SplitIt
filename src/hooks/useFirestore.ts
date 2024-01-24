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
  arrayUnion
} from "firebase/firestore";
import { db, auth} from '../services/firebase'
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

    console.log(receiptRef.id)
  }
  
  const getReceipts = async () => {
    return
  }


  return {
    createReceipt
  };
};