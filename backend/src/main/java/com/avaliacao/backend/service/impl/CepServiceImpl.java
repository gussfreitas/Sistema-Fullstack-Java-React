package com.avaliacao.backend.service.impl;

import com.avaliacao.backend.service.CepService;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class CepServiceImpl implements CepService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public Optional<Endereco> buscarEndereco(String cep) {
        // ViaCEP aceita apenas CEP com 8 digitos; qualquer formato invalido retorna vazio.
        String cepNormalizado = cep == null ? "" : cep.replaceAll("\\D", "");
        if (cepNormalizado.length() != 8) {
            return Optional.empty();
        }

        try {
            ViaCepResponseDTO response = restTemplate.getForObject(
                    "https://viacep.com.br/ws/%s/json/".formatted(cepNormalizado),
                    ViaCepResponseDTO.class);

            if (response == null || Boolean.TRUE.equals(response.getErro())) {
                return Optional.empty();
            }

            // Converte a resposta da API em um objeto interno simples para consumo do service.
            return Optional.of(new Endereco(
                    response.getLogradouro(),
                    response.getBairro(),
                    response.getLocalidade(),
                    response.getUf(),
                    cepNormalizado));
        } catch (RestClientException ex) {
            return Optional.empty();
        }
    }

    private static class ViaCepResponseDTO {

        private String logradouro;
        private String bairro;
        private String localidade;
        private String uf;
        private Boolean erro;

        public String getLogradouro() {
            return logradouro;
        }

        public void setLogradouro(String logradouro) {
            this.logradouro = logradouro;
        }

        public String getBairro() {
            return bairro;
        }

        public void setBairro(String bairro) {
            this.bairro = bairro;
        }

        public String getLocalidade() {
            return localidade;
        }

        public void setLocalidade(String localidade) {
            this.localidade = localidade;
        }

        public String getUf() {
            return uf;
        }

        public void setUf(String uf) {
            this.uf = uf;
        }

        public Boolean getErro() {
            return erro;
        }

        public void setErro(Boolean erro) {
            this.erro = erro;
        }
    }
}