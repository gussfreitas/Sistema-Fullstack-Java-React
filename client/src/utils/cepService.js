// Serviço para buscar endereço pelo CEP usando a API pública ViaCEP
export async function buscarEnderecoPorCep(cep) {
  try {
    const clean = cep.replace(/\D/g, '');

    if (clean.length !== 8) {
      return { success: false, error: 'CEP deve ter 8 dígitos' };
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${clean}/json/`
    );

    if (!response.ok) {
      return { success: false, error: 'Erro ao buscar CEP' };
    }

    const data = await response.json();

    if (data.erro) {
      return {
        success: false,
        error: 'CEP não encontrado',
      };
    }

    return {
      success: true,
      data: {
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao buscar CEP',
    };
  }
}

export function formatCEP(cep) {
  const clean = cep.replace(/\D/g, '');
  return clean.substring(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
}
