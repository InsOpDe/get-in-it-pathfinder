FROM node:11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .


RUN npm run build

ENTRYPOINT ["node", "/usr/src/app/dist/app.js"]
