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
            <Block row card flex={0} padding={sizes.sm} marginTop={sizes.sm}>
                <Text h5 bold marginRight={sizes.xl}>{title}</Text>
                <Block row align="center" justify="flex-end" marginRight={sizes.xs}>
                    <Text h5 semibold marginRight={sizes.xxl}>{price}</Text>
                    <Checkbox  
                        marginRight={sizes.xs}
                        checked={paid}
                    />                    
                    <Text h5 semibold>Paid</Text>
                </Block>
            </Block>
        </TouchableWithoutFeedback>
    );
};

export default ReceiptItem;
