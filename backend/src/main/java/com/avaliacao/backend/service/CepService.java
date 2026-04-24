package com.avaliacao.backend.service;

import java.util.Optional;

public interface CepService {

    Optional<Endereco> buscarEndereco(String cep);

    record Endereco(String logradouro, String bairro, String cidade, String estado, String cep) {
    }
}