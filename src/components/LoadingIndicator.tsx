import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import {Block} from '../components/';
import { useTheme } from '../hooks';

export const LoadingIndicator = () => {
  const {sizes} = useTheme();

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>      
        <ActivityIndicator size='large' />
        </Block>  
      </Block> 
    </Block>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
