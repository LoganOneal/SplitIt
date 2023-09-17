import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme} from '../hooks/';
import {IArticle, ICategory, IReceipt} from '../constants/types';
import {Block, Button, Receipt, Text} from '../components/';

const MyReceipts = () => {
  const data = useData();
  const [selected, setSelected] = useState<ICategory>();
  const [receipts, setReceipts] = useState<IReceipt[]>([]);
  const {colors, gradients, sizes} = useTheme();

  // init articles
  useEffect(() => {
    setReceipts(data?.receipts);
  }, [data.receipts]);

  return (
    <Block>
      <FlatList
        data={receipts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{paddingHorizontal: sizes.padding}}
        contentContainerStyle={{paddingBottom: sizes.l}}
        renderItem={({item}) => <Receipt {...item} />}
      />
    </Block>
  );
};

export default MyReceipts;
