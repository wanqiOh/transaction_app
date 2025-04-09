import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SHARED, COLORS } from '../styles/sharedStyles';

type HeaderProps = {
    title: string;
    isRevealed: boolean;
    onToggle: () => void;
};

const Header: React.FC<HeaderProps> = ({
    title,
    isRevealed,
    onToggle,
}) => {
    return (
        <View style={SHARED.headerRow}>
            <Text style={SHARED.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={onToggle}>
                <Ionicons
                    name={isRevealed ? 'eye' : 'eye-off'}
                    size={24}
                    color={COLORS.primary}
                    style={{ paddingRight: 12 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;