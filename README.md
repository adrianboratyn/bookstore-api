## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Building and testing Docker image
1. Clone repository

2. Build docker image to verify it working
```bash
$ docker build -t bookstore-api .
```

3. Run image to test it's working as expected and go to exposed port 8080
```bash
$ docker run -p 8080:3000 --env-file .env bookstore-api
```

You can always use curl or browser
```bash
$ curl -si http://localhost:8080
```

## Env configuration

```
#express
API_PORT=8080 (default 3000)
API_HOST=0.0.0.0 (default 0.0.0.0)
API_URL=http://localhost:3000 (default localhost)
```

```
#cors
CORS_ALLOWED_ORIGINS=* optional default (*) origin separated by "," 
```

```
#typeorm
TYPEORM_CONNECTION=mysql (required)
TYPEORM_HOST=localhost (required)
TYPEORM_USERNAME=user (required)
TYPEORM_PASSWORD=password (required)
TYPEORM_DATABASE=test (required)
TYPEORM_PORT=3306 (required)
TYPEORM_SYNCHRONIZE=false (optional default false)
TYPEORM_LOGGING=true (optional default false)
TYPEORM_MIGRATIONS=dist/migrations/*.js (value for migration scripts)
TYPEORM_MIGRATIONS_DIR=src/migrations (only for local development)
TYPEORM_ENTITIES=dist/lib/entities/*.entity.js (only for migrations)
DB_ROOT_PASSWORD=password (required)
```
