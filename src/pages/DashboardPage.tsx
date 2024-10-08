import ExpenseCard from "../components/Cards/ExpenseCard";
import IncomeCard from "../components/Cards/IncomeCard";
import { SavingsCard } from "../components/Cards/SavingsCard";
import TotalAmountCard from "../components/Cards/TotalAmountCard";
import TransactionsCard from '../components/Cards/TransactionsCard';

export default function DashboardPage() {

  return (
    <div className="p-6 h-screen text-foreground select-none">
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
        <div className="xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 dashboard-grid">
          <TotalAmountCard />
          <IncomeCard />
          <ExpenseCard />
          <SavingsCard className="row-span-2"/>
          <TransactionsCard className="col-span-3"/>
        </div>
    </div>
  )
}