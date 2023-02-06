FROM node:18.12.1
WORKDIR /usr/src/app

RUN corepack enable
RUN corepack prepare yarn@stable --activate
RUN corepack prepare pnpm@stable --activate

# copy code
COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
