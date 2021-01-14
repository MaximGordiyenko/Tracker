# Tracker
NodeJs app that track delivery.

#### Links:
[GitHub Pages](https://pages.github.com/tracker)

[Heroku](https://)

##### How to start with Docker:
1.1. Download and `Run Docker` application on Laptop.

Download: [Docker](https://docs.docker.com/docker-for-windows/install/)

1.2. In root directory create dockerfile use terminal's command:
```
echo Dockerfile
```
1.3. Add to Dockerfile follow content:
```
FROM node:12
WORKDIR /app
COPY package*.json /app/
RUN cd /app && npm install yarn && ./node_modules/yarn/bin/yarn install
COPY src /app/src/
COPY README.md /app/
COPY .env /app/
EXPOSE 4000
CMD ["npm", "start"]
```
###### EXPLAIN:

FROM node:12
> A told docker to takes nodeJS image pointed virsion or latest

WORKDIR /app
> Place where is hold image

COPY package*.json /app/
> Copy all dependencies work with

RUN cd /app && npm install yarn && ./node_modules/yarn/bin/yarn install
> Use command to run project

COPY src /app/src/                                          
COPY README.md /app/
> ?

EXPOSE 4000
> ?

CMD ["npm", "start"]
> ?

1.4. Open the Terminal from root directory and run this command:
###### Docker make image of your system with all dependencies 
```
docker build -t tracker:node .
```
> repository name: tracker

> tag name: node



1.5. In order to 🚀 run docker image use command: ?????????????????
###### Where's: "-t" means shorthand of --tty and "i" means shorthand of interactive 
```
docker run -ti ed2173fd18e9 /bin/bash
```



1.6. 🏗 Create docker-compose:
```
echo docker-compose.yml
```

1.7. Add content:
```
 version: "3.8"
 services:
   
   tracker:
     build:
       context: .
       dockerfile: Dockerfile
     image: node:12
     container_name: node-container
     ports:
       - "4000:4000"
   
   db:
     image: mongo:4.2
     container_name: mongo-container
     environment:
       - MONGO_DATA_DIR:"/data/db"
       - MONGO_INITDB_DATABASE:"test"
       - MONGO_INITDB_ROOT_USERNAME:"root"
       - MONGO_INITDB_ROOT_PASSWORD:"test"
     volumes:
       - ./data:/data/db
     ports:
       - "27017:27017"
 
 volumes:
   db-data:
```
###### EXPLAIN: 
version: "3.8"
> Compose file buid on this version

services
> Compose going to use services bellow ↓:

tracker
> ?

1.8. Then run command:
###### Make build:
```
docker-compose up
```
1.9. Open new tab in terminal and use command:
```
#needs to run node server that builded early
#where --network is brige between node and mongo
docker run -p 4000:4000 --network="tracker_default" -it tracker
```
1.10. In order to stop Docker use command: 
```
#Between "< >" input image ID or name
docker stop <image_ID> 
```

1.11. In order to stop container use command: 
```
ctrl + C
```
