
# Exercício , Vaga de Desenvolvedor - Bulir Technology

## Plataforma de Reservas API

Esta é uma API RESTful construída com NestJS para uma plataforma onde clientes podem fazer reservas em diferentes serviços. A API permite o gerenciamento de usuários (clientes e provedores de serviço), criação de reservas, cancelamento de reservas e gerenciamento do histórico de reservas.

## Requisitos & Funcionalidades Básicas

### 1. Cadastro de Usuários

- **Dados necessários**: Nome Completo, NIF, E-mail, Senha.
- **Regras**: NIF e E-mail devem ser únicos no sistema.
- **Tipos de usuário**: Cliente, Prestador de Serviço.

### 2. Autenticação e Autorização

- Usuários devem se autenticar para acessar a API.
- Utiliza JWT para autenticação.

### 3. Gerenciamento de Serviços

- Provedores podem cadastrar os serviços que oferecem.
- Cada serviço deve ter um nome, descrição, preço e prestador de serviço associado.

### 4. Reserva de Serviços

- Clientes podem fazer reservas em serviços de provedores.
- Antes da reserva, verificar se o cliente tem saldo suficiente.
- Atualizar o saldo do cliente e do prestador de serviço após a reserva.

### 5. Histórico de Reservas

- Manter um histórico de todas as reservas realizadas na plataforma.

### 6. Validações

- Verificar se o usuário autenticado tem permissão para criar, atualizar ou cancelar uma reserva.
- Garantir que o saldo do cliente seja atualizado de forma atômica.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/plataforma-de-reservas-api.git
   cd plataforma-de-reservas-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```plaintext
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu-usuario
   DB_PASSWORD=sua-senha
   DB_DATABASE=plataforma_de_reservas
   jwtConstants=sua-chave-secreta
   ```

4. Inicie a base de dados com docker
   docker-compose up -d

5. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

## Utilização

A API estará disponível em `http://localhost:3000`. Use ferramentas como insomnia para testar os endpoints.

### Endpoints Principais

- **Autenticação**
  - `POST /auth/login`: Autenticar usuário e obter token JWT.
- **Usuários**

  - `POST /users`: Registrar um novo usuário.
  - `GET /users/deposit`: fazer um deposito de saldo.

- **Serviços**

  - `POST /services`: Criar um novo serviço (somente para provedores).
  - `GET /services`: Listar todos os serviços.

- **Reservas**

  - `POST /reservations/id-do-servico`: Criar uma nova reserva.
  - `PATCH /reservations/cancel`: cancelar uma reserva.
  - `PATCH /reservations/update`: atualizar uma reserva.

  - `GET /reservations/history`: Listar o histórico de reservas.

## Docker

Para executar o projeto usando Docker:

1. Certifique-se de ter o Docker instalado e em execução.
2. Crie e inicie os contêineres:
   ```bash
   docker-compose up -d
   ```
