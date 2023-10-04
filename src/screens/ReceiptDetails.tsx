import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme} from '../hooks';
import {IReceiptItem} from '../constants/types';
import {Block, Button, ReceiptItem, Text, Image} from '../components';
import { Card } from 'react-native-paper';

const ReceiptDetails = ({ route }) => {
  const {title, members, items, total, received, tax, tip} = route.params;
  const data = useData();
  const {colors, icons, sizes, gradients} = useTheme();

  return (
    <Block>
      <Block color={colors.card} flex={0} paddingHorizontal={sizes.padding} paddingBottom={sizes.padding}>
        <Text h4>
          {title}
        </Text>
        <Block row align="center" justify="flex-start" marginTop={sizes.sm} marginRight={sizes.xs}>
          <Image
              radius={0}
              width={16}
              height={16}
              source={icons.users}
            />
            
            <Block flex={0} gradient={gradients.primary} height={sizes.m} radius={sizes.imageRadius}>
              <Block marginVertical={2} margin={sizes.sm}>
              <Text white transform="uppercase" size={12}>
                Primary
              </Text>
              </Block>

            </Block>

        </Block>
      </Block>

      <Block card margin={sizes.sm}>
        <FlatList
            data={items}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
            style={{paddingHorizontal: sizes.padding}}
            contentContainerStyle={{paddingBottom: sizes.l}}
            renderItem={({item}) => <ReceiptItem {...item} />}
            ItemSeparatorComponent={() => <Block divider marginBottom={sizes.sm} />}
          />
      </Block>

      <Block flex={0} padding={sizes.padding} justify='flex-end'>
        <Text p>
          Subtotal: ${total}
        </Text>
        <Text p>
          Tax: ${tax}
        </Text>
        <Text p>
          Tip: ${tip}
        </Text>
      </Block>
    </Block>
  );
};

export default ReceiptDetails;
