FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build
ENV PORT=8080
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]