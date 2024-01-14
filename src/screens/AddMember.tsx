import React, { useCallback, useEffect, useState } from "react";
import {useNavigation} from '@react-navigation/core';
import { Platform } from "react-native";

import {Block, Button, Input, Text} from '../components/';
import { useTranslation, useTheme } from "../hooks";
import * as regex from '../constants/regex';

const isAndroid = Platform.OS === 'android';

interface IMember {
    name: string;
    number: string;
}

interface IMemberValidation {
    name: boolean;
    number: boolean;
}

const AddMember = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const {colors, sizes} = useTheme();

    const [member, setMember] = useState<IMember>({
        name: '',
        number: ''
    });

    const [isValid, setIsValid] = useState<IMemberValidation>({
        name: false,
        number: false
    });

    const [nameFocused, setNameFocused] = useState(false);
    const onNameFocused = () => setNameFocused(true);
    const onNameBlur = () => setNameFocused(false);

    const [numberFocused, setNumberFocused] = useState(false);
    const onNumberFocused = () => setNumberFocused(true);
    const onNumberBlur = () => setNumberFocused(false);

    const handleChange = useCallback((value) => {
        setMember((state) => ({...state, ...value}))
    }, [setMember]);

    const handleSubmit = (useCallback(() => {
        /*
         * To do:
         * 1. Verify that the phone number is not associated with someone already in the group
         * 2. Add the new person to the receipt group
         */
        if (!Object.values(isValid).includes(false)) {
            navigation.goBack()
        }
    }, [isValid]));

    useEffect(() => {
        setIsValid((state) => ({
            ...state,
            name: member.name.trim() !== '',
            number: regex.phoneNumber.test(member.number)
        }))
    }, [member, setIsValid]);

    return (
        <Block>
            <Block
                card
                margin={sizes.sm}
                shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                flex={0}>
                <Text h4 align="center" marginTop={sizes.m}>
                    {t('groups.add')}
                </Text>

                <Input
                    autoCapitalize="none"
                    marginVertical={sizes.m}
                    marginHorizontal={sizes.sm}
                    keyboardType="default"
                    onFocus={onNameFocused}
                    onBlur={onNameBlur}
                    label={t('common.name')}
                    placeholder={t('common.name')}
                    danger={Boolean(member.name && !isValid.name && !nameFocused)}
                    onChangeText={(value) => handleChange({name: value})}
                />
                {/* Error message */}
                {member.name && !isValid.name && !nameFocused && (
                    <Text
                        color={colors.danger}
                        marginTop={sizes.s}
                        marginHorizontal={sizes.sm}>
                    Please enter a name
                    </Text>
                )}
                <Input
                    autoCapitalize="none"
                    marginVertical={sizes.m}
                    marginHorizontal={sizes.sm}
                    keyboardType="default"
                    onFocus={onNumberFocused}
                    onBlur={onNumberBlur}
                    label={t('common.phoneNumber')}
                    placeholder={t('common.phoneNumberPlaceholder')}
                    danger={Boolean(member.number && !isValid.number && !numberFocused)}
                    onChangeText={(value) => handleChange({number: value})}
                />
                {/* Error message */}
                {member.number && !isValid.number && !numberFocused && (
                    <Text
                        color={colors.danger}
                        marginVertical={sizes.s}
                        marginHorizontal={sizes.sm}>
                    Please use the format: ###-###-####
                    </Text>
                )}
                <Button
                    black
                    marginTop={sizes.xl}
                    marginBottom={sizes.l}
                    marginHorizontal={sizes.sm}
                    row
                    onPress={handleSubmit}
                    disabled={Object.values(isValid).includes(false)}
                    shadow={!isAndroid}>
                    <Text white bold transform="uppercase">
                        {t('common.submit')}
                    </Text>
                </Button>
            </Block>             
        </Block>
    );
};

export default AddMember;