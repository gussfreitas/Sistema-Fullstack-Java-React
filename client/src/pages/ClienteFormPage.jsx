import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ClienteForm from '../components/ClienteForm';
import clienteService from '../services/clienteService';
import '../styles/ClienteFormPage.css';

export default function ClienteFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      carregarCliente();
    }
  }, [id]);

  const carregarCliente = async () => {
    setIsLoading(true);
    const result = await clienteService.getById(id);

    if (result.success) {
      setInitialData(result.data);
      setError('');
    } else {
      setError(
        result.error || 'Erro ao carregar cliente'
      );
    }

    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    let result;

    if (id) {
      result = await clienteService.update(id, data);
    } else {
      result = await clienteService.create(data);
    }

    if (result.success) {
      setSuccess(
        id
          ? 'Cliente atualizado com sucesso!'
          : 'Cliente criado com sucesso!'
      );
      setTimeout(() => {
        navigate('/clientes');
      }, 1500);
    } else {
      setError(result.error || 'Erro ao salvar cliente');
    }

    setIsLoading(false);
  };

  if (isLoading && id) {
    return (
      <div className="cliente-form-page">
        <Navbar />
        <div className="page-container">
          <div className="loading-spinner">
            Carregando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cliente-form-page">
      <Navbar />

      <div className="page-container">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          style={{ marginBottom: '20px' }}
        >
          ← Voltar
        </button>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}
        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        <ClienteForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
