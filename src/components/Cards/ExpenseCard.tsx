import Card from "./Card";
import { DocumentMinusIcon } from "@heroicons/react/24/outline";
import MonthlyChangeText from "./MonthlyChangeText";
import { useEffect, useState } from "react";
import { getUserMonthlyIncomeOrExpense } from "../../utils/services/currenciesService";
import { CardSkeleton } from "../skeletons/skeletons";
import { useAppStore } from "../../utils/store";

interface ClassnameProps {
    className?: string;
}

export default function ExpenseCard({ className }: ClassnameProps) {
    const actualMonthName = new Date().toLocaleString('en-US', { month: 'long' });
    const actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();
    const previousMonth = actualMonth === 1 ? 12 : actualMonth - 1;
    const previousMonthYear = actualMonth === 1 ? actualYear - 1 : actualYear;

    const [monthlyExpense, setMonthlyExpense] = useState<number | null>(null);
    const [monthlyChangePercentage, setMonthlyChangePercentage] = useState<number | null>(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            let currentExpense: number | null = null;
            let previousExpense: number | null = null;
            if(useAppStore.getState().monthlyIncomes) {
                currentExpense = useAppStore.getState().monthlyIncomes;
            } else {
                currentExpense = await getUserMonthlyIncomeOrExpense('EXPENSE', actualMonth, actualYear) as number;
                previousExpense = await getUserMonthlyIncomeOrExpense('EXPENSE', previousMonth, previousMonthYear) as number;
                useAppStore.getState().setMonthlyIncomes(currentExpense);
                useAppStore.getState().setLastMonthIncomes(previousExpense);
            }
            setMonthlyExpense(currentExpense);

            if (previousExpense !== 0) {
                const percentageChange = (currentExpense ?? 0) - (previousExpense ?? 0);
                setMonthlyChangePercentage(percentageChange);
            } else {
                setMonthlyChangePercentage(null);
            }
        };

        fetchExpenses();
    }, [actualMonth, actualYear, previousMonth, previousMonthYear]);

    return (
        <Card className={`${className}`}>
            {monthlyExpense === null ? (<CardSkeleton/>) : ( 
                <div className="p-6 flex flex-col">
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                            <DocumentMinusIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold">Expenses from {actualMonthName}</h3>
                    </div>
                    <div className="mt-auto">
                        <p className="text-3xl font-bold mb-1">${monthlyExpense?.toLocaleString()}</p>
                        <MonthlyChangeText type="EXPENSE" monthlyChange={monthlyChangePercentage} />
                    </div>
                </div>
            )}
        </Card>
    );
}