import React, {useCallback, useContext, useEffect, useState} from 'react';
import { collection, doc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore"; 
import { db, auth } from '../constants/firebase';
import { IUseFirebase } from '../constants/types';

export const AuthenticatedUserContext = React.createContext({});

export const FirebaseProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState(null);

  const userRef = (uid: string) => doc(db, "users", uid);

  // ** Firestore API **
  async function dbSetUser(user: any) {
    const { uid, email, displayName, photoURL } = user;
    const userDoc = await getDoc(userRef(uid));
    if (!userDoc.exists()) {
      await setDoc(userRef(uid), {
        uid,
        email,
        displayName,
        photoURL,
      });
    }
    setUser(user);
  }

  const contextValue = {
    auth, 
    db,
    user, 
    setUser,
    dbSetUser,
  }

  return (
    <AuthenticatedUserContext.Provider value={ contextValue }>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const useFirebase = () => useContext(AuthenticatedUserContext) as IUseFirebase;
