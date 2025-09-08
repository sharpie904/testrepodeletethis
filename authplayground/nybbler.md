# Nybbler

- setup workspaces for `pnpm` 

## Setup eslint
- `pnpm add -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint @eslint/js eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks -w`
- Copy the `eslint.config.js` files there in the root location.


## Backend setup

```shell
# install node and nvm first
pnpm create hono@latest
pnpx prisma init
pnpm add better-auth
```

## Frontend setup