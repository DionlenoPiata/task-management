1 EXECUTANDO O PROJETO:

- Banco de dados

Pré-requisitos:
ter o docker instalado.

Dentro da pasta do projeto, execute o comando:
docker compose up -d

- Backend

Pré-requisitos:

ter o java 8 instalado.

Executando o projeto

Comandos:

cd backend
./mvnw clean package
cd target
java -jar backend-0.0.1-SNAPSHOT.jar

- Frontend
  Pré-requisitos:
  Ter o node instalado
  Ter o npm instalado

cd frontend
npm i
npm start

2 ACESSANDO DOCUMENTAÇÃO
https://documenter.getpostman.com/view/12599446/2s9YJgU1Pm

3 ACESSANDO FRONTEND
http://localhost:3000
