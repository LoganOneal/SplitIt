import React, {useCallback, useEffect, useState} from 'react';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Product, Text} from '../components/';
import { Image } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'

const Scanner = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument()
  
    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0])
    }
  }

  useEffect(() => {
    // call scanDocument on load
    scanDocument()
  }, []);
  
  return (
    <Block>
      <Image
      resizeMode="contain"
      style={{ width: '100%', height: '100%' }}
      source={{ uri: scannedImage }}
    />
    </Block>
  );
};

export default Scanner;
