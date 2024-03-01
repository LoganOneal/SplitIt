import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { IFirebaseUser } from "../../interfaces/IAuthentication";
import { useFirestore } from "../../hooks/useFirestore";
import { useValidation } from "../../hooks/useValidation";
import { selectAuthState, userProfileUpdated } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../../services/firebase";
import { updateProfile } from "@firebase/auth";

// TODO: Clean up code, add error checks
// TODO: Profile Picture
const EditProfileScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { profile } = route.params;
  const { updateDisplayName, updateEmailAddress } = useAuth();
  const {
    updateDisplayNameFirestore,
    updateEmailAddressFirestore,
    updatePhoneNumberFirestore,
  } = useFirestore();
  const { validateName, validateEmail, validatePhoneNumber } = useValidation();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);

  function handleSave(profile: IFirebaseUser) {
    let updatedUserInfo = {
      userName: profile.displayName,
      userEmail: profile.email,
      phoneNumber: profile.phoneNumber,
      sessionTimedOut: false,
      isLoading: false,
      firebaseUID: profile.firebaseUID,
      isLoggedIn: true,
      darkMode: false,
      userToken: authState.userToken,
    };

    if (
      displayName != profile.displayName &&
      displayName != "" &&
      displayName != null
    ) {
      if (validateName(displayName)) {
        console.log("Updating Display Name");
        updateDisplayNameFirestore(displayName);
        updateDisplayName(displayName);
        updatedUserInfo.userName = displayName;
        setNameError("");
      } else {
        setNameError("Invalid Display Name");
        return;
      }
    }

    if (email != profile.email && email != "" && email != null) {
      if (validateEmail(email)) {
        console.log("Updating Email Address");
        updateEmailAddressFirestore(email);
        updateEmailAddress(email);
        updatedUserInfo.userEmail = email;
        setEmailError("");
      } else {
        setEmailError("Invalid Email Address");
        return;
      }
    }

    if (
      phoneNumber != profile.phoneNumber &&
      phoneNumber != "" &&
      phoneNumber != null
    ) {
      if (validatePhoneNumber(phoneNumber)) {
        console.log("Updating Phone Number");
        updatePhoneNumberFirestore(phoneNumber);
        updatedUserInfo.phoneNumber = phoneNumber;
        setPhoneError("");
      } else {
        setPhoneError("Invalid Phone Number");
        return;
      }
    }

    dispatch(userProfileUpdated(updatedUserInfo));
  }

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
      
    });
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setPhoto(
          result.assets && result.assets.length > 0 ? result.assets[0] : null
        );
        
      }
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={handleImageUpload}>
              <View style={styles.profile}>
                <Image
                  source={
                    profile?.photoURL
                      ? { uri: profile.photoURL }
                      : require("../../../assets/images/defaultProfileImage.jpg")
                  }
                  style={styles.profileAvatar}
                />
                <Text style={styles.sectionTitle}>Click to edit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowWrapper}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Display Name</Text>
              <View style={styles.rowSpacer} />
              {editingDisplayName ? (
                <TextInput
                  style={styles.rowValue}
                  value={displayName}
                  onChangeText={setDisplayName}
                  autoFocus={true}
                  placeholder={profile?.displayName || "Enter Display Name"}
                />
              ) : (
                <TouchableOpacity onPress={() => setEditingDisplayName(true)}>
                  <Text style={styles.rowValue}>{profile?.displayName}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.rowWrapper}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Email Address</Text>
              <View style={styles.rowSpacer} />
              {editingEmail ? (
                <TextInput
                  style={styles.rowValue}
                  value={email}
                  onChangeText={setEmail}
                  autoFocus={true}
                  placeholder={profile?.email || "Enter Email Address"}
                />
              ) : (
                <TouchableOpacity onPress={() => setEditingEmail(true)}>
                  <Text style={styles.rowValue}>{profile?.email}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.rowWrapper}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Phone Number</Text>
              <View style={styles.rowSpacer} />
              {editingPhoneNumber ? (
                <TextInput
                  style={styles.rowValue}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  autoFocus={true}
                  placeholder={profile?.phoneNumber || "Enter Phone Number"}
                />
              ) : (
                <TouchableOpacity onPress={() => setEditingPhoneNumber(true)}>
                  <Text style={styles.rowValue}>
                    {profile?.phoneNumber || "Enter Phone Number"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View>
            <Button
              icon="content-save"
              mode="contained-tonal"
              onPress={() => handleSave(profile)}
            >
              Save
            </Button>
          </View>
          <View>
            <Text style={styles.errorText}>{nameError}</Text>
            <Text style={styles.errorText}>{emailError}</Text>
            <Text style={styles.errorText}>{phoneError}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileAvatar: {
    width: 120, // Adjust width to make the image larger
    height: 120, // Adjust height to make the image larger
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    justifyContent: "center",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    alignItems: "center",
    justifyContent: "flex-end", // Adjust to "flex-end" to align contents to the right
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
    paddingBottom: 12,
    paddingTop: 12,
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#8B8B8B",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginLeft: 24,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rowValueContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
