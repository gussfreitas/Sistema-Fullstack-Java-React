package com.avaliacao.backend.controller;

import com.avaliacao.backend.dto.auth.AuthResponseDTO;
import com.avaliacao.backend.dto.auth.LoginDTO;
import com.avaliacao.backend.dto.auth.RefreshTokenRequestDTO;
import com.avaliacao.backend.dto.auth.RegistroDTO;
import com.avaliacao.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticacao")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Registrar usuario")
    @PostMapping({"/registro", "/register"})
    public ResponseEntity<String> register(@Valid @RequestBody RegistroDTO registroDTO) {
        // Mantem compatibilidade com o endpoint antigo enquanto expõe o caminho pedido.
        authService.registro(registroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado com sucesso");
    }

    @Operation(summary = "Autenticar usuario")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }

    @Operation(summary = "Renovar token de acesso")
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@Valid @RequestBody RefreshTokenRequestDTO requestDTO) {
        return ResponseEntity.ok(authService.refreshToken(requestDTO.getRefreshToken()));
    }

    @Operation(summary = "Encerrar sessao")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshTokenRequestDTO requestDTO) {
        authService.logout(requestDTO.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}
