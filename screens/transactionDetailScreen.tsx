import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { SHARED, COLORS } from '../styles/sharedStyles'; // Adjust the path as needed
import CustomHeader from '../components/customHeader';
import { getStatusColor } from '../utils/statusColorUtils';
import TransactionCard from '../components/transactionCard';

const TransactionDetailScreen = ({ route }: any) => {
    const { transaction } = route.params;
    const [isAmountRevealed, setIsAmountRevealed] = useState(false);

    const isCredit = transaction.type === 'credit';

    // Helper function to render label-value pairs
    const renderLabelValue = (label: string, value: string) => (
        <>
            <Text style={SHARED.label}>{label}</Text>
            <Text style={SHARED.value}>{value}</Text>
        </>
    );

    return (
        <SafeAreaView style={SHARED.container}>
            <CustomHeader
                title="Transaction Details"
                isRevealed={isAmountRevealed}
                onToggle={() => setIsAmountRevealed(!isAmountRevealed)}
            />

            <View style={{ paddingBottom: 16, paddingHorizontal: 16 }}>
                <View style={SHARED.card}>
                    <TransactionCard
                        item={transaction}
                        isCredit={isCredit}
                        isAmountRevealed={isAmountRevealed}
                        getStatusColor={getStatusColor}
                        isDetailView
                    />

                    <View style={{ borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 16 }}>
                        {renderLabelValue('Date', transaction.date)}
                        {renderLabelValue('Description', transaction.description)}
                        {renderLabelValue('Type', transaction.type)}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TransactionDetailScreen;