# Asosiy obrazni tanlang
FROM node:14

# Ishchi direktoriya yaratish
WORKDIR /app

# Tizim fayllarini ko'chirish
COPY package*.json ./

# Modullarni o'rnatish
RUN npm install

# Barcha fayllarni katalogga ko'chirish
COPY . .

# Portni ochish
EXPOSE 3000

# Loyalarni ishga tushirish
CMD ["npm", "run", "start:dev"]