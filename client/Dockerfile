FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install --silent ./
COPY . .
EXPOSE 3000
# RUN chown -R node /usr/src/client
# USER node
CMD ["npm", "run", "start"]
