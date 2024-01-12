import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Ionicons} from '@expo/vector-icons';

import { IMemberItem } from "../constants/types";
import { useTheme } from "../hooks";
import Block from "./Block";
import Text from "./Text";
import { BsPerson } from "react-icons/bs"
import Image from './Image';

const MemberItem = ({
    id,
    name
}: IMemberItem) => {
    const {colors, gradients, icons, sizes} = useTheme();
    const navigation = useNavigation();

    const handlePress = () => {
        // To do: navigate to the profile of the member whom was clicked
        navigation.navigate('Screens', {
            screen: 'Pro',
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Block row marginBottom={sizes.sm}>
                <Text h5 bold marginRight={sizes.xl}>{name}</Text> 
                <Block row align="center" justify="flex-end" marginRight={sizes.xs}>
                <Ionicons
                    name={'person-outline'}
                    size={20}
                />
                </Block>
            </Block>
        </TouchableWithoutFeedback>
    );
};

export default MemberItem;