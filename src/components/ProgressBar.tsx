import React, {useCallback, useState} from 'react';
import {Platform, Pressable, ViewStyle} from 'react-native';
import {View, StyleSheet, ProgressBarAndroid, Text} from 'react-native';
import {ProgressBar as PaperProgressBar} from "react-native-paper";

import * as Haptics from 'expo-haptics';

import {useTheme} from '../hooks/';
import Block from '../components/Block';
import Image from '../components/Image';
import {IProgressBarProps} from '../constants/types';

const ProgressBar = ({
  onPress,
  progressBarStyle,
  ...props
}: IProgressBarProps) => {
  const {colors, icons, sizes} = useTheme();
  const [progress, setProgress] = useState(0.5);

  const progressBarStyles = StyleSheet.flatten([
    {
      justifyContent: 'center',
      alignContent: 'center',
      height: sizes.progressBarHeight,
    },
    progressBarStyle,
  ]) as ViewStyle;

  return (
    <Block
    flex={0}
    {...props}>
        <PaperProgressBar style={progressBarStyles} progress={progress}/>
    </Block>
  );
};

export default React.memo(ProgressBar);
