FROM httpd:2.4.54-alpine3.16

WORKDIR /usr/local/apache2/htdocs/

COPY . /usr/local/apache2/htdocs/

