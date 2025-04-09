import React from 'react';
import { View, Text } from 'react-native';
import { SHARED, COLORS } from '../styles/sharedStyles';  // Make sure to import your shared styles

type TransactionCardProps = {
    item: any;  // transaction object (same for both history and detail)
    isCredit: boolean;  // Whether the transaction is a credit or debit
    isAmountRevealed: boolean;  // Controls whether the amount is revealed
    getStatusColor: (status: string) => string;  // Function to get the status color
    isDetailView?: boolean;  // Determines if it's in the "Detail" view (adjusts margin and layout)
};

const TransactionCard: React.FC<TransactionCardProps> = ({
    item,
    isCredit,
    isAmountRevealed,
    getStatusColor,
    isDetailView = false,  // Default to false (history view)
}) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: isDetailView ? 20 : 12 }}>
                <View style={SHARED.iconCircle}>
                    <Text style={SHARED.iconText}>{isCredit ? '+' : '-'}</Text>
                </View>

                {isDetailView ? <></> : <View style={{ flex: 1 }}>
                    <Text style={SHARED.value}>{item.description}</Text>
                    <Text style={SHARED.label}>{item.date}</Text>
                </View>}

                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[SHARED.amount, { color: isCredit ? COLORS.success : COLORS.danger }]}>
                        {isAmountRevealed ? `$${item.amount.toFixed(2)}` : '*****'}
                    </Text>
                    <Text style={[SHARED.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </>
    );
};

export default TransactionCard;