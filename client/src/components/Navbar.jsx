import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-title">Sistema de Clientes</h2>
        <div className="navbar-content">
          <span className="navbar-user">
            Bem-vindo, <strong>{user?.nome || 'Usuário'}</strong>
          </span>
          <button onClick={handleLogout} className="navbar-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
