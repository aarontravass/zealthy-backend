FROM node:18-alpine

RUN corepack enable

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY package*.json /app/

RUN pnpm i

COPY . /app/

RUN pnpm generate

EXPOSE $PORT
# default is not working so i won't try to fix it
CMD pnpm dev