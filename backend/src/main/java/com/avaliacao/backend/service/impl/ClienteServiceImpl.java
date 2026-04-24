package com.avaliacao.backend.service.impl;

import com.avaliacao.backend.dto.cliente.ClienteRequestDTO;
import com.avaliacao.backend.dto.cliente.ClienteResponseDTO;
import com.avaliacao.backend.entity.Cliente;
import com.avaliacao.backend.exception.ResourceConflictException;
import com.avaliacao.backend.exception.ResourceNotFoundException;
import com.avaliacao.backend.repository.ClienteRepository;
import com.avaliacao.backend.service.CepService;
import com.avaliacao.backend.service.ClienteService;
import java.util.Objects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;
    private final CepService cepService;

    public ClienteServiceImpl(ClienteRepository clienteRepository, CepService cepService) {
        this.clienteRepository = clienteRepository;
        this.cepService = cepService;
    }

    @Override
    @Transactional
    public ClienteResponseDTO criar(ClienteRequestDTO clienteRequestDTO) {
        // Normaliza o CPF antes de validar unicidade e persistir o cliente.
        String cpf = normalizarCpf(clienteRequestDTO.getCpf());
        validarCpfDisponivel(cpf, null);

        Cliente cliente = new Cliente();
        aplicarDados(cliente, clienteRequestDTO, cpf);

        return toResponseDTO(clienteRepository.save(cliente));
    }

    @Override
    public ClienteResponseDTO buscarPorId(Long id) {
        return toResponseDTO(obterClientePorId(id));
    }

    @Override
    public Page<ClienteResponseDTO> listarTodos(Pageable pageable) {
        return clienteRepository.findAll(pageable).map(this::toResponseDTO);
    }

    @Override
    @Transactional
    public ClienteResponseDTO atualizar(Long id, ClienteRequestDTO clienteRequestDTO) {
        Cliente cliente = obterClientePorId(id);
        // Evita conflito quando o CPF informado pertence a outro cliente.
        String cpf = normalizarCpf(clienteRequestDTO.getCpf());
        validarCpfDisponivel(cpf, id);

        aplicarDados(cliente, clienteRequestDTO, cpf);
        return toResponseDTO(clienteRepository.save(cliente));
    }

    @Override
    @Transactional
    public void deletar(Long id) {
        Cliente cliente = obterClientePorId(id);
        clienteRepository.delete(cliente);
    }

    private Cliente obterClientePorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente nao encontrado"));
    }

    private void validarCpfDisponivel(String cpf, Long clienteId) {
        clienteRepository.findByCpf(cpf)
                .filter(cliente -> !Objects.equals(cliente.getId(), clienteId))
                .ifPresent(cliente -> {
                    throw new ResourceConflictException("CPF ja cadastrado");
                });
    }

    private void aplicarDados(Cliente cliente, ClienteRequestDTO requestDTO, String cpfNormalizado) {
        cliente.setNome(requestDTO.getNome());
        cliente.setCpf(cpfNormalizado);

        // O CEP define a base do endereço; ViaCEP preenche os campos quando houver retorno válido.
        String cepNormalizado = normalizarCep(requestDTO.getCep());
        cliente.setCep(cepNormalizado);

        cepService.buscarEndereco(cepNormalizado).ifPresentOrElse(endereco -> {
            cliente.setLogradouro(preferir(endereco.logradouro(), requestDTO.getLogradouro()));
            cliente.setBairro(preferir(endereco.bairro(), requestDTO.getBairro()));
            cliente.setCidade(preferir(endereco.cidade(), requestDTO.getCidade()));
            cliente.setEstado(preferir(endereco.estado(), requestDTO.getEstado()));
        }, () -> {
            cliente.setLogradouro(requestDTO.getLogradouro());
            cliente.setBairro(requestDTO.getBairro());
            cliente.setCidade(requestDTO.getCidade());
            cliente.setEstado(requestDTO.getEstado());
        });
    }

    private String preferir(String valorApi, String valorRequest) {
        // Prioriza o dado retornado pela API externa e cai para o valor manual se vier vazio.
        if (valorApi != null && !valorApi.isBlank()) {
            return valorApi;
        }
        return valorRequest;
    }

    private String normalizarCpf(String cpf) {
        return cpf == null ? null : cpf.replaceAll("\\D", "");
    }

    private String normalizarCep(String cep) {
        return cep == null ? null : cep.replaceAll("\\D", "");
    }

    private ClienteResponseDTO toResponseDTO(Cliente cliente) {
        ClienteResponseDTO responseDTO = new ClienteResponseDTO();
        responseDTO.setId(cliente.getId());
        responseDTO.setNome(cliente.getNome());
        responseDTO.setCpf(cliente.getCpf());
        responseDTO.setLogradouro(cliente.getLogradouro());
        responseDTO.setBairro(cliente.getBairro());
        responseDTO.setCidade(cliente.getCidade());
        responseDTO.setEstado(cliente.getEstado());
        responseDTO.setCep(cliente.getCep());
        responseDTO.setCreatedAt(cliente.getCreatedAt());
        responseDTO.setUpdatedAt(cliente.getUpdatedAt());
        return responseDTO;
    }
}