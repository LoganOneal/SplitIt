import * as React from 'react';
import { isRejected } from '@reduxjs/toolkit';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Card, CheckBox, CheckBoxProps, Text } from '@ui-kitten/components';
import { StyleSheet, View, ViewProps } from 'react-native';
import { IReceiptItem } from '../constants/types';


const ReceiptCard = ({
  handleSelectItem,
  receiptItem, 
}: {
  handleSelectItem: (item: IReceiptItem) => void;
  receiptItem: IReceiptItem;
}) => {
  const useCheckboxState = (initialCheck = false): CheckBoxProps => {
    const [checked, setChecked] = React.useState(initialCheck);
    const onChange = (value: boolean) => {
      setChecked(value);
      handleSelectItem(receiptItem);
    };
    return { checked, onChange };
  };

  const paidCheckboxState = useCheckboxState();

  return (
    <>
      <Card
        style={styles.card}
      >
        <View style={styles.row}>
          <Text category='s2'>
            {receiptItem.name}
          </Text>
          <Text>
            ${receiptItem.price}
          </Text>
          <CheckBox
            {...paidCheckboxState}
            disabled={receiptItem.paid}
          >
          </CheckBox>
        </View>
      </Card>
    </>
  )
}



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  info: {
    marginTop: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: 300,
    flex: 1,
    marginBottom: 25,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 6,
  },

});

export default ReceiptCard;