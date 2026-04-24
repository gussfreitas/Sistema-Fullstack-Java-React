import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components';
import { LoginPage, ClientesPage, ClienteFormPage, ClienteDetailPage } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública - Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas privadas - Clientes */}
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <ClientesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/novo"
          element={
            <PrivateRoute>
              <ClienteFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/editar/:id"
          element={
            <PrivateRoute>
              <ClienteFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/:id"
          element={
            <PrivateRoute>
              <ClienteDetailPage />
            </PrivateRoute>
          }
        />

        {/* Rota padrão - Redireciona para clientes ou login */}
        <Route
          path="/"
          element={<Navigate to="/clientes" replace />}
        />

        {/* Rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
