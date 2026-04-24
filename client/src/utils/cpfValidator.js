// Remove caracteres não numéricos
function removeMask(cpf) {
  return cpf.replace(/\D/g, '');
}

// Formata CPF com máscara XXX.XXX.XXX-XX
export function formatCPF(cpf) {
  const clean = removeMask(cpf);
  return clean
    .substring(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Valida CPF
export function isValidCPF(cpf) {
  const clean = removeMask(cpf);

  // Verifica se tem 11 dígitos
  if (clean.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(clean)) {
    return false;
  }

  // Calcula primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  // Compara com os dígitos verificadores do CPF
  if (
    digit1 !== parseInt(clean.charAt(9)) ||
    digit2 !== parseInt(clean.charAt(10))
  ) {
    return false;
  }

  return true;
}
