import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    RefreshControl,
    SafeAreaView,
    TouchableOpacity,
    SectionList,
} from 'react-native';
import { SHARED, COLORS } from '../styles/sharedStyles';
import CustomHeader from '../components/customHeader';
import { getStatusColor } from '../utils/statusColorUtils';
import TransactionCard from '../components/transactionCard';
import moment from 'moment';

const transactions = [
    { id: '1', amount: 120.5, date: '2025-04-08', description: 'Store purchase', type: 'debit', status: 'confirmed' },
    { id: '2', amount: 500.0, date: '2025-04-07', description: 'Deposit', type: 'credit', status: 'confirmed' },
    { id: '3', amount: 9267, date: '2025-04-06', description: 'Transfer to card', type: 'debit', status: 'cancelled' },
    { id: '4', amount: 200.75, date: '2025-04-05', description: 'Online purchase', type: 'debit', status: 'confirmed' },
    { id: '5', amount: 1500.0, date: '2025-04-05', description: 'Salary', type: 'credit', status: 'confirmed' },
    { id: '6', amount: 99.99, date: '2025-04-04', description: 'Grocery shopping', type: 'debit', status: 'confirmed' },
    { id: '7', amount: 300.0, date: '2025-04-03', description: 'Bank transfer', type: 'credit', status: 'pending' },
    { id: '8', amount: 50.5, date: '2025-04-03', description: 'Coffee shop', type: 'debit', status: 'confirmed' },
    { id: '9', amount: 220.0, date: '2025-04-02', description: 'ATM withdrawal', type: 'debit', status: 'confirmed' },
    { id: '10', amount: 750.0, date: '2025-04-01', description: 'Freelance payment', type: 'credit', status: 'confirmed' },
    { id: '11', amount: 45.0, date: '2025-03-31', description: 'Lunch with team', type: 'debit', status: 'confirmed' },
    { id: '12', amount: 120.0, date: '2025-03-30', description: 'Uber ride', type: 'debit', status: 'cancelled' },
    { id: '13', amount: 680.0, date: '2025-03-29', description: 'Bonus payment', type: 'credit', status: 'confirmed' },
    { id: '14', amount: 18.75, date: '2025-03-28', description: 'Snack vending', type: 'debit', status: 'confirmed' },
    { id: '15', amount: 360.0, date: '2025-03-27', description: 'Cashback', type: 'credit', status: 'confirmed' },
    { id: '16', amount: 5000.0, date: '2025-03-26', description: 'Rent payment', type: 'debit', status: 'confirmed' },
    { id: '17', amount: 250.0, date: '2025-03-25', description: 'Gift received', type: 'credit', status: 'pending' },
    { id: '18', amount: 40.0, date: '2025-03-24', description: 'Fast food', type: 'debit', status: 'confirmed' },
    { id: '19', amount: 100.0, date: '2025-03-23', description: 'Transport card top-up', type: 'debit', status: 'confirmed' },
    { id: '20', amount: 1350.0, date: '2025-03-22', description: 'Project milestone', type: 'credit', status: 'confirmed' },
];

const TransactionHistoryScreen = ({ navigation }: any) => {
    const [isAmountRevealed, setIsAmountRevealed] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);

    const onRefresh = () => {
        setRefreshing(true);
        // You can replace the timeout with your API re-fetch
        setTimeout(() => setRefreshing(false), 1000);
    };

    useEffect(() => {
        groupByMonth(transactions);
    }, []);

    const groupByMonth = (data: any[]) => {
        const groups: { [key: string]: any[] } = {};

        data.forEach((item) => {
            const month = moment(item.date).format('MMMM YYYY'); // e.g., April 2025
            if (!groups[month]) groups[month] = [];
            groups[month].push(item);
        });

        // Convert to array of sections
        const sections = Object.entries(groups)
            .map(([title, data]) => ({
                title,
                data: data.sort((a, b) => moment(b.date).diff(moment(a.date))) // latest first
            }))
            .sort((a, b) => moment(b.title, 'MMMM YYYY').diff(moment(a.title, 'MMMM YYYY'))); // latest month first

        setGroupedTransactions(sections);
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

    const renderSectionHeader = ({ section: { title } }: any) => (
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 8 }}>
            {title}
        </Text>
    );

    return (
        <SafeAreaView style={SHARED.container}>
            <CustomHeader
                title="Transactions"
                isRevealed={isAmountRevealed}
                onToggle={() => setIsAmountRevealed(!isAmountRevealed)}
            />

            <SectionList
                sections={groupedTransactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
};

export default TransactionHistoryScreen;
