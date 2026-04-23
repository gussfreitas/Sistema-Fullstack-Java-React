# Sistema-Fullstack-Java-React

Projeto fullstack com backend em Spring Boot e frontend em React (Vite).

## Tecnologias usadas no backend

- Java 21
- Maven
- Spring Web
- Spring Data JPA
- Spring Security
- H2 Database
- Lombok
- Validation

## Tecnologias usadas no frontend

- React
- Vite
- Axios
- React Router DOM
- React Hook Form

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

Em outro terminal, execute o frontend:

```bash
cd client
npm install
npm run dev
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

Observacao: o Docker Compose sobe backend e frontend juntos.

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
- Frontend (local): `http://localhost:5173`
- Frontend (Docker): `http://localhost:5173`

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