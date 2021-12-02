FROM node:14.0 as build-stage 
WORKDIR /fastlead 
COPY ./package.json . 
RUN npm install 
ARG VUE_APP_API_URL 
ARG VUE_APP_SOCKET_URL 
ARG VUE_APP_AMOCRM_ID 
ENV VUE_APP_API_URL=$VUE_APP_API_URL 
ENV VUE_APP_SOCKET_URL=$VUE_APP_SOCKET_URL 
ENV VUE_APP_AMOCRM_ID=$VUE_APP_AMOCRM_ID 
COPY . . 
RUN npm run build 
 
FROM httpd:latest as prod-stage 
COPY --from=build-stage /fastlead/dist /usr/local/apache2/htdocs 
COPY --from=build-stage /fastlead/apache/conf /usr/local/apache2/conf/httpd.conf