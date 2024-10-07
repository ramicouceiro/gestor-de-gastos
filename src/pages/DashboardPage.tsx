import Masonry from 'react-masonry-css';
import ExpenseCard from "../components/Cards/ExpenseCard";
import IncomeCard from "../components/Cards/IncomeCard";
import { SavingsCard } from "../components/Cards/SavingsCard";
import TotalAmountCard from "../components/Cards/TotalAmountCard";

export default function DashboardPage() {
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="p-6 h-screen text-foreground select-none">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        <TotalAmountCard />
        <IncomeCard />
        <ExpenseCard />
        <SavingsCard />
      </Masonry>
    </div>
  )
}
