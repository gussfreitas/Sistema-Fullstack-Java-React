# Sistema-Fullstack-Java-React

Projeto backend em Spring Boot com suporte a execução local e via Docker.

## Tecnologias usadas no backend

- Java 21
- Maven
- Spring Web
- Spring Data JPA
- Spring Security
- H2 Database
- Lombok
- Validation

## Pré-requisitos

- JDK 21
- Maven
- Docker e Docker Compose (para execução em container)

## Executar localmente

Na raiz do projeto, execute:

```bash
cd backend
mvn spring-boot:run
```

## Executar com Docker

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Se o seu ambiente usar o comando moderno, também funciona:

```bash
docker compose up --build
```

Para parar:

```bash
docker-compose down
```

Para remover também o volume de dados do H2:

```bash
docker-compose down -v
```

## Acessos

- API: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Configuração essencial

As propriedades principais estão em `backend/src/main/resources/application.properties`:

- H2
	- `spring.datasource.url=jdbc:h2:file:./data/avaliacaodb`
	- `spring.datasource.username=sa`
	- `spring.h2.console.enabled=true`
	- `spring.h2.console.path=/h2-console`
- JWT
	- `app.jwt.secret` definido no arquivo de configuração
	- `app.jwt.expiration=86400000`

Observacao: em ambiente real, segredos devem ficar fora do repositório e vir de variáveis de ambiente ou de um gerenciador de secrets.

No H2 Console (quando executando em Docker), use:

- JDBC URL: `jdbc:h2:file:/data/avaliacaodb`
- User: `sa`
- Password: vazio