import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../services/authService';
import '../styles/Auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      senha: '',
      confirmarSenha: '',
      nome: '',
    },
  });

  const senha = watch('senha');

  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    const result = await authService.login(data.email, data.senha);

    if (result.success) {
      navigate('/clientes');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const onRegisterSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    const result = await authService.register(
      data.nome,
      data.email,
      data.senha
    );

    if (result.success) {
      setError('');
      reset();
      setIsRegistering(false);
      setError('Usuário registrado com sucesso! Faça login.');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const onSubmit = isRegistering
    ? onRegisterSubmit
    : onLoginSubmit;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>
          {isRegistering ? 'Criar Conta' : 'Login'}
        </h1>

        {error && (
          <div
            className={`alert ${isRegistering && result?.success ? 'alert-success' : 'alert-error'}`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
              <input
                id="nome"
                type="text"
                {...register('nome', {
                  required: isRegistering
                    ? 'Nome é obrigatório'
                    : false,
                  minLength: isRegistering
                    ? {
                        value: 3,
                        message:
                          'Nome deve ter no mínimo 3 caracteres',
                      }
                    : undefined,
                })}
                className={errors.nome ? 'input-error' : ''}
              />
              {errors.nome && (
                <span className="error">
                  {errors.nome.message}
                </span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <input
              id="senha"
              type="password"
              {...register('senha', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message:
                    'Senha deve ter no mínimo 6 caracteres',
                },
              })}
              className={errors.senha ? 'input-error' : ''}
            />
            {errors.senha && (
              <span className="error">
                {errors.senha.message}
              </span>
            )}
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmarSenha">
                Confirmar Senha *
              </label>
              <input
                id="confirmarSenha"
                type="password"
                {...register('confirmarSenha', {
                  required: isRegistering
                    ? 'Confirmar senha é obrigatório'
                    : false,
                  validate: (value) =>
                    !isRegistering ||
                    value === senha ||
                    'As senhas não correspondem',
                })}
                className={
                  errors.confirmarSenha ? 'input-error' : ''
                }
              />
              {errors.confirmarSenha && (
                <span className="error">
                  {errors.confirmarSenha.message}
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processando...'
              : isRegistering
                ? 'Registrar'
                : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          {!isRegistering ? (
            <>
              <p>Ainda não tem conta?</p>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                  reset();
                }}
              >
                Registre-se aqui
              </button>
            </>
          ) : (
            <>
              <p>Já tem conta?</p>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                  reset();
                }}
              >
                Faça login aqui
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
