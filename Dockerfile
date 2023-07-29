FROM node:16

WORKDIR /islom/src/app

COPY package*.json ./

COPY . .

RUN npm i
RUN npm run build

# RUN npx prisma migrate dev --name init
# RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main"]