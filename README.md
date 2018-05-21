# Currency Scraper
## Start Worker Locally
1. Install [Docker](https://docs.docker.com/install/). If you are using Linux, install [Docker Compose](https://docs.docker.com/compose/install/) from a separate package.

2. Get API key in https://fixer.io/signup/free. Duringthe free trial, you can get exchange rate from EUR to one of the followings: USD, AUD, CAD, PLN, MXN. Then export the key as environment variable.
```
export EXCHANGE_API_KEY=apiKey
```

3. Start beanstalk, MongoDB, and worker in docker.
```
make start
```

## Deploy Worker to AWS
1. Create a role on AWS with write access to `aftership` log group on CloudFront.
2. Replace ENV variables after `-e` flag in this bootstrap script.
3. Paste the bootstrap script in `user data` field when creating a EC2 instance.
4. Worker reserve jobs from specified queue when the instace is live.

```
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo docker pull helenyfung/aftership_worker

docker run \
-e CLOUDWATCH_ACCESS_KEY_ID=_CLOUDWATCH_ACCESS_KEY_ID_ \
-e CLOUDWATCH_SECRET_ACCESS_KEY=_CLOUDWATCH_SECRET_ACCESS_KEY_ \
-e CLOUDWATCH_REGION=_CLOUDWATCH_REGION_ \
-e EXCHANGE_API_KEY=_EXCHANGE_API_KEY_ \
-e MONGODB_URI=_MONGODB_URI_ \
-e BEANSTALKD_HOST=challenge.aftership.net \
-e BEANSTALKD_PORT=_BEANSTALKD_PORT_ \
-e BEANSTALKD_TUBE=_BEANSTALKD_TUBE_ \
--name worker helenyfung/aftership_worker
```

## Other Commands
- Use `make clean` to clean up containers.
- Use `make seed` to seed a job into the tube.
- Use `make update` to build and push docker image to dockerhub.
- Use `make mongodb` to access MongoDB for debugging.
- Use `npm run test` to run lint and unit test.

## TODOs
1. Write integration test for read/write operation to MongoDB.
2. Setup CI pipeline to ensure new changes doesn't break the test.