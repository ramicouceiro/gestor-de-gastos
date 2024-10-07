// Importación correcta de los componentes y dependencias necesarias
import { useEffect, useState } from "react";
import Card from "./Card";
import { WalletIcon } from "@heroicons/react/24/outline";
import { getArsTotalAmount } from "../../test";
import { CardSkeleton } from "../skeletons/skeletons";

interface ClassnameProps {
    className?: string;
}


// Corrección del componente TotalAmountCard
export default function TotalAmountCard({ className }: ClassnameProps) {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    useEffect(() => {
        const promise = getArsTotalAmount();
        promise.then((totalAmount) => {
            setTotalAmount(totalAmount as number);
        });
    }, []);
    return (
        <Card className={`${className}`}>
            {totalAmount === null ? (<CardSkeleton/>) : (
                <div className="p-6 flex flex-col h-full">
                    <div className="flex flex-col justify-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold">Balance Actual (ARS)</h3>
                    </div>
                    <div className="mt-auto">
                        <p className="text-3xl font-bold mb-1">${totalAmount?.toLocaleString()}</p>
                        <p className="text-sm opacity-80">Calculado en base a tus balances en ARS y USD</p>
                    </div>
                </div>
            )}
        </Card>
    );
}
