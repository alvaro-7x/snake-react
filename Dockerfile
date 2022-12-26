# Etapa de construccion
FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Etapa despliegue
FROM nginx:alpine
EXPOSE 8081
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/
#CMD ["nginx", "-g", "daemon off;"]
