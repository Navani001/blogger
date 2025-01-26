FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install -force

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm","run","dev"]

