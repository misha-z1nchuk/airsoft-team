FROM node:12.18.3

LABEL version="1.0"
LABEL description="API"

WORKDIR /express

COPY ["package.json", "package-lock.json", "./"]
RUN npm install -g ts-node nodemon
RUN ls
RUN npm install


COPY . .

EXPOSE 5000

CMD ["npm", "initDb"]
CMD ["ts-node", "index.ts"]
