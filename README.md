# Sistema-Fullstack-Java-React

## 1.1 Setup do Backend (Spring Boot)

Backend criado em `backend` com:

- Java 21
- Maven
- Spring Web
- Spring Data JPA
- Spring Security
- H2 Database
- Lombok
- Validation

### Rodar o backend

```bash
cd /home/freitas/Sistema-Fullstack-Java-React/backend
mvn spring-boot:run
```

### Erro comum: `release version 21 not supported`

Esse erro acontece quando o Maven está usando um Java inferior ao 21.

#### 1) Instalar JDK 21

```bash
sudo apt update
sudo apt install openjdk-21-jdk
```

#### 2) Selecionar Java 21

```bash
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

#### 3) Validar versões

```bash
java -version
javac -version
mvn -v
```

No resultado de `mvn -v`, a linha `Java version` deve ser `21`.

#### 4) Executar novamente

```bash
cd /home/freitas/Sistema-Fullstack-Java-React/backend
mvn clean spring-boot:run
```