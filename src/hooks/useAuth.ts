/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  IFirebaseUser,
  IFirebaseResponse,
} from "../interfaces/IAuthentication";

// Firebase config get these details from firebase console
// TODO: Please replace the details below with that of your Firebase App
export const useAuth = () => {
  const firebaseConfig = {
    apiKey: "REPLACE-ME",
    authDomain: "REPLACE-ME.firebaseapp.com",
    databaseURL: "https://REPLACE-ME.firebaseio.com",
    projectId: "REPLACE-ME",
    storageBucket: "REPLACE-ME.appspot.com",
    messagingSenderId: "REPLACE-ME",
    appId: "REPLACE-ME",
  };

  const initFirebase = () => {
    const serviceApp = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(serviceApp);
    return auth;
  };

  const initResponse = () => {
    const fbResponse: IFirebaseResponse = {
      result: null,
      error: {
        code: "",
        message: "",
      },
    };
    return fbResponse;
  };

  // Sign out user
  const signoutUser = async () => {
    console.log("BEGIN SignOut");
    const fbResponse = initResponse();
    const auth = initFirebase();
    await signOut(auth).catch((error) => {
      fbResponse.error.code = error.errorCode;
      fbResponse.error.message = error.errorMessage;
      console.log("SignOut ERROR");
    });
    console.log("END SignOut");
  };

  // Register user
  const signupUser = async (
    userFullName: string,
    userEmail: string,
    userPassword: string
  ) => {
    console.log("BEGIN SignUp");
    const fbResponse = initResponse();
    const auth = initFirebase();
    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        fbResponse.result = userCredential;
        // Update profile
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userFullName,
          });
        }
        console.log("SignUp success");
      })
      .catch((error) => {
        fbResponse.error.code = error.code;
        fbResponse.error.message = error.message;
        console.log("SignUp ERROR");
      });

    const formattedResponse = JSON.stringify(fbResponse);
    console.log("END SignUp");
    return formattedResponse;
  };

  // Login user
  const signinUser = async (userEmailAddress: string, userPassword: string) => {
    console.log("BEGIN SignIn");
    const fbResponse = initResponse();
    const auth = initFirebase();
    await signInWithEmailAndPassword(auth, userEmailAddress, userPassword)
      .then((userCredential) => {
        fbResponse.result = userCredential;
        console.log("SignIn success");
      })
      .catch((error) => {
        fbResponse.error.code = error.code;
        fbResponse.error.message = error.message;
        console.log("SignIn ERROR");
      });
    const formattedResponse = JSON.stringify(fbResponse);
    console.log("END SignIn");
    return formattedResponse;
  };

  // Get firebase user details
  const getProfile = (): IFirebaseUser | void => {
    const auth = initFirebase();
    const user = auth.currentUser;
    user?.providerData.forEach((profile) => {
      const fbProfile: IFirebaseUser = { ...profile, firebaseUID: user.uid };
      console.log("getProfile SUCCESS");
      return fbProfile;
    });
  };

  return {
    signupUser,
    signinUser,
    signoutUser,
    getProfile,
  };
};