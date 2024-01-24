/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  IFirebaseUser,
  IFirebaseResponse,
} from "../interfaces/IAuthentication";
import { auth } from '../services/firebase'

export const useAuth = () => {

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