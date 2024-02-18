FROM node:current-alpine3.17

WORKDIR /home/cycclon/Projects/rioja-recursos/backend/recursos

COPY . /home/cycclon/Projects/rioja-recursos/backend/recursos

RUN npm install

EXPOSE 3003

CMD npm run Start