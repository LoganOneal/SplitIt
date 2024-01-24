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

export const useFirestore = () => {
  const {getProfile} = useAuth()


  const createReceipt = async (receipt: IReceipt) => {
    receipt.host = auth.currentUser?.uid

    const receiptsColRef = collection(db, 'receipts')
    return addDoc(receiptsColRef, {
      created: serverTimestamp(),
      host: auth.currentUser?.uid,
      receipt: receipt,
    });
  }


  return {
    createReceipt
  };
};