# README

## 1. EXECUTANDO O PROJETO

### Banco de dados

**Pré-requisitos:**

- Ter o Docker instalado.

Dentro da pasta do projeto, execute o seguinte comando para iniciar o banco de dados:

```shell
docker compose up -d
```

### Backend

**Pré-requisitos:**

- Ter o Java 8 instalado.

Para executar o projeto, siga os seguintes comandos:

```shell
cd backend
./mvnw clean package
cd target
java -jar backend-0.0.1-SNAPSHOT.jar
```

### Frontend

**Pré-requisitos:**

- Ter o Node instalado.
- Ter o NPM instalado.

Para iniciar o frontend, siga os seguintes comandos:

```shell
cd frontend
npm i
npm start
```

## 2. ACESSANDO DOCUMENTAÇÃO

A documentação do projeto está disponível no seguinte link:
[Documentação no Postman](https://documenter.getpostman.com/view/12599446/2s9YJgU1Pm)

## 3. ACESSANDO O FRONTEND

Para acessar o frontend, abra seu navegador e acesse o seguinte endereço:
[http://localhost:3000](http://localhost:3000)
