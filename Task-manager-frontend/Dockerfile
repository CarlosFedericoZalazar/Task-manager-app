FROM nginx:alpine

# Copiamos el contenido estático del frontend a la carpeta por defecto de Nginx
COPY . /usr/share/nginx/html

# Eliminamos el Dockerfile y .dockerignore de la imagen final para mantenerla limpia
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]