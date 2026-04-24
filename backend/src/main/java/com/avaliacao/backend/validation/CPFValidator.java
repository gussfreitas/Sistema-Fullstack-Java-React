package com.avaliacao.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CPFValidator implements ConstraintValidator<CPF, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Campo vazio fica a cargo do @NotBlank; aqui validamos apenas a estrutura do CPF.
        if (value == null || value.isBlank()) {
            return true;
        }

        // Remove pontos e hifens para trabalhar sempre com a sequencia numerica.
        String cpf = value.replaceAll("\\D", "");
        if (cpf.length() != 11 || cpf.chars().distinct().count() == 1) {
            return false;
        }

        String base = cpf.substring(0, 9);
        int primeiroDigito = calcularDigito(base, 10);
        int segundoDigito = calcularDigito(base + primeiroDigito, 11);

        return cpf.equals(base + primeiroDigito + segundoDigito);
    }

    private int calcularDigito(String cpf, int pesoInicial) {
        int soma = 0;
        int peso = pesoInicial;

        // Soma ponderada usada no calculo dos dois digitos verificadores do CPF.
        for (char caractere : cpf.toCharArray()) {
            soma += Character.getNumericValue(caractere) * peso--;
        }

        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}