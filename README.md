# Além das Páginas

Site para publicação de resenhas sobre livros espíritas — projeto React (Vite) com backend em
funções serverless da Vercel e banco de dados Postgres.

Stack:
- **Frontend**: React + Vite
- **Backend**: Vercel Serverless Functions (`/api/reviews.js`)
- **Banco de dados**: Postgres, via integração Neon no Vercel Marketplace

> Nota: o antigo "Vercel Postgres" nativo foi descontinuado (migrado para Neon no final de 2024).
> Hoje, usar Postgres na Vercel significa instalar a integração **Neon** (ou outro provedor
> Postgres) pelo Marketplace — o banco continua sendo Postgres de verdade, só muda quem
> hospeda por baixo dos panos.

## Estrutura do projeto

```
api/
└── reviews.js               # função serverless: GET lista resenhas, POST cria uma nova
src/
├── App.jsx                  # componente raiz, junta as seções da página
├── main.jsx                  # ponto de entrada do React
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── HeroArt.jsx           # ilustração SVG do topo
│   ├── Estante.jsx           # filtro por categoria
│   ├── ReviewsSection.jsx    # busca + grade de resenhas
│   ├── ReviewCard.jsx
│   ├── PublishForm.jsx       # formulário de publicação
│   ├── FlameIcon.jsx         # ícone e avaliação em "chamas" (grau de luz)
│   ├── About.jsx
│   └── Footer.jsx
├── data/
│   └── seedReviews.js        # resenhas de exemplo e rótulos de categoria
├── hooks/
│   └── useReviews.js         # busca/publica resenhas via /api/reviews
└── lib/
    └── api.js                # funções fetchReviews() / createReview()
schema.sql                    # script de criação da tabela reviews
vercel.json                   # runtime Node.js das funções em /api
```

## Passo a passo do deploy (frontend + backend + banco, tudo na Vercel)

### 1. Subir o projeto

1. Suba esta pasta para um repositório no GitHub (ou GitLab/Bitbucket).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta automaticamente que é um projeto Vite: build command `vite build`,
   diretório de saída `dist`. Não precisa mudar nada — clique em **Deploy**.
   - As funções em `/api/reviews.js` são detectadas e publicadas automaticamente como
     Serverless Functions, sem configuração extra.

Nesse ponto o site já estará no ar, mas a publicação de resenhas ainda vai falhar, porque falta o
banco de dados.

### 2. Adicionar o banco Postgres (Neon)

1. No painel do projeto na Vercel, abra a aba **Storage**.
2. Clique em **Create Database**, escolha **Postgres** (provedor **Neon**) e confirme.
   - Isso cria o banco e já injeta a variável `DATABASE_URL` (e outras) no seu projeto —
     você não precisa copiar/colar nada manualmente.
3. Ainda no painel de Storage, abra o link para o **console do Neon** e vá em **SQL Editor**.
   Rode o conteúdo do arquivo [`schema.sql`](./schema.sql) deste projeto para criar a tabela de
   resenhas (ou rode `psql "$DATABASE_URL" -f schema.sql` caso tenha o `psql` instalado
   localmente).

4. Volte ao painel da Vercel e faça um **redeploy** do projeto (Deployments > ⋯ > Redeploy),
   para que a função serverless passe a enxergar a variável `DATABASE_URL`.

Pronto: as resenhas publicadas por qualquer visitante agora ficam salvas no Postgres e aparecem
para todo mundo (o site verifica por novas resenhas a cada 20 segundos automaticamente).

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18+ e a [Vercel CLI](https://vercel.com/docs/cli)
(`npm i -g vercel`).

Como o backend é uma função serverless da própria Vercel, o comando `vite` sozinho não consegue
servir `/api/reviews`. Use o `vercel dev`, que emula a Vercel localmente (frontend + funções):

```bash
npm install
vercel link          # conecta esta pasta ao projeto criado na Vercel (uma vez só)
vercel env pull .env.local   # baixa a DATABASE_URL real do projeto
vercel dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:3000`).

Se preferir não linkar com um projeto na Vercel ainda, você pode rodar contra um banco Neon
próprio: copie `.env.example` para `.env.local`, cole a connection string do seu banco em
`DATABASE_URL` e rode `vercel dev` normalmente.

> Rodar só `npm run dev` (Vite puro) ainda funciona para mexer na parte visual, mas as chamadas a
> `/api/reviews` vão falhar nesse modo — use `vercel dev` sempre que precisar testar a publicação
> de resenhas de ponta a ponta.

## Build de produção manual

```bash
npm run build
npm run preview   # testa o build do frontend localmente (sem as funções de /api)
```

## Um ponto de atenção

A função em `api/reviews.js` permite que **qualquer pessoa** leia e publique resenhas, sem login —
mesmo comportamento que o site já tinha antes. É simples de manter, mas não há moderação
automática nem proteção contra spam. Se isso virar um problema, dá para evoluir depois (checar um
token simples antes de aceitar o POST, limitar por IP, exigir e-mail, moderação manual pelo SQL
Editor do Neon etc.) sem precisar reescrever o restante do site.

## Personalização

- Cores, tipografia e espaçamentos: `src/styles/index.css` (variáveis no topo do arquivo, em `:root`).
- Categorias e resenhas de exemplo: `src/data/seedReviews.js`.
- Textos de cada seção: dentro do respectivo componente em `src/components/`.
- Regras da API (validações, campos): `api/reviews.js`.
