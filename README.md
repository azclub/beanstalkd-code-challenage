# Currency Scraper
## Setup
1. Install dependencies
```
npm install
```

2. Setup config
```
cp config.js.example config.js
```

2. Setup beanstalk and run locally with this command
http://kr.github.io/beanstalkd/download.html
```
beanstalk
```

3. Seed the queue
The seed will push a job converting `EUR` to `USD`.
```
npm run seed
```

4. Start the worker
Spin up the worker to start taking jobs from the queue
```
npm run work
```


## Test
```
npm run test
```