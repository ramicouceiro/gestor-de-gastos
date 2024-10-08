import supabase from "../supabase";

export type UserCurrencies = {
    ars_amount: number;
    usd_amount: number;
}

export type UserTransaction = {
    id: number;
    idusr: number;
    amount: number;
    currency: string;
    created_at: string; // Formato timestamptz en la base de datos
    description: string;
    type: string;
    label: string;
}


export const getArsTotalAmount = async (): Promise<number | null> => {
    const userId = 2;
    const { data, error } = await supabase
        .from('usr_currencies')
        .select('ars_amount, usd_amount')
        .eq('id', userId)
        .single();

    if (error) {
        console.log(error);
        return null;
    }

    let totalArs = data?.ars_amount;
    const exchangeRate = await getCurrencyExchangeRate('USD', 'ARS');
    totalArs = totalArs + (data?.usd_amount * exchangeRate);

    return totalArs;
}

export const getUserMonthlyIncomeOrExpense = async (type: string, actualMonth: number, actualYear: number) => {
    const userId = 2;
    const { data, error } = await supabase
        .from('usr_transactions')
        .select('*')
        .eq('idusr', userId)
        .eq('type', type)
        .gte('created_at', `${actualYear}-${actualMonth.toString().padStart(2, '0')}-01`)
        .lt('created_at', `${actualYear}-${(actualMonth + 1).toString().padStart(2, '0')}-01`)
        
    if (error) {
        console.error('Error al obtener las transacciones del usuario:', error);
        return null;
    }

    const userTransactions = data as UserTransaction[];
    const monthlyIncome = await userTransactions.reduce(async (totalPromise, transaction) => {
        const total = await totalPromise;
        if (transaction.currency === 'ARS') {
            return total + transaction.amount;
        } else if (transaction.currency === 'USD') {
            const exchangeRate = await getCurrencyExchangeRate('USD', 'ARS');
            return total + transaction.amount * exchangeRate;
        }
        return total;
    }, Promise.resolve(0));

    return monthlyIncome;
};

async function getCurrencyExchangeRate(from: string, to: string): Promise<number> {
    if(from === 'USD' && to === 'ARS') {
        return 1210;
    }
    return 1;
}

export const getUserTransactions = async (): Promise<UserTransaction[]> => {
    const userId = 2;
    const { data, error } = await supabase
        .from('usr_transactions')
        .select('*')
        .eq('idusr', userId);

    if (error) {
        console.error('Error al obtener las transacciones del usuario:', error);
        return [];
    }

    return data as UserTransaction[];
}

export const addTransaction = async (type: string, amount: number, currency: string, description: string) : Promise<boolean | null>  => {
    const idusr = 2;
    const transaction = {
        idusr : idusr,
        amount,
        currency,
        label: description,
        type,
    };
    const { data, error } = await supabase
        .from('usr_transactions')
        .insert([{ ...transaction}]);

    if (error) {
        console.error('Error', error);
        return null;
    }

    await upsertCurrenciesAmount(idusr, amount, currency, type);

    return data;
};

export const getUserCurrencies = async (idusr: number): Promise<UserCurrencies | null> => {
    const { data, error } = await supabase
        .from('usr_currencies')
        .select('ars_amount, usd_amount')
        .eq('id', idusr)
        .single();

    if (error) {
        console.log(error);
        return null;
    }

    return data as UserCurrencies;
};

export const upsertCurrenciesAmount = async (idusr: number, amount: number, currency: string, type:string) => {
    const currencies : UserCurrencies = await getUserCurrencies(idusr) as UserCurrencies;
    
    if(currencies !== null) {
        if(currency === 'ARS') {
            if(type === 'EXPENSE') {
                currencies.ars_amount -= amount;
            }else{
                currencies.ars_amount += amount;
            }
        } else if(currency === 'USD') {
            if(type === 'EXPENSE') {
                currencies.usd_amount -= amount;
            }else{
                currencies.usd_amount += amount;
            }
        }
    }

        const { data, error } = await supabase
        .from('usr_currencies')
        .upsert([{ id: idusr, ars_amount: currencies.ars_amount, usd_amount: currencies.usd_amount}]);

        if (error) {
            console.error('Error al actualizar las monedas del usuario:', error);
            return null;
        }
        return data;


};