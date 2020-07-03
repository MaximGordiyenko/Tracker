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
# NodeJS verion in your project
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/
RUN cd /usr/src/app && npm install yarn && ./node_modules/yarn/bin/yarn install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY src /usr/src/app/src/
COPY README.md /usr/src/app/
COPY .env /usr/src/app/

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
1.6. Then run command:
```
npm run start
```
1.6. In order to stop Docker use command: 
```
#Between "< >" input image ID or name
docker stop <image_ID> 
```

