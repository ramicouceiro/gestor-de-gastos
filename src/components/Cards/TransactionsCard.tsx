import { useEffect, useState } from "react";
import { getUserTransactions } from "../../utils/services/currenciesService";
import Card from "./Card";
import { TransactionsSkeleton } from "../skeletons/skeletons";
import { useAppStore } from "../../utils/store";

export default function TransactionsCard({ className }: { className?: string }) {
    const transactions = useAppStore((state) => state.transactions);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (transactions.length === 0) {
                const userTransactions = await getUserTransactions();
                useAppStore.getState().setTransactions(userTransactions);
            }
            setIsLoading(false);
        };

        fetchTransactions();
    }, [transactions]);

    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return (
        <Card className={`${className}`}>
            {isLoading ? <TransactionsSkeleton  /> : (
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
                    </div>
                    <div className="overflow-y-auto max-h-48 custom-scrollbar pr-4">
                        <ul className="flex flex-col gap-3">
                            {sortedTransactions.length > 0 ? sortedTransactions.map(transaction => (
                                <li key={transaction.id} className="p-4 flex justify-between items-center rounded-lg shadow-neomorphicInset">
                                    <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                                    <span>{transaction.label}</span>
                                    <span className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                                        {transaction.currency}${transaction.amount.toFixed(2)}
                                    </span>
                                </li>
                            )) : <li className="text-center text-gray-500">No transactions found</li>}
                        </ul>
                    </div>
                </div>
            )}
        </Card>
    );
}