import React from "react";
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Input, Image, Text} from '../components/';
import { useTranslation, useTheme } from "../hooks";

const AddMember = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const {colors, icons, sizes, gradients} = useTheme();

    return (
        <Block>
            <Block card margin={sizes.sm}>
                <Text h4 align="center">
                    {t('groups.add')}
                </Text>

                <Block paddingHorizontal={sizes.sm}>
                    <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    keyboardType="default"
                    label={t('common.name')}
                    placeholder={t('common.name')}
                    //   onChangeText={(value) => handleChange({email: value})}
                    />
                    <Input
                    secureTextEntry
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    keyboardType="number-pad"
                    label={t('common.phoneNumber')}
                    placeholder={t('common.phoneNumberPlaceholder')}
                    //   onChangeText={(value) => handleChange({password: value})}
                    />
                </Block>

                <Button
                    black
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    row
                    // onPress={handleCreate}>
                    >
                    <Text white bold transform="uppercase">
                        {t('common.submit')}
                    </Text>
                </Button>
            </Block>
        </Block>
    );
};

export default AddMember;