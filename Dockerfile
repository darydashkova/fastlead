FROM node:14.0 as build-stage
WORKDIR /fastlead
ARG VUE_APP_API_URL
ARG VUE_APP_SOCKET_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
ENV VUE_APP_SOCKET_URL=$VUE_APP_SOCKET_URL
COPY . .
RUN npm install
RUN npm run build

FROM ubuntu:20.04 as prod-stage
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt update && apt install apache2 -y
RUN rm -rf /var/www/html/*
RUN rm -rf /etc/apache2/apache2.conf
RUN mkdir /etc/apache2/certs
COPY --from=build-stage /fastlead/apache/apache2.conf /etc/apache2/apache2.conf
COPY --from=build-stage /fastlead/apache/ssl/* /etc/apache2/certs/
RUN a2enmod rewrite
RUN service apache2 restart
COPY --from=build-stage /fastlead/dist /var/www/html
CMD ["/usr/sbin/apachectl","-D","FOREGROUND"]