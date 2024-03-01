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
import { FirebaseFirestore } from "firebase/firestore";

export const useFirestore = () => {

  const userRef = (uid: string) => doc(db, "users", uid);

  const createReceipt = async (receipt: IReceipt) => {
    const receiptsColRef = collection(db, 'receipts')

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

  const getUserReceipts = async (): Promise<{hostReceipts: IReceipt[], requestedReceipts: IReceipt[]}> => {
    try {
      const receiptsColRef = collection(db, 'receipts');

      const userDoc = await getDoc(userRef(auth.currentUser?.uid!));
      if (!userDoc.exists()) {
        throw new Error('User document does not exist');
      }
  
      const hostReceiptsIds = userDoc.data()?.hostReceipts || [];
      const requestedReceiptsIds = userDoc.data()?.memberReceipts || [];
  
      const hostReceipts: IReceipt[] = [];
      const requestedReceipts: IReceipt[] = [];

      for (const receiptId of hostReceiptsIds) {
        const receiptDocRef = doc(receiptsColRef, receiptId);
        const receiptDocSnapshot = await getDoc(receiptDocRef);
  
        if (receiptDocSnapshot.exists()) {
          const receiptData = receiptDocSnapshot.data() as IReceipt;
          hostReceipts.push(receiptData);
        }
      }

      for (const receiptId of requestedReceiptsIds) {
        const receiptDocRef = doc(receiptsColRef, receiptId);
        const receiptDocSnapshot = await getDoc(receiptDocRef);
        if (receiptDocSnapshot.exists() && receiptDocSnapshot.data()?.host !== auth.currentUser?.uid){
          const receiptData = receiptDocSnapshot.data() as IReceipt;
          requestedReceipts.push(receiptData);
        }
      }
  
      return { hostReceipts, requestedReceipts };
    } catch (error) {
      console.error('Error fetching receipts:', error);
      throw error;
    }
  };

  
  const getReceiptById = async (receiptId: string): Promise<IReceipt> => {
    try {
      const receiptsColRef = collection(db, 'receipts');
      const receiptDocRef = doc(receiptsColRef, receiptId);
      const receiptDocSnapshot: DocumentSnapshot<DocumentData> = await getDoc(receiptDocRef);

      if (receiptDocSnapshot.exists()) {
        const receiptData = receiptDocSnapshot.data() as IReceipt;
        console.log("Receipt Data:", receiptData)

        // set receipt item ids to be the same as the receipt item index
        receiptData.items = receiptData?.items?.map((item, index) => {
          return {
            ...item,
            id: index
          }
        })

        return receiptData;
      } else {
        throw new Error('Receipt not found');
      }
    } catch (error) {
      console.error('Error fetching receipt:', error);
      throw error;
    }
  };

  const joinReceipt = async (joinCode: string) => {
    try {
      const receiptsColRef = collection(db, 'receipts');

      // get receipt by join code 
      const receipts = await getDocs(query(receiptsColRef, where("joinCode", "==", joinCode)));
      console.log("Receipt id", receipts.docs[0].id)

      // add receipt to user's requestedReceipts
      await updateDoc(userRef(auth.currentUser?.uid!), {
        requestedReceipts: arrayUnion(receipts.docs[0].id)
      })

      // add user to receipt's guests 
      await updateDoc(doc(receiptsColRef, receipts.docs[0].id), {
        guests: arrayUnion(auth.currentUser?.uid)
      });
      
      return receipts.docs[0].id;
    } catch (error) {
      console.error('Error joining receipt:', error);
      throw error;
    }
  }

  const addNewUserToReceipt = async (receiptId: string, name: string, phoneNumber: string) => {
    try {
      // create new user and add receipt to the user
      const usersColRef = collection(db, 'users');
      const userRef = await addDoc(usersColRef, {
        name: name,
        email: "",
        created: serverTimestamp(),
        hostReceipts: [],
        requestedReceipts: [receiptId],
        hasAccount: false,
        phoneNumber: phoneNumber
      });

      // add user to the receipt
      const receiptsColRef = collection(db, 'receipts');
      const receiptDocRef = doc(receiptsColRef, receiptId);
      await updateDoc(receiptDocRef, {
        guests: arrayUnion(userRef.id)
      });
    } catch (error) {
      console.error('Error creating and adding new user to receipt:', error);
      throw error;
    }
  };
  const updateItemsPaidStatus = async (receiptId: string, itemIds: number[], isPaid: boolean) => {
    try {
        const receiptRef = doc(db, 'receipts', receiptId);
        const receiptSnapshot = await getDoc(receiptRef);

        if (receiptSnapshot.exists()) {
          const receiptData = receiptSnapshot.data() as IReceipt;
          const updatedItems = receiptData.items?.map(item => {
            if (itemIds.includes(item.id as number)) {
              return { ...item, paid: isPaid };
            }
            return item;
          }) || [];

          await updateDoc(receiptRef, {
            items: updatedItems
          });
        } else {
          console.error('Receipt not found');
        }
    } catch (error) {
        console.error('Error updating items paid status:', error);
        throw error;
    }
};

  const addExistingUserToReceipt = async (receiptId: string, uid: string) => {
    try {
      // add user to receipt
      const receiptsColRef = collection(db, 'receipts');
      const receiptDocRef = doc(receiptsColRef, receiptId);
      await updateDoc(receiptDocRef, {
        guests: arrayUnion(uid)
      });

      // add the receipt to the user
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        requestedReceipts: arrayUnion(receiptId)
      })
    } catch (error) {
      console.error('Error adding existing user to receipt:', error);
      throw error;
    }
  }

return {
  createReceipt,
  addNewUserToReceipt,
  addExistingUserToReceipt,
  joinReceipt, 
  getReceiptById,
  updateItemsPaidStatus,
  getUserReceipts
}
}
