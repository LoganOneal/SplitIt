import React, {useRef, useEffect, useState} from 'react';
import {Text} from '../components/';
import {Camera, CameraCapturedPicture, CameraType} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const Scanner = () => {
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >(undefined);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >(undefined);
  let cameraRef = useRef<Camera | null>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      let newPhoto: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    let sharePic = () => {
      // shareAsync(photo.uri).then(() => {
      //   setPhoto(null);
      // });
      shareAsync(photo.uri);
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri);
    };
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{uri: `data:image/jpg;base64,${photo?.base64}`}}
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}>
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  function toggleCameraType() {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }
  return (
    <View style={styles.flex1}>
      <Camera style={styles.flex1} type={cameraType} ref={cameraRef}>
        <View style={styles.cameraContainer}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={48} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 72, // Adjust the button size as needed
    height: 72, // Adjust the button size as needed
    borderRadius: 36, // Make it a circle
    borderWidth: 2,
    borderColor: 'white',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
  },
  preview: {
    flex: 1,
    resizeMode: 'cover',
  },
  flex1: {
    flex: 1,
  },
});

export default Scanner;
