import Card from "./Card";
import { DocumentMinusIcon } from "@heroicons/react/24/outline";
import MonthlyChangeText from "./MonthlyChangeText";
import { useEffect, useState } from "react";
import { getArsTotalAmount } from "../../test";
import { CardSkeleton } from "../skeletons/skeletons";

interface ClassnameProps {
    className?: string;
}

export default function ExpenseCard({ className }: ClassnameProps) {
    const actualMonthName = new Date().toLocaleString('es-ES', { month: 'long' });
    const [monthlyExpense, setMonthlyExpense] = useState<number | null>(null);
    const [monthlyChange, setMonthlyChange] = useState<number | null>(null);
    useEffect(() => {
        const promise = getArsTotalAmount();
        promise.then((totalAmount) => {
            setMonthlyExpense(totalAmount as number);
            setMonthlyChange(totalAmount as number - 999990);
        });
    }, []);
    return (
        <Card className={`${className}`}>
            {monthlyExpense === null ? (<CardSkeleton/>) : ( 
                <div className="p-6 flex flex-col">
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                            <DocumentMinusIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold">Gastos de {actualMonthName}</h3>
                    </div>
                    <div className="mt-auto">
                        <p className="text-3xl font-bold mb-1">${monthlyExpense?.toLocaleString()}</p>
                        <MonthlyChangeText type="INCOME" monthlyChange={monthlyChange} />
                    </div>
                </div>
            )}
        </Card>
    );
}