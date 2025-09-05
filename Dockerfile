# Etapa 1: Construção do projeto com Vite
FROM node:20-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do código-fonte para dentro do container
COPY . .

# Execute o build do Vite
RUN npm run build

# Etapa 2: Servindo com Nginx
FROM nginx:alpine

# Remova a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Crie uma nova configuração de servidor Nginx
RUN printf "server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files \$uri /index.html;\n\
    }\n" > /etc/nginx/conf.d/default.conf

# Copie os arquivos da build do Vite para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]
