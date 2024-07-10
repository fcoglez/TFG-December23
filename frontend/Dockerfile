FROM nginx:alpine
VOLUME /tmp
RUN rm -rf /usr/share/nginx/html/*
# Directorio donde se guarda el código build
ARG DIST=dist/fronted
# El fichero que configura nginx
ARG CONFIG_FILE=nginx/nginx.conf
COPY ${CONFIG_FILE} /etc/nginx/nginx.conf
COPY ${DIST} /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
