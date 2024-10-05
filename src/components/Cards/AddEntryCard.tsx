import React, { useState } from 'react';
import Card from "./Card";
import { Link } from 'react-router-dom';

interface ClassnameProps {
    className?: string;
}

export default function AddEntryCard({ className }: ClassnameProps) {
    const [entryType, setEntryType] = useState("Expense");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEntryType(event.target.value);
    };

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        console.log(entryType);
    };

    return (
        <Card className={`${className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] p-10`}>
            <form className="flex flex-col gap-4 select-none">
                <label htmlFor="Amount" className='font-bold'>Monto</label>
                <input name="Amount" type="number" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" />
                <label htmlFor="Description" className='font-bold'>Descripción</label>
                <input name="Description" type="text" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" />
                <label htmlFor="Type" className='font-bold'>Tipo</label>
                <select name="Type" className="rounded-xl bg-transparent border-primary text-primary p-3 shadow-neomorphicInset focus:outline-none focus:border-none" onChange={handleSelectChange}>
                    <option value="Expense">Gasto</option>
                    <option value="Income">Ingreso</option>
                </select>
                <div className="flex gap-5 w-full justify-center mt-5">
                    <Link to={"/"}>
                        <button className="font-bold shadow-neomorphic rounded-xl p-4 text-red-500 hover:shadow-neomorphicInset hover:scale-95 transition-transform duration-150 ease-in-out">CANCELAR</button>
                    </Link>
                    <button onClick={handleSubmit} className="font-bold shadow-neomorphic rounded-xl p-4 hover:shadow-neomorphicInset hover:scale-95 transition-transform duration-150 ease-in-out">AGREGAR</button>
                </div>
            </form>
        </Card>
    );
}