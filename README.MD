# TechFinance - TechLab 2025

## Indice

-[Primeiros Passos](#-primeiros-passos)
-[Tecnologias Utilizadas](#-tecnologias-utilizadas)

## Primeiros Passos

Primeiramente, clone o rep usando o comando:

```sh
git clone https://github.com/BrunoBianchi/Tech4Humans-Webapp-Financa.git
```

## Tecnologias Utilizadas

### Geral
- [Pnpm](https://pnpm.io/pt/) para o gerenciamento de pacotes de maneira rapida e eficiente.
- [Dotenv](https://www.npmjs.com/package/dotenv) biblioteca para a manipulacao de informacoes secretas
- [Docker](https://www.docker.com) para gerenciamento mais facil das aplicacoes
- [Husky](https://typicode.github.io/husky/) para pre commits
- [Eslint](https://eslint.org) para analise de tipagem e problemas 
- [Prettier](https://prettier.io) para formatagem do codigo
- [Jest](https://jestjs.io/pt-BR/) para testes unitarios

### Backend
- [Express](https://expressjs.com/pt-br/) para a criacao do servidor backend
- [PostgreSQL](https://www.postgresql.org) Banco de dados SQL
- [JsonWebToken]("https://www.npmjs.com/package/jsonwebtoken") para seguranca com assinaturas digitais
- [TypeORM](https://typeorm.io) uma biblioteca para abstracao de sql 
- [Cors](https://typeorm.io) biblioteca para comunicao segura entre frontend e backend
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) biblioteca para limitar a quantidade de requisicoes 
```mermaid
erDiagram

    User ||--o{ Account : "accounts"
    Account }o--|| User : "user"

    User ||--o{ Category : "user_categories"
    Category }o--|| User : "user"

    Account ||--o{ Card : "cards"
    Card }o--|| Account : "account"

    Account ||--o{ Contact : "contacts"
    Contact }o--|| Account : "account"

    Account ||--o{ Investiment : "investments"
    Investiment }o--|| Account : "account"

    Transaction }o--|| Account : "sourceAccount"
    Transaction }o--|| Account : "destinationAccount"
    Transaction }o--|| Category : "category"

    %% Card não tem mais relação com Payment aqui

    Budgets ||--o{ Category : "budget_categories"
    Category }o--|| Budgets : "budget"

    User {
        string id PK
        string name
        string email
        string password
        datetime createdAt
    }
    Account {
        string id PK
        string bank
        string type
        number balance
        number orcamento
        datetime createdAt
    }
    Card {
        string id PK
        string cardNumber
        number limit
        string cardType
        datetime createdAt
    }
    Transaction {
        string id PK
        datetime date
        number amount
        string description
        string type
        string status
        datetime createdAt
    }
    Contact {
        string id PK
        string name
        string destinationAccountId
        datetime createdAt
    }
    Investiment {
        string id PK
        string investmentType
        string approximatedMonthlyGains
        number amount
        datetime createdAt
    }
    Budgets {
        string id PK
        string name
        number value
        number amount
        datetime createdAt
    }
    Category {
        string id PK
        string name
        datetime createdAt
    }
    %% Bloco da entidade Payment removido
```
