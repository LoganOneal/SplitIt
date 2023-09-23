import React, {useLayoutEffect, useState} from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks';
import {IReceiptItem} from '../constants/types';
import Button from './Button';
import ProgressBar from './ProgressBar';
import Checkbox from './Checkbox';
import Switch from './Switch';
import { Divider } from 'react-native-paper';


const ReceiptItem = ({
  id,
  title,
  price,
  paid,
 }: IReceiptItem) => {
    const {t} = useTranslation();
    const {colors, gradients, icons, sizes} = useTheme();
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Screens', {
            screen: 'Pro',
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Block row marginBottom={sizes.sm}>
                <Text h5 bold marginRight={sizes.xl}>{title}</Text>
                <Block row align="center" justify="flex-end" marginRight={sizes.xs}>
                    <Text h5 bold>{price}</Text>                
                </Block>
            </Block>
        </TouchableWithoutFeedback>
    );
};

export default ReceiptItem;
