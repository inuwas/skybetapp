FROM sbgfeedme/provider
# WORKDIR /app
# ADD . /app
EXPOSE 8181
CMD [ "npm", "start" ]