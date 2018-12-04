# open-api-3-boilerplate
Boilerplate for API Specification, using Open API 3.0 &amp; Swagger UI

## Prerequisites
You need to have [docker](https://docs.docker.com/install/) installed and running, as it uses docker for swagger ui

## Install
Installs required packages and downloads [swaggerapi/swagger-ui](https://hub.docker.com/r/swaggerapi/swagger-ui/)

```
$ npm install
```

## Usage
Starts up dev mode and swagger ui, watches files for changes
```
$ npm run dev
```

Generates `swagger.json` file in main project directory
```
$ npm run build
```

Spins up swagger ui in a docker container
```
$ npm run docker
```