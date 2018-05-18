# Currency Scraper
## Start Worker
1. Install Docker. If you are using Linux, install Docker Compose from a sepearte package.
https://docs.docker.com/install/
https://docs.docker.com/compose/install/

2. Run Containers
```
# Get API key in https://fixer.io/signup/free
# You can get exchance rate from 'EUR' to one of the followings during free trial.
# [USD', 'AUD', 'CAD', 'PLN', 'MXN']
export EXCHANGE_API_KEY=apiKey

# Start beanstalk, mongodb and worker in docker
make start 
```

## Other Commands
- Use `make clean` to clean up containers.
- Use `make seed` to seed a job into the tube.
- Use `make mongodb` to access mongodb for debuging.
- Use `npm run test` to run lint and unit test.

## TODOs
1. Write integration test for read/write operation to mongoDB.
2. Setup CI pipeline to ensure new changes doesn't break the test.