import { create } from 'zustand'
import { User } from './services/authService'
import { UserTransaction } from './services/currenciesService'

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
  arsTotalAmount: number | null
  setArsTotalAmount: (arsTotalAmount: number | null) => void
  transactions: UserTransaction[]
  setTransactions: (transactions: UserTransaction[]) => void
  monthlyExpenses: number | null
  setMonthlyExpenses: (monthlyExpenses: number | null) => void
  monthlyIncomes: number | null
  setMonthlyIncomes: (monthlyIncomes: number | null) => void
  lastMonthExpenses: number | null
  setLastMonthExpenses: (lastMonthExpenses: number | null) => void
  lastMonthIncomes: number | null
  setLastMonthIncomes: (lastMonthIncomes: number | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  arsTotalAmount: null,
  setArsTotalAmount: (arsTotalAmount) => set({ arsTotalAmount }),
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  monthlyExpenses: null,
  setMonthlyExpenses: (monthlyExpenses) => set({ monthlyExpenses }),
  monthlyIncomes: null,
  setMonthlyIncomes: (monthlyIncomes) => set({ monthlyIncomes }),
  lastMonthExpenses: null,
  setLastMonthExpenses: (lastMonthExpenses) => set({ lastMonthExpenses }),
  lastMonthIncomes: null,
  setLastMonthIncomes: (lastMonthIncomes) => set({ lastMonthIncomes }),
}))