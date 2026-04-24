import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isValidCPF, formatCPF } from '../utils/cpfValidator';
import {
  buscarEnderecoPorCep,
  formatCEP,
} from '../utils/cepService';
import '../styles/ClienteForm.css';

export default function ClienteForm({ initialData, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  });

  const [buscandoCep, setBuscandoCep] = useState(false);
  const cep = watch('cep');
  const cpf = watch('cpf');

  // Auto-completar endereço ao digitar CEP
  useEffect(() => {
    if (cep && cep.replace(/\D/g, '').length === 8) {
      buscarCep();
    }
  }, [cep]);

  const buscarCep = async () => {
    setBuscandoCep(true);
    const result = await buscarEnderecoPorCep(cep);

    if (result.success) {
      setValue('rua', result.data.rua);
      setValue('bairro', result.data.bairro);
      setValue('cidade', result.data.cidade);
      setValue('estado', result.data.estado);
    } else {
      console.error(result.error);
    }

    setBuscandoCep(false);
  };

  const handleCpfChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setValue('cpf', formatted);
  };

  const handleCepChange = (e) => {
    const formatted = formatCEP(e.target.value);
    setValue('cep', formatted);
  };

  const validateCpf = (value) => {
    if (!value) return 'CPF é obrigatório';
    if (!isValidCPF(value)) return 'CPF inválido';
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cliente-form">
      <h2>{initialData ? 'Editar Cliente' : 'Novo Cliente'}</h2>

      <div className="form-group">
        <label htmlFor="nome">Nome *</label>
        <input
          id="nome"
          type="text"
          {...register('nome', {
            required: 'Nome é obrigatório',
            minLength: {
              value: 3,
              message: 'Nome deve ter no mínimo 3 caracteres',
            },
          })}
          className={errors.nome ? 'input-error' : ''}
        />
        {errors.nome && (
          <span className="error">{errors.nome.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="cpf">CPF *</label>
        <input
          id="cpf"
          type="text"
          {...register('cpf', {
            validate: validateCpf,
          })}
          onChange={handleCpfChange}
          placeholder="123.456.789-10"
          className={errors.cpf ? 'input-error' : ''}
        />
        {errors.cpf && (
          <span className="error">{errors.cpf.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          type="tel"
          {...register('telefone')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cep">CEP</label>
        <input
          id="cep"
          type="text"
          {...register('cep')}
          onChange={handleCepChange}
          placeholder="12345-678"
        />
        {buscandoCep && <span className="loading">Buscando...</span>}
      </div>

      <div className="form-group">
        <label htmlFor="rua">Rua</label>
        <input
          id="rua"
          type="text"
          {...register('rua')}
          readOnly={buscandoCep}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="numero">Número</label>
          <input id="numero" type="text" {...register('numero')} />
        </div>
        <div className="form-group">
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            type="text"
            {...register('bairro')}
            readOnly={buscandoCep}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            type="text"
            {...register('cidade')}
            readOnly={buscandoCep}
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <input
            id="estado"
            type="text"
            {...register('estado')}
            readOnly={buscandoCep}
            maxLength="2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading
          ? 'Salvando...'
          : initialData
            ? 'Atualizar'
            : 'Criar Cliente'}
      </button>
    </form>
  );
}
