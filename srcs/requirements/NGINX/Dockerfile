FROM debian:bullseye

RUN apt-get update
RUN apt-get upgrade -y
RUN	apt-get install -y nginx openssl
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -out /etc/ssl/server.crt -keyout /etc/ssl/server.key -subj "/C=FR/ST=IDF/L=PARIS/O=42/OU=42/CN=aselnet.42.fr/UID=aselnet"
RUN mkdir -p /var/run/nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY html /var/www/html

RUN mkdir -p /var/www/html
RUN chown -R www-data:www-data /var/www/html
RUN chmod 777 /var/www/html
RUN chown -R www-data:www-data /etc/nginx
RUN chmod 777 /etc/nginx

CMD ["nginx", "-g", "daemon off;"]