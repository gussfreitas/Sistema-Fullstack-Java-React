package com.avaliacao.backend.config;

import com.avaliacao.backend.entity.PerfilUsuario;
import com.avaliacao.backend.entity.Usuario;
import com.avaliacao.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createDemoUser(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String demoEmail = "admin@lume.com";

            Usuario usuarioExistente = usuarioRepository.findByEmail(demoEmail).orElse(null);
            if (usuarioExistente != null) {
                if (usuarioExistente.getPerfil() != PerfilUsuario.ADMIN) {
                    usuarioExistente.setPerfil(PerfilUsuario.ADMIN);
                    usuarioRepository.save(usuarioExistente);
                }
                return;
            }

            Usuario usuario = new Usuario();
            usuario.setNome("Administrador Lume");
            usuario.setEmail(demoEmail);
            usuario.setSenha(passwordEncoder.encode("Lume123!"));
            usuario.setPerfil(PerfilUsuario.ADMIN);

            usuarioRepository.save(usuario);
        };
    }
}