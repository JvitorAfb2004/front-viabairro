# Configuração de Ambiente - ViaBairro

## Variáveis de Ambiente Necessárias

### Frontend (.env)

```env
VITE_API_URL=https://clientes-backend-viabairro.an7euh.easypanel.host/api
VITE_WS_URL=https://clientes-backend-viabairro.an7euh.easypanel.host
```

### Backend (.env)

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://clientes-frontend-viabairro.an7euh.easypanel.host

# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=viabairro
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

# JWT
JWT_SECRET=sua_chave_secreta_jwt_aqui

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=seu_token_mercadopago_aqui
MERCADOPAGO_WEBHOOK_SECRET=seu_webhook_secret_aqui

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app_gmail

# Redis
REDIS_URL=redis://localhost:6379
```

## Correções Aplicadas

1. **WebSocket Frontend**: Atualizado para usar URL de produção
2. **CORS Backend**: Adicionado domínios de produção
3. **API Base URL**: Configurado para usar URL de produção automaticamente
4. **WebSocket Backend**: Atualizado CORS para aceitar domínios de produção

## Próximos Passos

1. Criar arquivo `.env` no backend com as variáveis necessárias
2. Criar arquivo `.env` no frontend com as URLs de produção
3. Fazer deploy das alterações
4. Testar conexão WebSocket em produção
