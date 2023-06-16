FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /usr/src/client
COPY ["package.json", "package-lock.json", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/client
USER node
CMD ["npm", "run", "start"]
