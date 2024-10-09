import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RootLayout from './Layout';
import DashboardPage from './pages/DashboardPage';
import AddEntryCard from './components/Cards/AddEntryCard';
import Login from './components/Login';
import { getCurrentUser } from './utils/services/authService';
import SignUp from './components/SignUp';
import { useAppStore } from './utils/store';

function App() {
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    loadUser();
  }, [setUser]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <RootLayout>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/" /> : <SignUp />
        } />
        <Route path="/" element={
          user ? <DashboardPage /> : <Navigate to="/login" />
        } />
        <Route path="/expenses" element={user ? <h1>Gastos</h1> : <Navigate to="/login" />} />
        <Route path="/income" element={user ? <h1>Ingresos</h1> : <Navigate to="/login" />} />
        <Route path="/investments" element={user ? <h1>Inversiones</h1> : <Navigate to="/login" />} />
        <Route path="/add" element={user ? <AddEntryCard /> : <Navigate to="/login" />} />
      </Routes>
    </RootLayout>
  );
}

export default App;