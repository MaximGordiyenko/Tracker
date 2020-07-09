# Tracker
NodeJs app that track delivery 

## How to start with Docker:
1.1. Download and Run Docker application on Laptop.
1.2. Create dockerfile use terminal's command:
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
1.4. Open the Terminal and run this command:
```
#Docker make image of your system with all dependencies 
docker build .
```
1.5. In order to Docker image run this command:
```
#Where's: "-t" means shorthand of --tty and "i" means shorthand of interactive 
docker run -ti ed2173fd18e9 /bin/bash
```
1.6. Create docker-compose:
```
#echo docker-compose.yml
```
1.7. Add content:
```
  mongo:
    image: mongo:4.2
    restart: always
    container_name: mongo-test
    environment:
    - MONGO_DATA_DIR:"/data/db"
    - MONGO_LOG_DIR:"/var/log"
    - MONGO_INITDB_DATABASE:"test"
    - MONGO_INITDB_ROOT_USERNAME:"root"
    - MONGO_INITDB_ROOT_PASSWORD:"test"
    ports:
    - "27017:27017"
    volumes:
    - ./data:/data/db
```
1.8. Then run command:
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

