# Etapa 1: Construção (Build)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Instala dependências (usando ci para ser mais rápido e seguro)
RUN npm ci
COPY . .
# Cria a versão de produção
RUN npm run build

# Etapa 2: Execução (Produção Leve)
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Cria um usuário para não rodar como root (segurança)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas o necessário do build anterior
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Configura permissão para salvar fotos (Ajuste a pasta conforme seu código)
# Exemplo: se seu código salva em ./public/uploads
RUN mkdir -p ./public/photos && chown nextjs:nodejs ./public/photos

USER nextjs

# Porta padrão do Next
EXPOSE 3000

# Limita a memória do Node para não estourar o servidor (400MB)
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
