FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /usr/src/client/build /usr/share/nginx/html
