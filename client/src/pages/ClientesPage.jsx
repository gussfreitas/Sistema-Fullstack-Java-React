import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import clienteService from '../services/clienteService';
import '../styles/ClientesPage.css';

export default function ClientesPage() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    carregarClientes();
  }, [page]);

  const carregarClientes = async () => {
    setIsLoading(true);
    const result = await clienteService.getAll(page, 10);

    if (result.success) {
      setClientes(result.data.content || []);
      setTotalPages(result.data.totalPages || 0);
      setError('');
    } else {
      setError(result.error);
      setClientes([]);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar?')) {
      return;
    }

    const result = await clienteService.delete(id);

    if (result.success) {
      carregarClientes();
    } else {
      setError(result.error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/clientes/editar/${id}`);
  };

  const handleView = (id) => {
    navigate(`/clientes/${id}`);
  };

  return (
    <div className="clientes-page">
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <h1>Clientes</h1>
          <button
            onClick={() => navigate('/clientes/novo')}
            className="btn btn-primary"
          >
            + Novo Cliente
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {isLoading ? (
          <div className="loading-spinner">
            Carregando...
          </div>
        ) : clientes.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum cliente encontrado</p>
            <button
              onClick={() => navigate('/clientes/novo')}
              className="btn btn-primary"
            >
              Criar Primeiro Cliente
            </button>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="clientes-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.cpf}</td>
                      <td>{cliente.email || '-'}</td>
                      <td>{cliente.telefone || '-'}</td>
                      <td className="actions">
                        <button
                          className="btn btn-small btn-info"
                          onClick={() =>
                            handleView(cliente.id)
                          }
                          title="Visualizar"
                        >
                          👁️
                        </button>
                        <button
                          className="btn btn-small btn-warning"
                          onClick={() =>
                            handleEdit(cliente.id)
                          }
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() =>
                            handleDelete(cliente.id)
                          }
                          title="Deletar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="btn btn-small"
              >
                Anterior
              </button>
              <span>
                Página {page + 1} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage(Math.min(totalPages - 1, page + 1))
                }
                disabled={page >= totalPages - 1}
                className="btn btn-small"
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
