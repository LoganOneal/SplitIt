import React from "react";
import {FlatList, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Ionicons} from '@expo/vector-icons';

import {Block, Button, Text} from '../components/';
import { useTranslation, useTheme } from "../hooks";
import { MEMBERS } from "../constants/mocks";
import MemberItem from "../components/MemberItem";

const isAndroid = Platform.OS === 'android';

const ReceiptGroup = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const {colors, sizes} = useTheme();
    const members = MEMBERS

    const handleCreate = () => {
        // To do: navigate to the profile of the member whom was clicked
        navigation.navigate('Screens', {
            screen: 'Pro',
        });
    };

    return (
        <Block>
            <Block color={colors.card} flex={0} paddingHorizontal={sizes.padding} paddingBottom={sizes.padding}>
                <Text h4>
                    {t('groups.members')}
                </Text>
            </Block>

            <Block card margin={sizes.sm}>
                <FlatList
                    data={members}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => `${item?.id}`}
                    style={{paddingHorizontal: sizes.padding}}
                    contentContainerStyle={{paddingBottom: sizes.l}}
                    renderItem={({item}) => <MemberItem {...item} />}
                    ItemSeparatorComponent={() => <Block divider marginBottom={sizes.sm} />}
                />
            </Block>

            <Block 
                justify="flex-end"
                marginBottom={sizes.sm}>
                <Button
                    white
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    row
                    shadow={!isAndroid}
                    onPress={() => navigation.navigate('AddMember')}>
                    <Text bold transform="uppercase">
                        {t('groups.add')}
                    </Text>
                    <Ionicons
                        name={'add'}
                        size={20}
                    />
                </Button>
                <Button
                    black
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    row
                    shadow={!isAndroid}
                    onPress={handleCreate}>
                    <Text white bold transform="uppercase">
                        {t('groups.create')}
                    </Text>
                </Button>
            </Block>
        </Block>
    );
};

export default ReceiptGroup;