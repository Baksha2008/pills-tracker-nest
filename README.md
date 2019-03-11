## Description

This app create with [Nest.js](https://nestjs.com/) framework.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Dockerfile commands

FROM - The base image to use in the build. This is mandatory and must be the first command in the file.

COPY - Adds files from your Docker client’s current directory.

RUN - Executes a command and save the result as a new layer

WORKDIR - Set the default working directory for the container

EXPOSE - Opens a port for linked containers

CMD - The command that runs when the container starts

## Docker commands

Build container

```bash
docker build -t ${CONTAINER_NAME} .
```

Start container

```bash
docker run -p ${PORT} ${CONTAINER_NAME}
```

## Heroku commands

Read more here about [Heroku](https://devcenter.heroku.com/articles/heroku-cli)

Login to the registry:

```bash
heroku container:login
```

Create a Heroku app:

```bash
heroku create

#That command will return an app name, copy it to  use it for the next command.
```

```bash
heroku container:push web --app ${YOUR_APP_NAME}
```

And realase

```bash
heroku container:release web  --app ${YOUR_APP_NAME}
```

## Important

Dockerfile must be capitalized!
