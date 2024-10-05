import ExpenseCard from "../components/Cards/ExpenseCard";
import IncomeCard from "../components/Cards/IncomeCard";
import { SavingsCard } from "../components/Cards/SavingsCard";
import TotalAmountCard from "../components/Cards/TotalAmountCard";

export default function DashboardPage() {
  return (
    <div className="p-6 h-screen text-foreground select-none">
      <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {/* Tarjeta de Balance Financiero */}
          <TotalAmountCard className="col-span-1" />

          {/* Tarjeta de Ingresos Generales */}
          <IncomeCard className="col-span-1"/>
          {/* Tarjeta de Total Insight */}
          <ExpenseCard className="col-span-1"/>

          <SavingsCard className="row-span-2 col-span-1"/>
        </div>
      </div>
    </div>
  )
}