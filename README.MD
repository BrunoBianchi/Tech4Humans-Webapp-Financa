# TechFinance - TechLab 2025

Bem-vindo ao repositório do **TechFinance**, uma aplicação fullstack desenvolvida para o desafio TechLab 2025 da Tech4Humans. Este documento oferece uma visão detalhada do projeto, incluindo decisões de arquitetura, lógica de desenvolvimento, estrutura do projeto, instruções de execução e cobertura de testes.

---

## Índice

- [Visão Geral](#visão-geral)
- [Decisões de Arquitetura](#decisões-de-arquitetura)
- [Lógica de Desenvolvimento](#lógica-de-desenvolvimento)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instruções de Execução](#instruções-de-execução)
- [Cobertura de Testes](#cobertura-de-testes)
- [Modelo da Aplicação](#modelo-da-aplicação)
- [Modelo de Dados](#modelo-de-dados)

---

## Visão Geral

O **TechFinance** é uma solução de gerenciamento financeiro pessoal, composta por um backend robusto desenvolvido em Node.js/TypeScript e um frontend moderno construído com React. O projeto foi arquitetado visando escalabilidade, segurança e facilidade de manutenção.

---

## Estrutura do Projeto

O projeto é um monorepo organizado com as seguintes pastas principais na raiz: `backend` para a API Node.js/TypeScript e `frontend` para a interface de usuário em React. Cada uma possui uma estrutura modular interna detalhada abaixo:

```
Desafio-Webapp-Tech4humans/
├── backend/                      # Lógica do servidor (API) em Node.js/TypeScript
│   ├── src/                      # Código fonte do backend
│   │   ├── database/             # Configuração do banco, entidades, migrações, baseEntity
│   │   ├── features/             # Módulos de funcionalidades (controllers, services, DTOs)
│   │   ├── middlewares/          # Middlewares Express (autenticação, tratamento de erros)
│   │   ├── utils/                # Utilitários, serviços compartilhados, classes de erro
│   │   └── main.ts               # Ponto de entrada da aplicação backend
│   ├── coverage/                 # Relatórios de cobertura de testes do backend
│   ├── jest.config.ts            # Configuração do Jest para o backend
│   ├── tsconfig.json             # Configuração do TypeScript para o backend
│   ├── package.json              # Dependências e scripts do backend
│   └── .env                      # Variáveis de ambiente específicas do backend (ex: .env.example)
├── frontend/                     # Interface de usuário em React/Vite
│   ├── app/                      # Código fonte do frontend (estrutura similar a Next.js/Remix)
│   │   ├── components/           # Componentes React reutilizáveis
│   │   ├── contexts/             # Context API para gerenciamento de estado global
│   │   ├── hooks/                # Custom hooks React
│   │   ├── screens/              # Telas/páginas da aplicação (componentes de rota)
│   │   ├── services/             # Lógica de chamada à API e outros serviços
│   │   ├── types/                # Definições de tipos TypeScript para o frontend
│   │   ├── root.tsx              # Componente raiz da aplicação React
│   │   └── app.css               # Estilos globais ou CSS base
│   ├── public/                   # Assets estáticos (imagens, ícones, fontes)
│   ├── jest.config.ts            # Configuração do Jest para o frontend
│   ├── tsconfig.json             # Configuração do TypeScript para o frontend
│   ├── vite.config.ts            # Configuração do Vite
│   ├── package.json              # Dependências e scripts do frontend
│   └── pnpm-lock.yaml            # Lockfile do pnpm para o frontend (se não for workspace pnpm)
├── docs/                         # Documentação adicional (ex: Swagger, coleções Postman)
├── package.json                  # Configurações do monorepo (workspaces pnpm) e scripts globais
└── pnpm-lock.yaml                # Lockfile do pnpm para a raiz do monorepo
```

---

## Tecnologias Utilizadas

O projeto utiliza um conjunto de tecnologias modernas e consolidadas para garantir eficiência, robustez e uma boa experiência de desenvolvimento.

### Geral
Tecnologias aplicadas em todo o projeto ou para fins de desenvolvimento e infraestrutura:
- [Pnpm](https://pnpm.io/pt/) – Gerenciamento eficiente de pacotes
- [Node.js](https://nodejs.org/pt) – Ambiente de execução JavaScript
- [TypeScript](https://www.typescriptlang.org) – Tipagem estática para maior segurança
- [Dotenv](https://www.npmjs.com/package/dotenv) – Gerenciamento de variáveis de ambiente
- [Docker](https://www.docker.com) – Padronização de ambientes
- [Husky](https://typicode.github.io/husky/) – Hooks de pré-commit
- [ESLint](https://eslint.org) & [Prettier](https://prettier.io) – Qualidade e formatação do código
- [Jest](https://jestjs.io/pt-BR/) – Testes unitários

### Backend
Principais tecnologias e bibliotecas utilizadas no desenvolvimento da API:
- [Express](https://expressjs.com/pt-br/) – Framework web
- [PostgreSQL](https://www.postgresql.org) – Banco de dados relacional
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) – Autenticação JWT
- [TypeORM](https://typeorm.io) – ORM para TypeScript
- [Cors](https://www.npmjs.com/package/cors) – Comunicação segura entre frontend e backend
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) – Limitação de requisições
- [Zod](https://zod.dev) & [Class-Validator](https://www.npmjs.com/package/class-validator) – Validação de dados
- [Bcrypt](https://www.npmjs.com/package/bcrypt) – Hash de senhas
- [Uid](https://www.npmjs.com/package/uid) – Geração de IDs únicos
- [Reflect-Metadata](https://www.npmjs.com/package/reflect-metadata) – Suporte a decorators
- [Nodemon](https://nodemon.io) – Hot reload do servidor

### Frontend
Principais tecnologias e bibliotecas utilizadas na construção da interface do usuário:
- [Vite](https://vite.dev) – Build rápido
- [React](https://react.dev) – Biblioteca de UI
- [React Router](https://reactrouter.com) – Roteamento SPA
- [TailwindCSS](https://tailwindcss.com) & [MUI](https://mui.com) – Estilização e componentes
- [FlowBite](https://flowbite.com) – Componentes adicionais

### Outros
Ferramentas auxiliares utilizadas para desenvolvimento, testes e gerenciamento:
- [Bruno](https://www.usebruno.com) – Testes de API
- [PgAdmin](https://www.pgadmin.org) – Gerenciamento do banco de dados
- [Docker Desktop](https://www.docker.com) – Gerenciamento de containers
- [VSCode](https://code.visualstudio.com) – Editor de código
- [Swagger](https://swagger-autogen.github.io/docs/) – Documentação da API

---

## Instruções de Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (opcional, mas altamente recomendado para facilitar a configuração)
- [PostgreSQL](https://www.postgresql.org/) (necessário apenas se não utilizar Docker)

### 1. Clone o Repositório

```sh
git clone https://github.com/BrunoBianchi/Tech4Humans-Webapp-Financa.git
cd Tech4Humans-Webapp-Financa
```

### 2. Configuração das Variáveis de Ambiente

#### 2.1 Variáveis Globais (Arquivo `.env` na Raiz)
Crie um arquivo `.env` na pasta raiz do projeto (`Tech4Humans-Webapp-Financa`). Este arquivo é utilizado principalmente pelo `docker-compose.yml`.
```dotenv
# Configurações Gerais da Aplicação
PORT=5000
NODE_ENV=development
FRONTEND_PORT=5173

# Configurações do PostgreSQL (usadas pelo Docker Compose e backend)
POSTGRES_HOST=postgres          # Nome do serviço Docker. Use 'localhost' se rodar PostgreSQL localmente.
POSTGRES_PORT=5433              # Porta exposta pelo container PostgreSQL ou porta local.
POSTGRES_USER=tech4humans
POSTGRES_PASSWORD=tech4humans
POSTGRES_DB=webapp
POSTGRES_LOGS=false             # Defina como 'true' para habilitar logs detalhados do TypeORM.

# Configurações do Redis (usadas pelo Docker Compose e backend)
REDIS_HOST=redis                # Nome do serviço Docker. Use 'localhost' se rodar Redis localmente.
REDIS_PORT=6379                 # Porta exposta pelo container Redis ou porta local.

# Chave Secreta para JWT
PRIVATE_KEY=SuaChaveSecretaSuperSeguraAqui # Substitua por uma chave secreta forte e única.
```

#### 2.2 Variáveis do Backend (Arquivo `backend/.env`)
O backend possui seu próprio arquivo `.env` para configurações específicas. Se o arquivo `backend/.env.example` existir, copie-o.
```sh
cd backend
cp .env.example .env  # Se o arquivo .env.example existir
cd ..
```
Revise o arquivo `backend/.env` e ajuste as variáveis conforme necessário, especialmente `POSTGRES_HOST`, `POSTGRES_PORT`, `REDIS_HOST`, `REDIS_PORT` se não estiver usando Docker (ex: `POSTGRES_HOST=localhost`). Muitas variáveis podem ser lidas do `.env` da raiz se a aplicação estiver configurada para tal, mas o `backend/.env` tem precedência para o serviço de backend.

### 3. Execução

Você pode rodar o projeto usando Docker (recomendado para simplicidade) ou manualmente configurando cada serviço.

#### 3.1 Com Docker (Recomendado)
Esta abordagem gerencia o backend, frontend, banco de dados PostgreSQL e Redis automaticamente.
Na pasta raiz do projeto (`Tech4Humans-Webapp-Financa`):
```sh
docker compose build --no-cache
docker compose up
```
- O frontend estará acessível em `http://localhost:<FRONTEND_PORT>` (ex: `http://localhost:5173`).
- O backend estará acessível em `http://localhost:<PORT>` (ex: `http://localhost:5000`).

#### 3.2 Manualmente (Sem Docker)
Certifique-se de que o PostgreSQL e o Redis (se utilizado ativamente pelo backend) estejam instalados, configurados e rodando em sua máquina local. As portas e credenciais devem corresponder às definidas nos arquivos `.env`.

##### 3.2.1 Backend
```sh
cd backend
pnpm install

# Certifique-se que o banco de dados 'webapp' (ou o nome definido em POSTGRES_DB) existe
# no seu servidor PostgreSQL local e que as credenciais em backend/.env estão corretas.
pnpm exec typeorm-ts-node-commonjs migration:run -d src/database/configuration/data-source.ts

pnpm run start
```
O backend estará rodando na porta especificada (ex: `5000`).

##### 3.2.2 Frontend
```sh
cd frontend # Navegue para a pasta frontend (ex: 'cd ../frontend' se estiver na pasta 'backend')
pnpm install
pnpm run dev # Ou 'vite', dependendo do script configurado em frontend/package.json
```
O frontend estará rodando na porta especificada (ex: `5173`).
---

## Arquitetura da Aplicação

A aplicação foi desenvolvida com uma arquitetura de microsserviços locais, consistindo em:
- Um servidor **frontend** (React/Vite) responsável pela interface do usuário e consumo da API.
- Um servidor **backend** (Node.js/Express/TypeScript) responsável pela API RESTful, lógica de negócios, e comunicação com o banco de dados e Redis.
- Um servidor de banco de dados **PostgreSQL**.
- Um servidor **Redis** para caching e/ou gerenciamento de filas.

![Modelo Geral da Aplicação](https://i.imgur.com/Kq8GzZn.png "Diagrama da arquitetura geral da aplicação TechFinance")

### Arquitetura do Backend
O backend foi modelado utilizando uma estrutura modular, visando facilitar a organização e manutenção do código. As funcionalidades são agrupadas em módulos, cada um contendo seus respectivos controllers, services, DTOs (Data Transfer Objects) e entidades.

#### Arquitetura da API
A API foi desenvolvida seguindo um padrão de design inspirado no [NestJS](https://docs.nestjs.com/controllers), utilizando decorators e `reflect-metadata` para definir rotas, validações e injeção de dependência de forma declarativa. Este padrão promove uma organização clara de responsabilidades e facilita a escalabilidade da API.

![Modelo da API Backend](https://i.imgur.com/4ZLtVVq.png "Diagrama do padrão da API backend, inspirado no NestJS")

---

#### Arquitetura das entidades do banco de dados

O diagrama Entidade-Relacionamento (ER) abaixo ilustra as principais entidades do sistema e seus relacionamentos:

![Diagrama ER](https://i.imgur.com/D27S9iV.png)

---

## Decisoes da arquitetura

### Backend - Arquitetura Modular e MVC
A combinação das arquiteturas ![modular](https://medium.com/geekculture/what-is-modular-architecture-benefits-implementation-methods-8c272ebc05eb) e ![MVC](https://coodesh.com/blog/dicionario/o-que-e-arquitetura-mvc/) no backend proporciona uma base sólida e flexível para o desenvolvimento do sistema, inspirando em um framework moderno ![nestjs](https://nestjs.com)

#### 1. Arquitetura Modular
A adoção de uma arquitetura modular no backend foi uma decisão estratégica, motivada pela familiaridade com estruturas semelhantes (como a do Angular) e pelos seguintes benefícios:

- **Separação de Responsabilidades (SoC):** Cada módulo é dedicado a uma funcionalidade específica do negócio (ex: autenticação, gerenciamento de transações). Isso isola as responsabilidades, tornando o código mais compreensível e focado.
- **Manutenção Simplificada:** Alterações ou correções em um módulo têm impacto mínimo sobre os demais, reduzindo o risco de regressões e facilitando a manutenção evolutiva do sistema.
- **Reusabilidade de Código:** Componentes, serviços e lógicas comuns podem ser encapsulados em módulos e reutilizados em diferentes partes da aplicação, promovendo a eficiência e consistência do desenvolvimento (princípio DRY - Don't Repeat Yourself).
- **Clareza de Domínio:** A estrutura modular reflete diretamente os domínios e subdomínios do negócio, facilitando o entendimento da aplicação tanto para novos desenvolvedores quanto para a equipe atual.
- **Escalabilidade Granular:** Permite que módulos específicos sejam otimizados ou escalados independentemente, conforme a demanda, sem a necessidade de escalar toda a aplicação.
- **Testabilidade Aprimorada:** Módulos com responsabilidades bem definidas são mais fáceis de testar isoladamente, permitindo a criação de testes unitários e de integração mais eficazes e focados.
- **Desenvolvimento Paralelo:** Diferentes equipes ou desenvolvedores podem trabalhar em módulos distintos simultaneamente com menor conflito, agilizando o processo de desenvolvimento.

#### 2.Arquitetura MVC(Model-View-controller) 
Inspirado no NestJS, essa arquitetura foi utilizada para separar logicamente o negócio, a interface do usuário e a interação com o usuário.

- **Menos boilerplate:** Decorators abstraem grande parte da configuração de rotas.
- **Reuso de código e modularidade:** Agrupa funcionalidades por domínio, facilitando a extração e reutilização de módulos em outros projetos.
- **Padronização de rotas:** A abstração via decorators garante que todas as rotas sigam um padrão consistente de definição, facilitando a manutenção, documentação e entendimento da API.
- **Aplicação de cross-cutting concerns de forma centralizada:** Utilizando middlewares e decorators, preocupações transversais como autenticação, autorização, logging, validação de dados e tratamento de erros são implementadas de maneira centralizada e reutilizável. Isso garante que regras e políticas globais sejam aplicadas de forma consistente em toda a API, reduzindo duplicidade de código e facilitando a manutenção.

### Frontend - Arquitetura Modular Baseada em Componentes

A arquitetura do frontend foi pensada para maximizar a modularidade e a clareza, inspirando-se em práticas consolidadas do ecossistema React. A estrutura do projeto organiza cada domínio da aplicação em módulos próprios, com separação clara entre componentes, contextos, hooks, serviços e telas. Essa abordagem traz os seguintes benefícios:

- **Separação de Responsabilidades (SoC):** Cada módulo do frontend é responsável por uma funcionalidade específica (ex: autenticação, dashboard, transações), tornando o código mais organizado e fácil de entender.
- **Reuso de Componentes:** Componentes e hooks reutilizáveis são centralizados, promovendo o princípio DRY e facilitando a manutenção e evolução da interface.
- **Escalabilidade:** A modularização permite adicionar novas funcionalidades ou telas sem impactar outras áreas do sistema, facilitando o crescimento do projeto.
- **Facilidade de Testes:** A divisão em módulos e componentes isolados torna a escrita de testes unitários e de integração mais simples e eficiente.
- **Padronização e Consistência:** O uso de padrões como Context API para estado global, React Router para navegação e organização por domínio garante uma base consistente e previsível para todo o frontend.

### Validação em Camadas (Frontend, Backend e Banco de Dados)

O sistema foi projetado com validação em múltiplas camadas, garantindo robustez contra falhas e fornecendo feedback imediato ao usuário. Cada camada implementa mecanismos específicos de validação, promovendo segurança, integridade dos dados e melhor experiência de uso.

#### Frontend
- **Validação de tipos e expressões:** Utilização de expressões regulares (regex) e checagem de tipos antes do envio dos dados para a API, evitando requisições inválidas e reduzindo o consumo desnecessário de recursos.

#### Backend
- **Validação automática estruturada:** A arquitetura do backend, aliada ao uso de decorators e da biblioteca Zod, garante validação automática e rigorosa dos dados recebidos, assegurando que apenas informações corretas e no formato esperado sejam processadas.

#### Banco de Dados (PostgreSQL)
- **Validação de integridade e restrições:** Antes da inserção de novos dados, o banco de dados aplica validações automáticas por meio de constraints e tipos de dados definidos no modelo, prevenindo inconsistências e mantendo a integridade das informações.



