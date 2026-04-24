import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import clienteService from '../services/clienteService';
import '../styles/ClienteDetailPage.css';

export default function ClienteDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarCliente();
  }, [id]);

  const carregarCliente = async () => {
    setIsLoading(true);
    const result = await clienteService.getById(id);

    if (result.success) {
      setCliente(result.data);
      setError('');
    } else {
      setError(
        result.error || 'Erro ao carregar cliente'
      );
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="cliente-detail-page">
        <Navbar />
        <div className="page-container">
          <div className="loading-spinner">
            Carregando...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cliente-detail-page">
        <Navbar />
        <div className="page-container">
          <div className="alert alert-error">{error}</div>
          <button
            onClick={() => navigate('/clientes')}
            className="btn btn-secondary"
          >
            Voltar para Clientes
          </button>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="cliente-detail-page">
        <Navbar />
        <div className="page-container">
          <div className="alert alert-error">
            Cliente não encontrado
          </div>
          <button
            onClick={() => navigate('/clientes')}
            className="btn btn-secondary"
          >
            Voltar para Clientes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cliente-detail-page">
      <Navbar />

      <div className="page-container">
        <button
          onClick={() => navigate('/clientes')}
          className="btn btn-secondary"
          style={{ marginBottom: '20px' }}
        >
          ← Voltar
        </button>

        <div className="detail-card">
          <div className="detail-header">
            <h1>{cliente.nome}</h1>
            <div className="detail-actions">
              <button
                onClick={() =>
                  navigate(`/clientes/editar/${cliente.id}`)
                }
                className="btn btn-warning"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => window.history.back()}
                className="btn btn-secondary"
              >
                Fechar
              </button>
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-section">
              <h3>Informações Pessoais</h3>
              <div className="detail-field">
                <label>ID:</label>
                <p>{cliente.id}</p>
              </div>
              <div className="detail-field">
                <label>CPF:</label>
                <p>{cliente.cpf}</p>
              </div>
              <div className="detail-field">
                <label>Email:</label>
                <p>{cliente.email || '-'}</p>
              </div>
              <div className="detail-field">
                <label>Telefone:</label>
                <p>{cliente.telefone || '-'}</p>
              </div>
            </div>

            {cliente.endereco && (
              <div className="detail-section">
                <h3>Endereço</h3>
                <div className="detail-field">
                  <label>CEP:</label>
                  <p>{cliente.endereco.cep || '-'}</p>
                </div>
                <div className="detail-field">
                  <label>Rua:</label>
                  <p>{cliente.endereco.rua || '-'}</p>
                </div>
                <div className="detail-field">
                  <label>Número:</label>
                  <p>{cliente.endereco.numero || '-'}</p>
                </div>
                <div className="detail-field">
                  <label>Bairro:</label>
                  <p>{cliente.endereco.bairro || '-'}</p>
                </div>
                <div className="detail-field">
                  <label>Cidade:</label>
                  <p>{cliente.endereco.cidade || '-'}</p>
                </div>
                <div className="detail-field">
                  <label>Estado:</label>
                  <p>{cliente.endereco.estado || '-'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
