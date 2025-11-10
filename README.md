# Sistema de Gerenciamento de Alunos (CRUD)

Sistema completo para gerenciamento de alunos desenvolvido com Node.js, React e PostgreSQL.

## Pré-requisitos

- Docker e Docker Compose
- Node.js 20+ (para desenvolvimento local)
- npm ou yarn

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd alunos-crud
```

### 2. Executar com Docker Compose

O projeto utiliza Docker Compose para orquestrar todos os serviços (banco de dados, API e frontend).

```bash
# Subir todos os serviços
docker-compose up -d

# Verificar se os containers estão rodando
docker-compose ps

# Os serviços estarão disponíveis em:
# - Frontend: http://localhost:5173
# - API: http://localhost:3333/api
# - Documentação da API: http://localhost:3333/reference
# - PostgreSQL: localhost:5432
```

### 3. Configurar o banco de dados

Antes de configurar o banco de dados, você precisa configurar as variáveis de ambiente da API:

```bash
# Entrar na pasta api
cd api

#Instalar as dependências
npm install

# Criar arquivo .env a partir do .env.example
npm run setup:env
```

**Configuração recomendada para Docker Compose:**

O arquivo `.env` criado deve conter a seguinte configuração para funcionar com o Docker Compose:

```env
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://alunos_user:alunos_password@localhost:5432/alunos_db
```

### 4. Rodar migrações e seeds

Após os containers estarem rodando e as variáveis de ambiente configuradas, execute os comandos para configurar o banco:

```bash

# Gerar as migrações do drizzle
npm run db:generate

# Executar as migrações
npm run db:migrate

# (Opcional) Executar o seed para popular o banco com dados de exemplo
npm run db:seed

# (Opcional) Executar drizzle studio, cliente de banco de dados
npm run db:studio
```

### 5. Executar testes automatizados [opcional]

Para rodar os testes da API:

```bash

# Executar testes unitários
npm run test:unit

# Executar testes de integração
npm run test:integration

```

### 6. Executar lint na API [opcional]

```bash

# Verificar e corrigir problemas de lint
npm run format

```

## Serviços e Portas

O projeto roda completamente em containers Docker com os seguintes serviços:

| Serviço | Container | Porta | URL |
|---------|-----------|-------|-----|
| **Frontend** | `alunos-web` | 5173 | http://localhost:5173 |
| **API** | `alunos-api` | 3333 | http://localhost:3333/api |
| **Documentação da API** | `alunos-api` | 3333 | http://localhost:3333/reference |
| **PostgreSQL** | `alunos-postgres` | 5432 | localhost:5432 |

## Estrutura do projeto

```
alunos-crud/
├── api/                          # Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── application/          # Camada de aplicação
│   │   │   ├── repositories/     # Interfaces dos repositórios
│   │   │   └── use-cases/        # Casos de uso e regras de negócio
│   │   │       └── __tests__/    # Testes unitários dos use cases
│   │   ├── domain/              # Camada de domínio
│   │   │   ├── entities/        # Entidades do domínio
│   │   │   ├── errors/          # Erros específicos do domínio
│   │   │   └── value-objects/   # Objetos de valor
│   │   ├── infra/               # Camada de infraestrutura
│   │   │   ├── db/              # Configuração do banco de dados
│   │   │   │   ├── migrations/  # Migrações do banco
│   │   │   │   │   └── meta/    # Metadados das migrações
│   │   │   │   └── schema/      # Schemas do Drizzle ORM
│   │   │   ├── http/            # Infraestrutura HTTP
│   │   │   │   ├── __tests__/   # Testes de integração
│   │   │   │   ├── controllers/ # Controllers da API
│   │   │   │   ├── middlewares/ # Middlewares (validação, erro)
│   │   │   │   ├── routes/      # Definição das rotas
│   │   │   │   └── types/       # Tipos e schemas de validação
│   │   │   └── repositories/    # Implementações dos repositórios
│   │   └── main/                # Configuração e inicialização
│   │       └── factories/       # Factories para injeção de dependência
│   ├── .env.example             # Template de variáveis de ambiente
│   ├── biome.json               # Configuração do Biome (linter/formatter)
│   ├── drizzle.config.ts        # Configuração do Drizzle ORM
│   ├── jest.config.ts           # Configuração dos testes
│   ├── openapi.json             # Especificação OpenAPI da API
│   ├── tsconfig.json            # Configuração do TypeScript
│   ├── Dockerfile               # Container da API
│   └── package.json             # Dependências e scripts da API
│
├── web/                         # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── api/                 # Comunicação com a API
│   │   ├── components/          # Componentes React reutilizáveis
│   │   │   ├── students/        # Componentes específicos de alunos
│   │   │   └── ui/              # Componentes de interface base
│   │   ├── assets/              # Arquivos estáticos
│   │   ├── lib/                 # Utilitários e configurações
│   │   ├── App.tsx              # Componente principal
│   │   └── main.tsx             # Ponto de entrada do React
│   ├── public/                  # Arquivos públicos
│   ├── components.json          # Configuração do Shadcn/ui
│   ├── vite.config.ts           # Configuração do Vite
│   ├── Dockerfile               # Container do frontend
│   └── package.json             # Dependências e scripts do frontend
│
├── docker-compose.yml           # Orquestração dos serviços
├── arch.md                      # Documentação da arquitetura
├── checklist.md                 # Checklist do projeto
└── README.md                    # Este arquivo
```

## Tecnologias utilizadas

### Backend
- Node.js com TypeScript
- Express (framework web)
- Drizzle (ORM)
- PostgreSQL (banco de dados)
- Jest (testes)
- Biome (linting)

### Frontend
- React com TypeScript
- Vite (build tool)
- TanStack Query (gerenciamento de estado)
- TanStack Table (tabelas)
- Tailwind CSS (estilização)
- Shadcn/ui (componentes)

