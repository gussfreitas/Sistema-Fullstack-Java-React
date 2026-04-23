package com.avaliacao.backend.service.impl;

import com.avaliacao.backend.entity.RefreshToken;
import com.avaliacao.backend.entity.Usuario;
import com.avaliacao.backend.repository.RefreshTokenRepository;
import com.avaliacao.backend.service.RefreshTokenService;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.jwt.refresh-expiration}")
    private long refreshExpirationMs;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    @Transactional
    public RefreshToken createRefreshToken(Usuario usuario) {
        RefreshToken token = new RefreshToken();
        token.setUsuario(usuario);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Instant.now().plusMillis(refreshExpirationMs));
        token.setRevoked(false);
        return refreshTokenRepository.save(token);
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (Boolean.TRUE.equals(token.getRevoked()) || token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new IllegalArgumentException("Refresh token expirado ou revogado");
        }
        return token;
    }

    @Override
    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }
}
