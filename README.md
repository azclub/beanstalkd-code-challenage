# Currency Scraper
## Setup
1. Install dependencies
```
npm install
```

2. Setup mongoDB and run locally with this command
https://docs.mongodb.com/manual/installation/
```
mongod
```

3. Setup beanstalk and run locally with this command
http://kr.github.io/beanstalkd/download.html
```
beanstalk
```

4. Setup config
```
cp config.js.example config.js

# Edit config.js to setup the access credential to exchange rate API
# Instruction are documented in config.js
```

5. Seed job into tube
The seed will push a job converting `EUR` to `USD` for testing.
```
npm run seed
```

6. Start worker
Run worker to start reserving jobs from the tube
```
npm run work
```

## Test
```
npm run test
```

## TODOs
1. Write integration test for read/write operation to mongoDB.
2. Setup CI pipeline to ensure new changes doesn't break the test.
3. Dockerize the setup so we don't need to install beanstalkd and mongodb on host for testing.