# TechFinance - TechLab 2025

Bem-vindo ao repositório do **TechFinance**, uma aplicação fullstack desenvolvida para o desafio TechLab 2025 da Tech4Humans. Este documento oferece uma visão detalhada do projeto, incluindo decisões de arquitetura, lógica de desenvolvimento, estrutura do projeto, instruções de execução e cobertura de testes.

---

## Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instruções de Execução](#instruções-de-execução)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
    - [Arquitetura do Backend](#arquitetura-do-backend)
    - [Arquitetura da API](#arquitetura-da-api)
    - [Arquitetura das Entidades do Banco de Dados](#arquitetura-das-entidades-do-banco-de-dados)
- [Decisões de Arquitetura](#decisões-de-arquitetura)
    - [Backend - Arquitetura Modular e MVC](#backend---arquitetura-modular-e-mvc)
    - [Frontend - Arquitetura Modular Baseada em Componentes](#frontend---arquitetura-modular-baseada-em-componentes)
    - [Validação em Camadas (Frontend, Backend e Banco de Dados)](#validação-em-camadas-frontend-backend-e-banco-de-dados)
    - [Utilização do Redis](#utilização-do-redis)
    - [Utilização de Cookies](#utilização-de-cookies)
    - [Utilização de JsonWebToken (JWT) para Autenticação](#utilização-de-jsonwebtoken-jwt-para-autenticação)
- [Lógica de Desenvolvimento](#lógica-de-desenvolvimento)
    - [Principais Funcionalidades](#principais-funcionalidades)
        - [Usuário](#1-usuário)
        - [Contas](#2-contas)
        - [Cartões](#3-cartões)
        - [Transações](#4-transações)
        - [Filtros Dinâmicos](#5-filtros-dinâmicos)
        - [Categorias](#6-categorias)
        - [Dashboard](#7-dashboard)
        - [IA](#8-ia)
        - [Contatos](#9-contatos)
        - [Filas em Redis](#10-filas-em-redis)
        - [Rate Limit](#11-rate-limit)
- [Possíveis Melhorias / Funcionalidades Adicionais Sugeridas](#possíveis-melhorias--funcionalidades-adicionais-sugeridas)
    - [Implementação de Sistema de Cache](#1-implementação-de-sistema-de-cache)
    - [Padronização de Commits](#2-padronização-de-commits)
    - [Implementação de Testes End-to-End](#3-implementação-de-testes-end-to-end)
    - [Paginação na API](#4-paginação-na-api)
- [Testes Unitários](#testes-unitários)
- [Agradecimentos](#agradecimentos)

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
POSTGRES_PORT=5432               # 5433 se for usado sem docker !
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

A aplicação foi desenvolvida com uma arquitetura de serviços independentes, executados localmente, consistindo em:
- Um servidor **frontend** (React/Vite) responsável pela interface do usuário e consumo da API.
- Um servidor **backend** (Node.js/Express/TypeScript) responsável pela API RESTful, lógica de negócios, e comunicação com o banco de dados e Redis.
- Um servidor de banco de dados **PostgreSQL**.
- Um servidor **Redis** para caching e/ou gerenciamento de filas.

![Modelo Geral da Aplicação](https://i.imgur.com/Kq8GzZn.png "Diagrama da arquitetura geral da aplicação TechFinance")

### Arquitetura do Backend

O backend foi modelado utilizando uma estrutura modular, visando facilitar a organização e manutenção do código. As funcionalidades são agrupadas em módulos, cada um contendo seus respectivos controllers, services, DTOs (Data Transfer Objects) e entidades.

### Arquitetura da API

A API foi desenvolvida seguindo um padrão de design inspirado no [NestJS](https://docs.nestjs.com/controllers), utilizando decorators e `reflect-metadata` para definir rotas, validações e injeção de dependência de forma declarativa. Este padrão promove uma organização clara de responsabilidades e facilita a escalabilidade da API.

![Modelo da API Backend](https://i.imgur.com/4ZLtVVq.png "Diagrama do padrão da API backend, inspirado no NestJS")

### Arquitetura das Entidades do Banco de Dados

O diagrama Entidade-Relacionamento (ER) abaixo ilustra as principais entidades do sistema e seus relacionamentos:

![Diagrama ER](https://i.imgur.com/D27S9iV.png)

---

## Decisões de Arquitetura

### Backend - Arquitetura Modular e MVC

A combinação das arquiteturas [modular](https://medium.com/geekculture/what-is-modular-architecture-benefits-implementation-methods-8c272ebc05eb) e [MVC](https://coodesh.com/blog/dicionario/o-que-e-arquitetura-mvc/) no backend proporciona uma base sólida e flexível para o desenvolvimento do sistema, inspirada no framework moderno [NestJS](https://nestjs.com).

#### 1. Arquitetura Modular

A adoção de uma arquitetura modular no backend foi uma decisão estratégica, motivada pela familiaridade com estruturas semelhantes (como a do Angular) e pelos seguintes benefícios:

- **Separação de Responsabilidades (SoC):** Cada módulo é dedicado a uma funcionalidade específica do negócio (ex: autenticação, gerenciamento de transações). Isso isola as responsabilidades, tornando o código mais compreensível e focado.
- **Manutenção Simplificada:** Alterações ou correções em um módulo têm impacto mínimo sobre os demais, reduzindo o risco de regressões e facilitando a manutenção evolutiva do sistema.
- **Reusabilidade de Código:** Componentes, serviços e lógicas comuns podem ser encapsulados em módulos e reutilizados em diferentes partes da aplicação, promovendo a eficiência e consistência do desenvolvimento (princípio DRY - Don't Repeat Yourself).
- **Clareza de Domínio:** A estrutura modular reflete diretamente os domínios e subdomínios do negócio, facilitando o entendimento da aplicação tanto para novos desenvolvedores quanto para a equipe atual.
- **Escalabilidade Granular:** Permite que módulos específicos sejam otimizados ou escalados independentemente, conforme a demanda, sem a necessidade de escalar toda a aplicação.
- **Testabilidade Aprimorada:** Módulos com responsabilidades bem definidas são mais fáceis de testar isoladamente, permitindo a criação de testes unitários e de integração mais eficazes e focados.
- **Desenvolvimento Paralelo:** Diferentes equipes ou desenvolvedores podem trabalhar em módulos distintos simultaneamente com menor conflito, agilizando o processo de desenvolvimento.

#### 2. Arquitetura MVC (Model-View-Controller)

Inspirada no NestJS, esta arquitetura foi utilizada para separar logicamente as responsabilidades de negócio, a interface do usuário e a interação com o usuário.

- **Menos código boilerplate:** Decorators abstraem grande parte da configuração de rotas.
- **Reutilização de código e modularidade:** Agrupa funcionalidades por domínio, facilitando a extração e reutilização de módulos em outros projetos.
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

### Utilização do Redis

O Redis foi escolhido para simular um cenário real com múltiplas transações, visando evitar a sobrecarga do servidor.

### Utilização de Cookies

A escolha por utilizar cookies no frontend, em vez de localStorage ou sessionStorage, é justificada pelos seguintes benefícios:

1. **Proteção contra ataques XSS (Cross-Site Scripting)**
        - **Cookies HttpOnly:** Ao marcar um cookie como `HttpOnly=true`, ele se torna inacessível ao JavaScript do navegador. Assim, mesmo que exista uma vulnerabilidade XSS, um atacante não conseguirá ler esse cookie via `document.cookie`.
        - **localStorage/sessionStorage vulneráveis:** Dados armazenados em `localStorage` ou `sessionStorage` ficam sempre disponíveis em `window.localStorage` ou `window.sessionStorage`. Se houver um script malicioso injetado, ele pode facilmente ler e extrair esses dados.

2. **Expiração e escopo de domínio**
        - **Configuração granular:** Cookies permitem definir `Expires`/`Max-Age`, `Domain`, `Path`, `Secure` e `SameSite`, oferecendo controle preciso sobre validade, escopo e segurança.
        - **localStorage/sessionStorage:** Não possuem controle nativo de expiração ou escopo de domínio, exigindo implementação manual dessas regras.

3. **Persistência e compartilhamento entre abas**
        - **Cookies:** Permitem controle de expiração e são compartilhados entre abas e janelas do navegador, facilitando a manutenção do estado de autenticação.
        - **sessionStorage:** Dados somem ao fechar a aba e não são compartilhados entre abas.
        - **localStorage:** Dados persistem indefinidamente, mas não oferecem controle de expiração automática.

4. **Segurança de transporte (HTTPS/Secure flag)**
        - **Cookie com Secure=true:** Garante que o cookie só seja enviado em conexões HTTPS, protegendo contra interceptação em conexões inseguras.
        - **localStorage/sessionStorage:** Dados podem ser expostos se houver downgrade para HTTP, pois não há proteção nativa de transporte.

---

### Utilização de JsonWebToken (JWT) para Autenticação

A escolha pelo uso de JWT (JSON Web Token) como mecanismo de autenticação na aplicação se baseia em diversos benefícios que atendem tanto à segurança quanto à escalabilidade do sistema:

1. **Autenticação stateless e escalável**
        - **Sem sessão no servidor:** O JWT armazena todas as informações relevantes (ID do usuário, permissões, expiração) dentro do próprio token, eliminando a necessidade de manter sessões no backend. Isso facilita o balanceamento de carga e a escalabilidade horizontal, pois qualquer instância do backend pode validar o token localmente.

2. **Padrão amplamente suportado e interoperável**
        - **Integração facilitada:** JWT é um padrão aberto, suportado por diversas linguagens e frameworks, tornando-o ideal para sistemas distribuídos, microsserviços e integrações com terceiros.
        - **Transporte flexível:** Pode ser transmitido via cabeçalho HTTP (`Authorization: Bearer <token>`), cookies ou até mesmo parâmetros de URL, conforme a necessidade da aplicação.

3. **Segurança e controle de expiração**
        - **Assinatura digital:** O token é assinado (HMAC ou RSA), garantindo integridade e autenticidade dos dados. O backend pode verificar se o token foi alterado ou forjado.
        - **Expiração automática:** O campo `exp` define a validade do token, limitando o tempo de uso e reduzindo riscos em caso de vazamento. É possível implementar refresh tokens para sessões prolongadas de forma segura.

4. **Flexibilidade e customização**
        - **Claims personalizados:** O JWT permite incluir informações adicionais (claims) conforme as necessidades do negócio, como roles, permissões ou dados contextuais, facilitando decisões de autorização diretamente no backend.
        - **Controle granular de acesso:** Permite implementar diferentes níveis de acesso e políticas de segurança de forma centralizada e padronizada.

5. **Compatibilidade com cookies seguros**
        - **Armazenamento seguro:** O JWT pode ser armazenado em cookies com flags `HttpOnly`, `Secure` e `SameSite`, combinando os benefícios de ambos os mecanismos para máxima proteção contra ataques XSS e CSRF.

---

## Lógica de Desenvolvimento

O projeto foi concebido para criar um sistema financeiro que suporte a criação de múltiplas contas e cartões, permitindo um controle financeiro mais abrangente.

### Principais Funcionalidades

#### 1. Usuário
- **Cadastro e Login de Usuários:** Utilização de bcrypt para hash de senhas e geração de tokens JWT para validação rápida.
- **Middlewares:** Foram criados middlewares para controle de permissões em rotas específicas, incluindo autenticação e verificação de propriedade da conta.

#### 2. Contas
- **Múltiplas Contas:** Permite ao usuário cadastrar múltiplas contas.
- **Tipos:** As contas podem ser do tipo Poupança ou Corrente.
- **Validação:** Middleware para verificar a existência da conta e se o usuário é o proprietário.
- **Regras de Negócio:**
        - Saldo mínimo inicial da conta de R$ 1,00.

#### 3. Cartões
- **Múltiplos Cartões:** Permite ao usuário cadastrar múltiplos cartões.
- **Tipos:** Os cartões podem ser do tipo Crédito ou Débito.
- **Limite:** Possibilidade de adicionar limite aos cartões.
- **Ícones dinâmicos:**
        - **Visa:** Se o primeiro dígito for `4`.
        - **Mastercard:** Se o primeiro dígito for `5` ou os quatro primeiros dígitos estiverem entre `2221` e `2720`.
        - **American Express:** Se os dois primeiros dígitos forem `34` ou `37`.
        - **Discover:** Se o primeiro dígito for `6`.
        - **Outros:** Caso não corresponda a nenhuma bandeira, nenhum ícone específico é exibido.
- **Regras de Negócio:**
        - Limite do cartão deve ser superior a 0.

#### 4. Transações
- **Transações entre Contas:** Permite realizar transferências de valores entre contas.
- **Validação de Saldo:** Verificação prévia ao processamento da transação para garantir que a conta de origem não fique com saldo negativo.
- **Transação e Saldo Pendentes:** Cada transação criada é marcada como pendente, sinalizando na conta de origem (em vermelho) e na conta de destino (em verde). Após a validação pela fila do Redis, os valores são debitados e creditados.
- **Regras de Negócio:**
        - Valor maior que 0.
        - Transação permitida somente entre contas de usuários diferentes.
        - Selecionar uma categoria.

#### 5. Filtros Dinâmicos
- **Tipos:**
        - [a-z]
        - [A-Z]
        - [Período]
        - [Tipo]: Aplicável a contas, permite filtrar por Poupança ou Corrente.
- **Componentes:** Válido para contas e contatos.
- **Inputs:** Contas podem ser pesquisadas por nome.

#### 6. Categorias
- **Divisão de Despesas:** Possibilita a visualização dos gastos categorizados por transações.

#### 7. Dashboard
- **Informativo:**
        - Visualização do total de contas.
        - Saldo total.
        - Saídas e entradas (fluxo de caixa).
        - Divisão de saldos por conta.

#### 8. IA
- **Auxílio na Gestão Financeira:** O FinanceTechAI analisa os dados do usuário (contas, saldos, cartões, transações, categorias) para fornecer um planejamento financeiro, ajudando o usuário a entender a movimentação de seu dinheiro e oferecendo dicas para uma gestão financeira segura.
- **Popup Chat:** O usuário pode interagir diretamente com a IA para sanar dúvidas ou obter insights.
        - **Conta Específica:** O popup em `/dashboard/account` utiliza dados específicos da conta selecionada na conversa com o usuário.
        - **Visão Geral (Dashboard):** O popup em `/dashboard` utiliza dados consolidados de todas as contas, transações e categorias na conversa com o usuário.
        - **Continuidade da Conversa:** A IA é capaz de interpretar o histórico da conversa e continuar fornecendo insights relevantes.

#### 9. Contatos
- **Múltiplos Contatos:** O usuário pode cadastrar contatos associados a cada conta para agilizar transações recorrentes.

#### 10. Filas em Redis
- **Sistema de Fila:** Utiliza o princípio FIFO (First In, First Out) para o processamento das transações.
- **Alteração Dinâmica de Saldos:** Após o processamento da transação, a API executa as seguintes tarefas:
        - Saldo da conta de origem.
        - Saldo da conta de destino.
        - Alteração do status da transação de `Pending` para `Completed`.

#### 11. Rate Limit
Foi implementado um limite de taxa (rate limiting) como medida adicional de proteção ao servidor, prevenindo sobrecargas, com um máximo de 20 requisições por segundo.

#### 12. Responsividade 
Site é inteiramente responsivo tanto para desktop quanto mobile.
---

## Possíveis Melhorias / Funcionalidades Adicionais Sugeridas

### 1. Implementação de Sistema de Cache
- **Desempenho:** Aprimorar o desempenho do backend utilizando um sistema de cache com Redis para armazenar dados frequentemente acessados em memória, reduzindo a necessidade de consultas ao banco de dados.
- **Redução de Latência:** Proporcionar respostas mais rápidas.
- **Escalabilidade Horizontal:**
        - **Cache Distribuído:** Suporte a modelos de cluster e replicação (shards ou réplicas de leitura).
        - **Camada de Estado Compartilhado:** Redis centralizado para múltiplas instâncias da aplicação.
- **Alívio de Picos de Tráfego:**
        - **Proteção contra "Cache Stampede":** Evita que múltiplos processos realizem a mesma consulta pesada ao banco de dados simultaneamente, populando o cache após a primeira requisição para os demais processos.

### 2. Padronização de Commits
- **Aprimorar o padrão de commits:**
        - Utilizar de forma mais consistente o padrão convencional de commits (ex: feat, fix, chore).
        - Realizar commits mais granulares para aumentar a especificidade das alterações.

### 3. Implementação de Testes End-to-End
- Utilização de bibliotecas como [Cypress](https://www.cypress.io) para testar integralmente os fluxos de processos entre o frontend e o backend.

### 4. Paginação na API
- Transações, contatos e cartões são atualmente enviados em uma única requisição. A implementação de paginação poderia melhorar a velocidade de resposta e reduzir a sobrecarga do servidor, dividindo os dados em páginas e consumindo-as conforme necessário.

#### 5. Swagger
- Ter adicionado swagger para uma documentação mais profissional da api

---

## Testes Unitários

- Os testes unitários foram focados nas regras de negócio da aplicação:
    - **Usuário:**
        - Criação de usuário:
            - E-mail inválido
            - Senha curta
            - E-mail já existente
            - Criação válida
    - **Transações:**
        - Criação de transação:
            - Valor inválido
            - Saldo insuficiente
            - Categoria inválida
            - Sem categoria
            - Conta inválida
            - Criação válida
    - **Contatos:**
        - Criação de contato:
            - Conta inválida
            - Sem nome
            - Criação válida
    - **Categoria:**
        - Criação de categoria:
            - Sem nome
    - **Cartão:**
        - Criação de cartão:
            - Sem nome
            - Limite menor que 0
            - Criação válida
        - Remoção de cartão:
            - ID inválido
            - Remoção válida
    - **Middlewares:**
        - Autenticação
        - Dono da conta

---

## Agradecimentos

> Desde já, agradeço imensamente à Tech4Humans e ao CEU pela oportunidade de participar desta dinâmica que envolveu grande esforço, trabalho e aprendizado. Ser avaliado por profissionais experientes nesta área é uma experiência única, que certamente possibilitará maior aprendizagem e me ajudará a identificar áreas para aprimoramento. Muito obrigado!
