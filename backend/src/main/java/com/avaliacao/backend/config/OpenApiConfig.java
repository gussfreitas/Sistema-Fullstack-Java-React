package com.avaliacao.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Sistema Fullstack Java React API",
                version = "v1",
                description = "Documentacao da API do backend do projeto",
                contact = @Contact(name = "Backend Team")
        )
)
public class OpenApiConfig {
}