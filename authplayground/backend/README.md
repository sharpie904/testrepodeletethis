
# Backend setup

```shell
# install node and nvm first
pnpm create hono@latest
pnpx prisma init
pnpm add better-auth
```

## Database and better auth setup
```shell
pnpx prisma generate
pnpx @better-auth/cli generate
pnpx prisma migrate dev # generate migrations
pnpx prisma db push # push to db
```
# Nybbler