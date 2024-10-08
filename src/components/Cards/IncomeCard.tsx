import Card from "./Card";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import MonthlyChangeText from "./MonthlyChangeText";
import { useEffect, useState } from "react";
import { getUserMonthlyIncomeOrExpense } from "../../utils/services/currenciesService";
import { CardSkeleton } from "../skeletons/skeletons";

interface ClassnameProps {
    className?: string;
}

export default function IncomeCard({ className }: ClassnameProps) {
        const actualMonthName = new Date().toLocaleString('es-ES', { month: 'long' });
    const actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();
    const previousMonth = actualMonth === 1 ? 12 : actualMonth - 1;
    const previousMonthYear = actualMonth === 1 ? actualYear - 1 : actualYear;
    
    const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
    const [monthlyChangePercentage, setMonthlyChangePercentage] = useState<number | null>(null);
    
    useEffect(() => {
        const fetchIncomes = async () => {
            const currentIncome = await getUserMonthlyIncomeOrExpense('INCOME', actualMonth, actualYear) as number;
            const previousIncome = await getUserMonthlyIncomeOrExpense('INCOME', previousMonth, previousMonthYear) as number;
    
            setMonthlyIncome(currentIncome);
    
            if (previousIncome !== 0) {
                const percentageChange = (currentIncome - previousIncome);
                setMonthlyChangePercentage(percentageChange);
            } else {
                setMonthlyChangePercentage(null);
            }
        };
    
        fetchIncomes();
    }, [actualMonth, actualYear, previousMonth, previousMonthYear]);
    return (
        <Card className={`${className}`}>
            {monthlyIncome === null ? (<CardSkeleton/>) : ( 
                <div className="p-6 flex flex-col">
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                            <DocumentPlusIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold">Ingresos de {actualMonthName}</h3>
                    </div>
                    <div className="mt-auto">
                        <p className="text-3xl font-bold mb-1">${monthlyIncome?.toLocaleString()}</p>
                        <MonthlyChangeText type="INCOME" monthlyChange={monthlyChangePercentage} />
                    </div>
                </div>
            )}
        </Card>
    );
}