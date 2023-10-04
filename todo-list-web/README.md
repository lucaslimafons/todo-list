This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

## Getting Started

First install the packages

```bash
npm install
```

Now please create the `.env` file and paste the content from `.env.example`.

```
$ vi .env
```

You need to run the API, so please take a look on the `todo-list-api` project.

Rrun the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Todo's / Improvements

- [ ] Add a better security layer for the authentication
- [ ] Add a fetch service with global interceptors for errors (easy to logout if it's unauthorized for example)
- [ ] Add error handling for API layer
- [ ] Loading provider
- [ ] Global error provider
- [ ] Disable form buttons during the actions
- [ ] Tests
- [ ] Filter list (done/not done)