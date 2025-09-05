# Etapa 1: Construção do projeto com Vite
FROM node:20-alpine AS build

WORKDIR /app

# Copiar os arquivos de dependência
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código fonte do projeto
COPY . .

# Executar o build do Vite
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remover a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Configuração personalizada do Nginx (garantindo que a chave de fechamento está presente)
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Copiar os arquivos da build do Vite para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
