# Currency Scraper
## Start Worker
1. Install [Docker](https://docs.docker.com/install/). If you are using Linux, install [Docker Compose](https://docs.docker.com/compose/install/) from a separate package.

2. Get API key in https://fixer.io/signup/free. Duringthe free trial, you can get exchange rate from EUR to one of the followings: USD, AUD, CAD, PLN, MXN. Then export the key as environment variable.
```
export EXCHANGE_API_KEY=apiKey
```

3. Start beanstalk, MongoDB, and worker in docker.
```
make start
```

## Other Commands
- Use `make clean` to clean up containers.
- Use `make seed` to seed a job into the tube.
- Use `make mongodb` to access MongoDB for debugging.
- Use `npm run test` to run lint and unit test.

## TODOs
1. Write integration test for read/write operation to MongoDB.
2. Setup CI pipeline to ensure new changes doesn't break the test.