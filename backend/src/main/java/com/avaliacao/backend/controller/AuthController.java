package com.avaliacao.backend.controller;

import com.avaliacao.backend.dto.auth.AuthResponseDTO;
import com.avaliacao.backend.dto.auth.LoginDTO;
import com.avaliacao.backend.dto.auth.RefreshTokenRequestDTO;
import com.avaliacao.backend.dto.auth.RegistroDTO;
import com.avaliacao.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegistroDTO registroDTO) {
        authService.registro(registroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@Valid @RequestBody RefreshTokenRequestDTO requestDTO) {
        return ResponseEntity.ok(authService.refreshToken(requestDTO.getRefreshToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshTokenRequestDTO requestDTO) {
        authService.logout(requestDTO.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}
