import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme} from '../hooks';
import {IArticle, ICategory, IReceipt} from '../constants/types';
import {Block, Button, ReceiptItem, Text} from '../components';

const ReceiptDetails = () => {
  const data = useData();
  const [selected, setSelected] = useState<ICategory>();
  const [receipts, setReceipts] = useState<IReceipt[]>([]);
  const {colors, gradients, sizes} = useTheme();

  return (
    <Block>
     
    </Block>
  );
};

export default ReceiptDetails;
