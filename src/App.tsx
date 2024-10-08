import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RootLayout from './Layout';
import DashboardPage from './pages/DashboardPage';
import AddEntryCard from './components/Cards/AddEntryCard';
import Login from './components/Login';
import { getCurrentUser, User } from './utils/services/authService';
import SignUp from './components/SignUp';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    loadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <RootLayout>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login onLogin={setUser} />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/" /> : <SignUp onSignUp={setUser} />
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