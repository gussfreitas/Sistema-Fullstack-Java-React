package com.avaliacao.backend.service.impl;

import com.avaliacao.backend.dto.auth.AuthResponseDTO;
import com.avaliacao.backend.dto.auth.LoginDTO;
import com.avaliacao.backend.dto.auth.RegistroDTO;
import com.avaliacao.backend.entity.PerfilUsuario;
import com.avaliacao.backend.entity.RefreshToken;
import com.avaliacao.backend.entity.Usuario;
import com.avaliacao.backend.repository.UsuarioRepository;
import com.avaliacao.backend.security.JwtUtil;
import com.avaliacao.backend.service.AuthService;
import com.avaliacao.backend.service.RefreshTokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public AuthServiceImpl(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            RefreshTokenService refreshTokenService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    @Transactional
    public void registro(RegistroDTO registroDTO) {
        if (usuarioRepository.findByEmail(registroDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(registroDTO.getEmail());
        usuario.setNome(registroDTO.getNome());
        // Senha sempre salva criptografada.
        usuario.setSenha(passwordEncoder.encode(registroDTO.getSenha()));
        usuario.setPerfil(PerfilUsuario.USER);
        usuarioRepository.save(usuario);
    }

    @Override
    public AuthResponseDTO login(LoginDTO loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getSenha()));

        Usuario usuario = usuarioRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado"));

        UserDetails userDetails = buildUserDetails(usuario);

        String accessToken = jwtUtil.generateAccessToken(userDetails);
        String refreshToken = refreshTokenService.createRefreshToken(usuario).getToken();

        return new AuthResponseDTO(accessToken, refreshToken);
    }

    @Override
    public AuthResponseDTO refreshToken(String refreshToken) {
        RefreshToken storedToken = refreshTokenService.findByToken(refreshToken)
                .map(refreshTokenService::verifyExpiration)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token invalido"));

        Usuario usuario = storedToken.getUsuario();
        UserDetails userDetails = buildUserDetails(usuario);

        String accessToken = jwtUtil.generateAccessToken(userDetails);
        return new AuthResponseDTO(accessToken, refreshToken);
    }

    @Override
    public void logout(String refreshToken) {
        refreshTokenService.deleteByToken(refreshToken);
    }

    private UserDetails buildUserDetails(Usuario usuario) {
        PerfilUsuario perfil = usuario.getPerfil() != null ? usuario.getPerfil() : PerfilUsuario.USER;
        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getSenha())
                .authorities("ROLE_" + perfil.name())
                .build();
    }
}
