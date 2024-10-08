import { useEffect, useState } from "react";
import { UserTransaction, getUserTransactions } from "../../utils/services/currenciesService";
import Card from "./Card";

export default function TransactionsCard({ className }: { className?: string }) {
    const [transactions, setTransactions] = useState<UserTransaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userTransactions = await getUserTransactions();
            setTransactions(userTransactions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        };

        fetchTransactions();
    }, []);

    return (
        <Card className={`${className}`}>
            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col justify-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Transacciones</h3>
                </div>
                <div className="overflow-y-auto max-h-48 custom-scrollbar pr-4">
                    <ul className="flex flex-col gap-3">
                        {transactions.map(transaction => (
                            <li key={transaction.id} className="p-4 flex justify-between items-center rounded-lg shadow-neomorphicInset">
                                <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                                <span>{transaction.label}</span>
                                <span className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                                    {transaction.currency}${transaction.amount.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}