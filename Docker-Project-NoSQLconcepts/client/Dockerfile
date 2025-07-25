# Basis-Image
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Paketdateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Restliche Dateien kopieren
COPY . .

# React-Entwicklungsserver soll auf 0.0.0.0 lauschen, nicht localhost!
ENV HOST 0.0.0.0
ENV PORT 3000

# Exponiere Port 3000
EXPOSE 3000

# Startbefehl
CMD ["npm", "start"]

