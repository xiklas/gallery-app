# Verwende ein offizielles Node.js-Image als Basis
FROM node:18 AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den gesamten Rest der Anwendung
COPY . .

# Baue die React-Anwendung für die Produktion
RUN npm run build

# Verwende ein leichtgewichtiges Nginx-Image für die Produktion
FROM nginx:alpine

# Kopiere die Build-Ausgabe von der vorherigen Stage
COPY --from=build /app/build /usr/share/nginx/html

# Exponiere Port 80
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
