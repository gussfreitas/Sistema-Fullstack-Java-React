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

## Como executar localmente

### Pré-requisitos

- JDK 21
- Maven

### Rodar a aplicação

Na raiz do projeto, execute:

```bash
cd backend
mvn spring-boot:run
```

A aplicação ficará disponível em:

- API: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`

## Como executar com Docker

### Pré-requisitos

- Docker
- Docker Compose

### Subir a aplicação

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Se o seu ambiente usar o comando moderno, também funciona:

```bash
docker compose up --build
```

### Acessos

- API: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`

### Conexão com o H2 Console

Use os dados abaixo:

- JDBC URL: `jdbc:h2:file:/data/avaliacaodb`
- User: `sa`
- Password: vazio

### Parar a aplicação

```bash
docker-compose down
```

Ou, se preferir o formato moderno:

```bash
docker compose down
```

### Remover os dados do H2

Se quiser apagar também o volume de dados:

```bash
docker-compose down -v
```

## Problema comum com Java 21

Se aparecer o erro `release version 21 not supported`, o Maven provavelmente está usando uma versão antiga do Java.

### Como verificar

```bash
java -version
javac -version
mvn -v
```

No resultado de `mvn -v`, a versão do Java deve ser 21.

### Como corrigir

Instale e selecione o JDK 21 no seu sistema e tente executar novamente o projeto.