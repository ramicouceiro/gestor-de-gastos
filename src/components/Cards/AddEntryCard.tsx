import React, { useState } from 'react';
import Card from "./Card";
import { addTransaction } from '../../utils/services/currenciesService';
interface ClassnameProps {
    className?: string;
}

export default function AddEntryCard({ className }: ClassnameProps) {
    const [entryType, setEntryType] = useState("EXPENSE");
    const [currency, setCurrency] = useState("ARS");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [payedWith, setPayedWith] = useState("ARS");

    const handleSelectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEntryType(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    };

    const handlePayedWith = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPayedWith(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let finalAmount = amount;
        let finalCurrency = currency;

        if (currency === 'ARS' && payedWith === 'USD') {
            finalAmount = amount / 1210;
            finalCurrency = 'USD';
        } else if (currency === 'USD' && payedWith === 'ARS') {
            finalAmount = amount * 1210;
            finalCurrency = 'ARS';
        }

        const newTransaction = await addTransaction(entryType, finalAmount, finalCurrency, description);
        if (newTransaction) {
            alert('Transacción agregada');
            // Aquí puedes agregar lógica adicional, como redirigir al usuario o limpiar el formulario
        } else {
            alert('Error al agregar la transacción');
        }
    };

    return (
        <Card className={`${className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] p-4 sm:p-6 md:p-8 lg:p-10`}>
            <form className="flex flex-col gap-3 sm:gap-4 select-none" onSubmit={handleSubmit}>
                <label htmlFor="Amount" className='font-bold'>Amount</label>
                <input name="Amount" type="number" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" onChange={handleAmountChange} />
                <label htmlFor="Currency" className='font-bold'>Currency</label>
                <select name="Currency" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" onChange={handleCurrencyChange}>
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                </select>
                <label htmlFor="Payed-with" className='font-bold'>From account</label>
                <select name="Payed-with" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" onChange={handlePayedWith}>
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                </select>
                <label htmlFor="Description" className='font-bold'>Label</label>
                <input name="Description" type="text" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" onChange={handleDescriptionChange} />
                <label htmlFor="Type" className='font-bold'>Type</label>
                <select name="Type" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" onChange={handleSelectType}>
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                </select>
                <div className="flex gap-3 sm:gap-5 w-full justify-center mt-4 sm:mt-5">
                    <button type="submit" className="font-bold shadow-neomorphic rounded-xl p-3 sm:p-4 hover:shadow-neomorphicInset hover:scale-95 transition-transform duration-150 ease-in-out text-sm sm:text-base">AGREGAR</button>
                </div>
            </form>
        </Card>
    );
}