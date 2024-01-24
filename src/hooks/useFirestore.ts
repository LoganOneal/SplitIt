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
  const {getProfile} = useAuth()

  const createReceipt = async (receipt: IReceipt) => {
    const receiptsColRef = collection(db, 'receipts')
    return addDoc(receiptsColRef, {
      created: serverTimestamp(),
      host: auth.currentUser?.uid,
      receipt: receipt,
    });
  }
  
  const getReceipts = async () => {
    const receiptsColRef = collection(db, 'receipts')
    const receiptsSnapshot = await getDocs(receiptsColRef)
    const receipts = receiptsSnapshot.docs.map(doc => doc.data())
    return receipts
  }


  return {
    createReceipt
  };
};