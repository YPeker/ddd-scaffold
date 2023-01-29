FROM node:16-alpine
RUn npm i -g nodemon
COPY /package.json ./package.json 
COPY ./package-lock.json ./package-lock.json 
RUN npm ci 

COPY ./tsconfig.json ./tsconfig.json
COPY ./configs ./configs 
COPY ./src ./src 
EXPOSE 10000

CMD ["npm", "run", "start"]