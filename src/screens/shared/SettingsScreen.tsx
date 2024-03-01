import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IFirebaseUser } from "../../interfaces/IAuthentication";
import { auth } from "../../services/firebase";
import { useFirestore } from "../../hooks/useFirestore";
import { useFocusEffect } from "@react-navigation/native";

const SettingsScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<IFirebaseUser | null>(null);
  const { getFirestoreUser } = useFirestore();

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        const uid = auth.currentUser?.uid;

        const profileData = await getFirestoreUser(uid!);
        setProfile(profileData);
      };

      fetchProfile();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <ScrollView>
            <View style={styles.profile}>
              <Image
                source={
                  profile?.photoURL
                    ? { uri: profile.photoURL }
                    : require("../../../assets/images/defaultProfileImage.jpg")
                }
                style={styles.profileAvatar}
              />
              <Text style={styles.profileName}>{profile?.displayName}</Text>
              <Text style={styles.profileEmail}>{profile?.email}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.sectionBody}>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProfile", {
                    profile: profile,
                    navigation: navigation,
                  });
                }}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("EditProfilePassword");
              }} style={styles.row}>
                <Text style={styles.rowLabel}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.sectionBody}>
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>About</Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Terms of Service</Text>
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Privacy Policy</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const { height } = Dimensions.get("screen");
const container_height = height * 0.2;
const header_height = height * 0.04;
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
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
    fontSize: 17,
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
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
