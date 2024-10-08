import ExpenseCard from "../components/Cards/ExpenseCard";
import IncomeCard from "../components/Cards/IncomeCard";
import { SavingsCard } from "../components/Cards/SavingsCard";
import TotalAmountCard from "../components/Cards/TotalAmountCard";
import TransactionsCard from '../components/Cards/TransactionsCard';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-5 md:p-6 min-h-screen text-foreground select-none">
      <div className="pb-4 sm:pb-5 md:pb-6 pt-4 sm:pt-5 md:pt-6 mt-16 lg:mt-0">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        <TotalAmountCard />
        <IncomeCard />
        <ExpenseCard />
        <SavingsCard className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:row-span-2"/>
        <TransactionsCard className="sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3"/>
      </div>
    </div>
  )
}