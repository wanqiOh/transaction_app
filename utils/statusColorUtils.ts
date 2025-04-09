import { COLORS } from '../styles/sharedStyles';  // Make sure the path to COLORS is correct

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'confirmed':
            return COLORS.success;
        case 'cancelled':
            return COLORS.danger;
        default:
            return COLORS.warning;
    }
};