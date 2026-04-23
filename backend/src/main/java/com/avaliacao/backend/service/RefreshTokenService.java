package com.avaliacao.backend.service;

import com.avaliacao.backend.entity.RefreshToken;
import com.avaliacao.backend.entity.Usuario;
import java.util.Optional;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(Usuario usuario);

    RefreshToken verifyExpiration(RefreshToken token);

    void deleteByToken(String token);

    Optional<RefreshToken> findByToken(String token);
}
