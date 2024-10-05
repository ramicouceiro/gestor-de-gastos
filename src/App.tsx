import { Route, Routes } from 'react-router-dom'
import RootLayout from './Layout'
import DashboardPage from './pages/DashboardPage'
import AddEntryCard from './components/Cards/AddEntryCard'

function App() {

  return (
      <RootLayout>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/expenses' element={<h1>Gastos</h1>} />
          <Route path='/income' element={<h1>Ingresos</h1>} />
          <Route path='/investments' element={<h1>Inversiones</h1>} />
          <Route path='/add' element={<AddEntryCard />} />
        </Routes>
      </RootLayout>
  )
}

export default App