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

# Configuração personalizada do Nginx para PWA
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Service Worker - MIME type correto e sem cache' >> /etc/nginx/conf.d/default.conf && \
    echo '    location = /sw.js {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "application/javascript";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "no-cache, no-store, must-revalidate";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Pragma "no-cache";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Expires "0";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Manifest - MIME type correto' >> /etc/nginx/conf.d/default.conf && \
    echo '    location = /manifest.json {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "application/manifest+json";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=86400";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Browserconfig' >> /etc/nginx/conf.d/default.conf && \
    echo '    location = /browserconfig.xml {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "application/xml";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=86400";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Favicon' >> /etc/nginx/conf.d/default.conf && \
    echo '    location = /favicon.ico {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "image/x-icon";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=86400";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Imagens' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~* \.(png|jpg|jpeg|gif|svg|webp)$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "image/png";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=31536000";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # CSS' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~* \.css$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "text/css";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=31536000";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # JavaScript' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~* \.js$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type "application/javascript";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=31536000";' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Headers de segurança' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-Content-Type-Options nosniff;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-Frame-Options DENY;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-XSS-Protection "1; mode=block";' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Referrer-Policy "strict-origin-when-cross-origin";' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # CORS para PWA' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Access-Control-Allow-Origin "*";' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Access-Control-Allow-Headers "Content-Type, Authorization";' >> /etc/nginx/conf.d/default.conf && \
    echo '' >> /etc/nginx/conf.d/default.conf && \
    echo '    # SPA - redirecionar todas as rotas para index.html exceto arquivos estáticos' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Copiar os arquivos da build do Vite para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]