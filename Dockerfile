FROM node:alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

COPY . /home/node/app

RUN yarn install
RUN chown -R node /home/node/app

USER node

# CMD [ "npm", "start" ]
CMD ["yarn", "start:dev"]
EXPOSE 3000

# Install development packages if NODE_ENV is set to "development"
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" == "development" ]; then yarn install ; fi
