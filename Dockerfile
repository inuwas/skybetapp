FROM ubuntu
  RUN gnome-terminal -e -e docker-compose up
  RUN gnome-terminal -e -e yarn add -g mongodb; mongod; use tcpdb; exit;
  RUN gnome-terminal -e yarn install
CMD [ "npm", "start" ]
