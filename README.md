# API REST TRANSPORTE DE CARGAS

API REST desenvolvida utilizando o conceito de clean architecture e TDD. A aplicação é capaz de cadastrar e obter informações de Embarcadores, Transportadores, Ofertas e Lances

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/desktop/windows/install/)
- [Docker-Compose](https://docs.docker.com/desktop/windows/install/)

### 🎲 Comandos Para Iniciar Aplicação

```bash
# Clone este repositório
$ git clone https://github.com/brunobrolesi/api-rest-transporte-de-cargas.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-rest-transporte-de-cargas

# Instale as dependências
$ npm install

# Defina as variáveis de ambiente em um arquivo .env seguindo o explempo fornecido, pode-se apenas renomea-lo para .env para facilitar o processo
$ mv .env.example .env

# Rode os testes (opcional)
$ npm test

# Rode o projeto
$ npm run deploy

# O servidor inciará por padrão porta:3000 - acesse <http://localhost:3000/api-docs> para consumir a documentação
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/docs/specification/about/)
