import React, {useLayoutEffect, useState} from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks';
import {IReceipt} from '../constants/types';
import Button from './Button';
import ProgressBar from './ProgressBar';


const ReceiptCard = ({
  title,
  location,
  host,
  members,
  items,
  image,
  total,
  received,
  tax, 
  tip,
  timestamp,
 }: IReceipt) => {
    const {t} = useTranslation();
    const {colors, gradients, icons, sizes} = useTheme();
    const [showModal, setModal] = useState(false);
    const navigation = useNavigation();

    const percentPaid = +(received / total * 100).toFixed(2);

    const handlePress = () => {
        navigation.navigate('ReceiptDetails', {title, members, items, total, received, tax, tip});
    };

    // render card for Newest & Fashion
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Block card padding={sizes.sm} marginTop={sizes.sm}>
                <Block row marginLeft={sizes.xs}>
                    <Image
                        radius={sizes.s}
                        width={100}
                        source={{uri: image}}
                        style={{backgroundColor: colors.white}}
                    />
                    <Block justify="center" marginLeft={sizes.s}>
                        <Text 
                            h5 
                            bold 
                            transform="uppercase"
                            gradient={gradients.primary}>
                            {title}
                        </Text>
                        <Text p>
                            Total: {total}
                        </Text>
                        <Text p>
                            Received: {received}
                        </Text>
                        <Block justify="center">
                            <Text p gray>
                                Percent Paid: {percentPaid}%
                            </Text>
                            <ProgressBar 
                                progress={received / total}>
                            </ProgressBar>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </TouchableWithoutFeedback>
    );
};

export default ReceiptCard;
