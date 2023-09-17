import React, {useRef, useCallback, useEffect, useState} from 'react';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Product, Text} from '../components/';
import { Camera, CameraType } from 'expo-camera';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      savePictureToCameraRoll(uri);
    }
  };

  const savePictureToCameraRoll = async (uri: any) => {
    if (uri) {
      const asset = await MediaLibrary.createAssetAsync(uri);
      MediaLibrary.createAlbumAsync('YourCameraApp', asset, false)
        .then(() => {
          alert('Picture saved to camera roll');
        })
        .catch((error: any) => {
          console.error('Error creating album:', error);
        });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={{ flex: 1 }}>
    <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'space-between', // Align buttons at the bottom
          padding: 20, // Add some padding to the button container
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          onPress={() => {
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Ionicons name="camera-reverse" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.captureButton} // Apply custom styles for the button
          onPress={takePicture}>
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
});

export default Scanner;
