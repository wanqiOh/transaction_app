import { StyleSheet } from 'react-native';

export const COLORS = {
    background: '#F7F9FC',
    white: '#FFFFFF',
    primary: '#2196F3',
    success: '#4CAF50',
    danger: '#F44336',
    warning: '#FFC107',
    textDark: '#333',
    textGray: '#888',
    lightBlue: '#E3F2FD',
};

export const SHARED = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        margin: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 16,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
        textTransform: 'capitalize',
    },
    label: {
        fontSize: 14,
        color: COLORS.textGray,
        marginTop: 12,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textDark,
    },
});