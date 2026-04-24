package com.avaliacao.backend.config;

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

            if (usuarioRepository.findByEmail(demoEmail).isPresent()) {
                return;
            }

            Usuario usuario = new Usuario();
            usuario.setNome("Administrador Lume");
            usuario.setEmail(demoEmail);
            usuario.setSenha(passwordEncoder.encode("Lume123!"));

            usuarioRepository.save(usuario);
        };
    }
}