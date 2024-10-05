import Card from "./Card";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
import MonthlyChangeText from "./MonthlyChangeText";

interface ClassnameProps {
    className?: string;
}

export default function IncomeCard({ className }: ClassnameProps) {
    const actualMonthName = new Date().toLocaleString('es-ES', { month: 'long' });
    const monthlyIncome = 1000000;
    const monthlyChange = 10;
    return (
        <Card className={`${className}`}>
            <div className="p-6 flex flex-col">
                <div className="flex flex-col justify-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                        <PresentationChartLineIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold">Ingresos de {actualMonthName}</h3>
                </div>
                <div className="mt-auto">
                    <p className="text-3xl font-bold mb-1">${monthlyIncome?.toLocaleString()}</p>
                    <MonthlyChangeText type="INCOME" monthlyChange={monthlyChange} />
                </div>
            </div>
        </Card>
    );
}