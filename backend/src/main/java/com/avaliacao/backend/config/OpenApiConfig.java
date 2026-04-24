package com.avaliacao.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
// Define os metadados exibidos no Swagger UI.
@OpenAPIDefinition(
        info = @Info(
                title = "Sistema Fullstack Java React API",
                version = "v1",
                description = "Documentacao da API do backend do projeto",
                contact = @Contact(name = "Backend Team")
        )
)
@SecurityScheme(
        name = "Authorization",
        type = SecuritySchemeType.APIKEY,
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}