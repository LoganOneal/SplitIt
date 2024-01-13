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
            <Block card margin={sizes.sm} flex={0}>
                <Text h4 align="center" marginTop={sizes.m}>
                    {t('groups.add')}
                </Text>

                <Input
                    autoCapitalize="none"
                    marginVertical={sizes.m}
                    marginHorizontal={sizes.sm}
                    keyboardType="default"
                    label={t('common.name')}
                    placeholder={t('common.name')}
                //   onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                    autoCapitalize="none"
                    marginVertical={sizes.m}
                    marginHorizontal={sizes.sm}
                    keyboardType="default"
                    label={t('common.phoneNumber')}
                    placeholder={t('common.phoneNumberPlaceholder')}
                //   onChangeText={(value) => handleChange({password: value})}
                />

                <Button
                    black
                    marginTop={sizes.xl}
                    marginBottom={sizes.l}
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