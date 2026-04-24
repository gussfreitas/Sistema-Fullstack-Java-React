package com.avaliacao.backend.service;

import com.avaliacao.backend.dto.cliente.ClienteRequestDTO;
import com.avaliacao.backend.dto.cliente.ClienteResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClienteService {

    ClienteResponseDTO criar(ClienteRequestDTO clienteRequestDTO);

    ClienteResponseDTO buscarPorId(Long id);

    Page<ClienteResponseDTO> listarTodos(Pageable pageable);

    ClienteResponseDTO atualizar(Long id, ClienteRequestDTO clienteRequestDTO);

    void deletar(Long id);
}