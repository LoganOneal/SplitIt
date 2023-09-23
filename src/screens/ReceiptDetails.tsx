import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme} from '../hooks';
import {IReceiptItem} from '../constants/types';
import {Block, Button, ReceiptItem, Text} from '../components';

const ReceiptDetails = ({ route }) => {
  const {items} = route.params;
  const data = useData();
  const {colors, gradients, sizes} = useTheme();

  return (
    <Block>
      <Block paddingHorizontal={sizes.padding} >
        <Block card flex={0} padding={sizes.sm} marginTop={sizes.sm}>
          <Text h4>
            Flexible office space means growth.
          </Text>
        </Block>
      </Block>

      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{paddingHorizontal: sizes.padding}}
        contentContainerStyle={{paddingBottom: sizes.l}}
        renderItem={({item}) => <ReceiptItem {...item} />}
      />
    </Block>
  );
};

export default ReceiptDetails;
