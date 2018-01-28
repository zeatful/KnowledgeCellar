FROM node:9.4

COPY . /usr

WORKDIR /usr/src/app

EXPOSE 3000

# Ensure new dependencies are installed every start
ENTRYPOINT yarn install && yarn start