# Sistema-Fullstack-Java-React

Sistema Fullstack Java React é uma aplicação web de gestão de clientes com autenticação, cadastro, listagem, edição e exclusão de registros.
O projeto integra um backend em Spring Boot com JWT, JPA e Swagger, e um frontend em React com Vite, rotas protegidas e consumo da API.

## Tecnologias

Backend:
- Java 21: linguagem base do backend.
- Spring Boot: inicialização, configuração e execução da API.
- Spring Web: criação dos endpoints REST (Auth e Clientes).
- Spring Data JPA: acesso e persistência de dados (repositories).
- Spring Security: autenticação/autorização das rotas protegidas.
- H2 Database: banco de dados em arquivo para ambiente local.
- JWT: emissão e validação de token de acesso e refresh token.
- Bean Validation (Jakarta Validation): validações de payload (campos obrigatórios e formato de email).

Frontend:
- React 19: construção da interface e composição de componentes.
- Vite: servidor de desenvolvimento e build do frontend.
- Axios: cliente HTTP para consumo da API do backend.
- React Router DOM: roteamento de páginas e proteção de rotas privadas.
- React Hook Form: gerenciamento de estado e validação de formulários.

## Pré-requisitos

- JDK 21
- Maven
- Node.js 20+ e npm
- Docker e Docker Compose, se quiser subir tudo em container

## Como executar o backend

Na raiz do projeto:

```bash
cd backend
mvn spring-boot:run
```

O backend sobe em `http://localhost:8080`.

## Como executar o frontend

Em outro terminal:

```bash
cd client
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## Como executar com Docker

Na raiz do projeto:

```bash
docker-compose up --build
```

Ou, se preferir o comando moderno:

```bash
docker compose up --build
```

Para parar:

```bash
docker-compose down
```

Para remover também o volume do H2:

```bash
docker-compose down -v
```

## Como acessar o Swagger

Com o backend rodando, acesse:

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Como acessar o frontend

- Localmente: `http://localhost:5173`
- Com Docker: `http://localhost:5173`

## Credenciais de login de exemplo

O projeto cria automaticamente um usuário de demonstração na inicialização do backend.

- E-mail: `admin@lume.com`
- Senha: `Lume123!`

## Configuração principal

As propriedades principais estão em `backend/src/main/resources/application.properties`:

- H2
	- `spring.datasource.url=jdbc:h2:file:./data/avaliacaodb`
	- `spring.datasource.username=sa`
	- `spring.h2.console.enabled=true`
	- `spring.h2.console.path=/h2-console`
- JWT
	- `app.jwt.expiration=86400000`
	- `app.jwt.refresh-expiration=604800000`

Observação: em ambiente real, segredos devem sair do repositório e vir de variáveis de ambiente ou de um gerenciador de secrets.

No H2 Console, use:

- JDBC URL: `jdbc:h2:file:./data/avaliacaodb`
- User: `sa`
- Password: vazio

## Diagramas

### Frontend

```text
root/
└── frontend/                                # React + Vite
	└── src/
		├── api/
		│   └── axiosConfig.js               # Instância Axios + interceptors
		├── components/
		│   ├── Navbar.jsx                   # Botão de logout
		│   ├── PrivateRoute.jsx             # Proteção de rotas
		│   └── ClienteForm.jsx              # Formulário reutilizável
		├── pages/
		│   ├── LoginPage.jsx                # Login e registro
		│   ├── ClientesPage.jsx             # Tabela de clientes
		│   ├── ClienteFormPage.jsx          # Criar e editar
		│   └── ClienteDetailPage.jsx        # Detalhes do cliente
		├── services/
		│   ├── authService.js               # login, logout, register, refresh
		│   └── clienteService.js            # CRUD de clientes
		└── utils/
			├── cpfValidator.js              # Validação de CPF
			└── cepService.js                # Auto-completar endereço
```

### Backend

```text
root/
└── backend/                                 # Spring Boot
	└── src/main/java/com/avaliacao/backend/
		├── config/                          # SecurityConfig, OpenApiConfig, DataInitializer
		├── controller/                      # AuthController, ClienteController
		├── dto/                             # LoginDTO, RegistroDTO, ClienteRequestDTO, ClienteResponseDTO
		├── entity/                          # Usuario, Cliente, RefreshToken
		├── repository/                      # UsuarioRepository, ClienteRepository, RefreshTokenRepository
		├── security/                        # JwtUtil, JwtAuthenticationFilter
		└── service/                         # AuthService, ClienteService, CepService
```

### Segurança

```text
Usuário
└── Frontend
	├── LoginPage
	├── axiosConfig interceptor
	├── localStorage (accessToken + refreshToken)
	└── PrivateRoute

Frontend
└── Backend
	├── POST /auth/login
	├── JWT gerado no backend
	├── token enviado como Bearer
	├── 401 dispara refresh automático
	└── POST /auth/refresh

Backend
└── Segurança
	├── JwtAuthenticationFilter
	├── JwtUtil
	├── SecurityConfig
	└── Spring Security com ROLE_USER
```

## Execução rápida

```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd client
npm install
npm run dev
```

## Comandos úteis

```bash
# Testes do backend
cd backend
mvn test

# Build do backend
cd backend
mvn clean package

# Lint do frontend
cd client
npm run lint

# Build de producao do frontend
cd client
npm run build

# Subir tudo com Docker em segundo plano
docker-compose up -d --build
```

## Endpoints principais

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /clientes`
- `GET /clientes/{id}`
- `POST /clientes`
- `PUT /clientes/{id}`
- `DELETE /clientes/{id}`