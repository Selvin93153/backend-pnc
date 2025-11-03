# =========================
# Etapa 1: Construcción
# =========================
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Compilar el proyecto NestJS
RUN npm run build


# =========================
# Etapa 2: Ejecución
# =========================
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo lo necesario desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Definir el puerto que usará la app
EXPOSE 3000

# Variables de entorno opcionales (Render las puede sobrescribir)
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "dist/main.js"]
