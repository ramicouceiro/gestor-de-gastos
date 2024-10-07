export default function MonthlyChangeText({ monthlyChange, type }: { monthlyChange: number | null, type: "INCOME" | "EXPENSE" }) {
    const previousMonthName = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('es-ES', { month: 'long' }).replace(/^\w/, c => c.toUpperCase());
    monthlyChange = monthlyChange || 0;
    return (
        <p className="text-sm opacity-80">
            <span className={type === "INCOME" ? `${monthlyChange >= 0 ? "text-green-500" : "text-red-500"}` : `${monthlyChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                {monthlyChange >= 0 ? `+$${monthlyChange?.toLocaleString()} ` : `-$${monthlyChange >=0 ? monthlyChange.toLocaleString() : (monthlyChange * -1).toLocaleString() } `}
            </span>
            comparado con {previousMonthName}
        </p>
    )
}