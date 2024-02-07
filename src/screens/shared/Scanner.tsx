import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { shareAsync } from "expo-sharing";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import { AZURE_API_KEY } from '@env';


const Scanner = () => {
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >(undefined);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >(undefined);
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission || !hasMediaLibraryPermission) {
    return (
      <Text>
        Permission for camera or media library not granted. Please change this
        in settings.
      </Text>
    );
  }
  async function waitForAnalysisCompletion(operationLocation: string, apiKey: string) {
    let result = null;
    let status = "running";
  
    while (status !== "succeeded") {
      const operationResponse = await fetch(operationLocation, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
        }
      });
  
      if (!operationResponse.ok) {
        console.error(`HTTP error! status: ${operationResponse.status}`);
        break;
      }
  
      result = await operationResponse.json();
      status = result.status;
  
      if (status === "succeeded") {
        console.log("Analysis succeeded:", JSON.parse(JSON.stringify(result)));
        break; 
      } else if (status === "failed") {
        console.error("Analysis failed:", JSON.stringify(result));
        break; 
      } else {
        console.log("Analysis is still running, waiting before next check...");
        await new Promise(resolve => setTimeout(resolve, 10000)); 
      }
    }
  }
  const UploadImage = async () => {
    if (photo) {
      const endPoint = "https://splitit.cognitiveservices.azure.com/";
      const apiKey = AZURE_API_KEY;
      const modelId = "prebuilt-receipt"; 
      const apiVersion = "2023-07-31";
      const url = `${endPoint}formrecognizer/documentModels/${modelId}:analyze?api-version=${apiVersion}`;
      // const imageBase64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType.Base64 });
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey,
          },
          body: JSON.stringify({
            base64Source: photo.base64,
          })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const operationLocation = response.headers.get('Operation-Location');
          if(operationLocation){
            waitForAnalysisCompletion(operationLocation, apiKey).catch(console.error);
          }
      } catch (error) {
        console.error('Error during document analysis:', error);
      }
    }
  };
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
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
  const choosePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: false,
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

  const sharePic = () => {
    if (photo) {
      shareAsync(photo.uri);
    }
  };

  const savePhoto = () => {
    if (photo) {
      MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {photo ? (
        <>
          <Image
            style={styles.preview}
            source={{ uri: `data:image/jpg;base64,${photo?.base64}` }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={sharePic}>
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
            {hasMediaLibraryPermission && (
              <TouchableOpacity style={styles.button} onPress={savePhoto}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={UploadImage}>
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setPhoto(null)}
            >
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.optionContainer}>
        <View style={styles.iconContainer}>
          <IconButton icon="camera" size={150} style={styles.iconButton} onPress={takePicture} />
          <Text style={styles.iconText}>Take Picture</Text>
        </View>
        <View style={styles.iconContainer}>
          <IconButton icon="folder" size={150} style={styles.iconButton} onPress={choosePicture} />
          <Text style={styles.iconText}>Choose Picture</Text>
        </View>
      </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: 72, // Adjust the button size as needed
    height: 72, // Adjust the button size as needed
    borderRadius: 36, // Make it a circle
    borderWidth: 2,
    borderColor: "white",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cameraButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
  },
  preview: {
    flex: 1,
    resizeMode: "cover",
  },
  flex1: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: 10,
  },
  iconButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
  },
  iconText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 10, 
  },
});

export default Scanner;

