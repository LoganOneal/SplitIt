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
import { db, auth } from "../services/firebase";
import { IReceipt } from "../interfaces/IReceipt";
import { useAuth } from "./useAuth";
import { User, UserCredential, UserInfo, updateEmail, updateProfile } from "firebase/auth";

export const useFirestore = () => {
  const userRef = (uid: string) => doc(db, "users", uid);

  const createReceipt = async (receipt: IReceipt) => {
    const receiptsColRef = collection(db, "receipts");

    const receiptRef = await addDoc(receiptsColRef, {
      created: serverTimestamp(),
      host: auth.currentUser?.uid,
      guests: [],
      ...receipt,
    });

    // create 8 character from receipt id
    const joinCode = receiptRef.id.substring(0, 8).toUpperCase();

    // add join code to receipt
    await updateDoc(receiptRef, {
      joinCode: joinCode,
    });

    // add receipt to user's hostReceipts
    await updateDoc(userRef(auth.currentUser?.uid!), {
      hostReceipts: arrayUnion(receiptRef.id),
    });
    return receiptRef.id;
  };

  const getHostReceipts = async (): Promise<IReceipt[]> => {
    try {
      // get receipts where receipt id is in user's hostReceipts
      const receiptsColRef = collection(db, "receipts");
      const userDoc = await getDoc(userRef(auth.currentUser?.uid!));
      const hostReceiptsIds = userDoc.data()?.hostReceipts || [];

      const receipts: IReceipt[] = [];

      // Fetch each receipt individually based on its ID
      for (const receiptId of hostReceiptsIds) {
        const receiptDocRef = doc(receiptsColRef, receiptId);
        const receiptDocSnapshot: DocumentSnapshot<DocumentData> = await getDoc(
          receiptDocRef
        );

        if (receiptDocSnapshot.exists()) {
          const receiptData = receiptDocSnapshot.data() as IReceipt;

          // Assuming your receipt data is in a field called 'receipt'
          console.log("Receipts Data:", receiptData);
          receipts.push(receiptData);
        }
      }

      return receipts;
    } catch (error) {
      console.error("Error fetching host receipts:", error);
      throw error;
    }
  };

  const getReceiptById = async (receiptId: string): Promise<IReceipt> => {
    try {
      const receiptsColRef = collection(db, "receipts");
      const receiptDocRef = doc(receiptsColRef, receiptId);
      const receiptDocSnapshot: DocumentSnapshot<DocumentData> = await getDoc(
        receiptDocRef
      );

      if (receiptDocSnapshot.exists()) {
        const receiptData = receiptDocSnapshot.data() as IReceipt;
        console.log("Receipt Data:", receiptData);

        // set receipt item ids to be the same as the receipt item index
        receiptData.items = receiptData?.items?.map((item, index) => {
          return {
            ...item,
            id: index,
          };
        });

        return receiptData;
      } else {
        throw new Error("Receipt not found");
      }
    } catch (error) {
      console.error("Error fetching receipt:", error);
      throw error;
    }
  };

  const joinReceipt = async (joinCode: string) => {
    try {
      const receiptsColRef = collection(db, "receipts");

      // get receipt by join code
      const receipts = await getDocs(
        query(receiptsColRef, where("joinCode", "==", joinCode))
      );
      console.log("Receipt id", receipts.docs[0].id);

      // add receipt to user's memberReceipts
      await updateDoc(userRef(auth.currentUser?.uid!), {
        memberReceipts: arrayUnion(receipts.docs[0].id),
      });

      // add user to receipt's guests
      await updateDoc(doc(receiptsColRef, receipts.docs[0].id), {
        guests: arrayUnion(auth.currentUser?.uid),
      });

      return receipts.docs[0].id;
    } catch (error) {
      console.error("Error joining receipt:", error);
      throw error;
    }
  };

  const addNewUserToReceipt = async (
    receiptId: string,
    name: string,
    phoneNumber: string
  ) => {
    try {
      // create new user and add receipt to the user
      const usersColRef = collection(db, "users");
      const userRef = await addDoc(usersColRef, {
        name: name,
        email: "",
        created: serverTimestamp(),
        hostReceipts: [],
        memberReceipts: [receiptId],
        hasAccount: false,
        phoneNumber: phoneNumber,
      });

      // add user to the receipt
      const receiptsColRef = collection(db, "receipts");
      const receiptDocRef = doc(receiptsColRef, receiptId);
      await updateDoc(receiptDocRef, {
        guests: arrayUnion(userRef.id),
      });
    } catch (error) {
      console.error("Error creating and adding new user to receipt:", error);
      throw error;
    }
  };

  const addExistingUserToReceipt = async (receiptId: string, uid: string) => {
    try {
      // add user to receipt
      const receiptsColRef = collection(db, "receipts");
      const receiptDocRef = doc(receiptsColRef, receiptId);
      await updateDoc(receiptDocRef, {
        guests: arrayUnion(uid),
      });

      // add the receipt to the user
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        memberReceipts: arrayUnion(receiptId),
      });
    } catch (error) {
      console.error("Error adding existing user to receipt:", error);
      throw error;
    }
  };

  const updateDisplayNameFirestore = async (displayName: string) => {
    try {
      await updateDoc(userRef(auth.currentUser?.uid!), {
        name: displayName,
      });
    } catch (error) {
      console.error("Error updating display name:", error);
      throw error;
    }
  };

  // Function to update email address in both firestore 
  const updateEmailAddressFirestore = async (email: string) => {
    try {
      await updateDoc(userRef(auth.currentUser?.uid!), {
        email: email,
      });
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  };

  const updatePhoneNumberFirestore = async (newPhoneNumber: string) => {
    try {
      const user = auth.currentUser;
      // Update in firestore
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          phoneNumber: newPhoneNumber,
        });
        console.log("Phone Number updated successfully");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

  const getFirestoreUser = async (uid: string): Promise<IFirebaseUser | null> => {
    try {
      const userDoc = await getDoc(userRef(uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as IFirebaseUser;
        console.log("Firestore User Data:", userData);
        
        return {
          email: userData.email,
          displayName: userDoc.data()?.name,
          phoneNumber: userData.phoneNumber,
          photoURL: userData.photoURL,
          firebaseUID: userDoc.id,
          providerId: "", 
          uid: userData.uid,
          venmoName: userData.venmoName || "",
        };
      } else {
        console.log("Firestore User Document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error fetching Firestore User Data:", error);
      return null;
    }
  };

  const updateVenmoNameFirestore = async (venmoName: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          venmoName: venmoName,
        });
        console.log("Venmo Name updated successfully");
      }
    } catch (error) {
      console.error("Error updating venmo name:", error);
    }
  }

  return {
    createReceipt,
    getHostReceipts,
    addNewUserToReceipt,
    addExistingUserToReceipt,
    joinReceipt,
    getReceiptById,
    updateDisplayNameFirestore,
    updateEmailAddressFirestore,
    updatePhoneNumberFirestore,
    getFirestoreUser,
    updateVenmoNameFirestore,
  };
};
