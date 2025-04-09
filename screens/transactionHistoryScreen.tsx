import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { SHARED, COLORS } from '../styles/sharedStyles';
import CustomHeader from '../components/customHeader';
import { getStatusColor } from '../utils/statusColorUtils';
import TransactionCard from '../components/transactionCard';

const transactions = [
    { id: '1', amount: 120.5, date: '2025-04-08', description: 'Store purchase', type: 'debit', status: 'confirmed' },
    { id: '2', amount: 500.0, date: '2025-04-07', description: 'Deposit', type: 'credit', status: 'confirmed' },
    { id: '3', amount: 9267, date: '2025-04-06', description: 'Transfer to card', type: 'debit', status: 'cancelled' },
];

const TransactionHistoryScreen = ({ navigation }: any) => {
    const [isAmountRevealed, setIsAmountRevealed] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const renderItem = ({ item }: any) => {
        const isCredit = item.type === 'credit';

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Transaction Detail', { transaction: item })}
            >
                <View style={SHARED.card}>
                    <TransactionCard
                        item={item}
                        isCredit={isCredit}
                        isAmountRevealed={isAmountRevealed}
                        getStatusColor={getStatusColor}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Transaction Detail', { transaction: item })}
                    >
                        <Text style={[SHARED.label, { color: COLORS.primary }]}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={SHARED.container}>
            <CustomHeader
                title="Transactions"
                isRevealed={isAmountRevealed}
                onToggle={() => setIsAmountRevealed(!isAmountRevealed)}
            />

            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
};

export default TransactionHistoryScreen;