
## Package larni yuklash

```bash

$ npm i -g @nestjs/cli

$ npm install

```

## Dockerni yuklab olish
<a href="https://www.docker.com/products/docker-desktop/">https://www.docker.com/products/docker-desktop/</a>

## Docker compose file

### postgress ni ishga tushurish
docker-compose.yml
```yml
version: '3.8'
services:
  db:
    image: postgres:13
    container_name: postgres
    restart: always
    ports:
      - 5435:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nestjs
```
terminal 
```bash
docker compose up
```

## Projectni ishga tushirish

```bash
npx prisma migrate dev --name init

npx prisma generate

npm run start:dev
```

## Project Docs

<a href="https://documenter.getpostman.com/view/20661688/2s93z59jfJ">Link Docs</a>

