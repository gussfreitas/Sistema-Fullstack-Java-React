package com.avaliacao.backend.service;

import com.avaliacao.backend.dto.auth.AuthResponseDTO;
import com.avaliacao.backend.dto.auth.LoginDTO;
import com.avaliacao.backend.dto.auth.RegistroDTO;

public interface AuthService {

    void registro(RegistroDTO registroDTO);

    AuthResponseDTO login(LoginDTO loginDTO);

    AuthResponseDTO refreshToken(String refreshToken);

    void logout(String refreshToken);
}
