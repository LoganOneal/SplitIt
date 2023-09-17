import React from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback} from 'react-native';

import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks/';
import {IReceipt} from '../constants/types';


const Receipt = ({
  title,
  location,
  host,
  items,
  total,
  paid,
  timestamp,
  onPress,
}: IReceipt) => {
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();

    // render card for Newest & Fashion
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <Block card padding={sizes.sm} marginTop={sizes.sm}>
            {/* host details */}
            <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Block justify="center" marginLeft={sizes.s}>
                <Text p semibold>
                    {title}
                </Text>
                <Text p gray>
                    {t('common.posted', {
                    date: dayjs(timestamp).format('DD MMMM') || '-',
                    })}
                </Text>
                </Block>
            </Block>

            {/* location & rating */}
            {(Boolean(location) || Boolean(total)) && (
            <Block row align="center">
                <Image source={icons.location} marginRight={sizes.s} />
                <Text p size={12} semibold>
                {location?.city}, {location?.country}
                </Text>
                <Text p bold marginHorizontal={sizes.s}>
                •
                </Text>
                <Image source={icons.star} marginRight={sizes.s} />
                <Text p size={12} semibold>
                ${total}
                </Text>
            </Block>
            )}
        </Block>
        </TouchableWithoutFeedback>
    );
};

export default Receipt;
