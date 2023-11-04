# Define la imagen base que se utilizará, por ejemplo, la última versión de Node.js
FROM node:latest AS stage

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json a /app
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

RUN npm install -g @ionic/cli
# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . /app/

# Expone el puerto en el que la aplicación escuchará 
EXPOSE 8100
EXPOSE 8101

# Comando para iniciar la aplicación Ionic
CMD [ "ionic", "serve" , "--host" , "0.0.0.0"  , "--port" , "8100"]
