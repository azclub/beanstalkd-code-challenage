'use strict';

const winston = require('winston');
const CloudWatchTransport = require('winston-cloudwatch');

new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			timestamp: true,
			colorize: true,
		})
	]
});

if (process.env.CLOUDWATCH_ACCESS_KEY_ID && 
	process.env.CLOUDWATCH_SECRET_ACCESS_KEY &&
	process.env.CLOUDWATCH_REGION) {
	winston.info('log to cloudfront');
	const CloudWatchConfig = {
		logGroupName: 'aftership',
		logStreamName: 'worker',
		awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
		awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
		awsRegion: process.env.CLOUDWATCH_REGION,
	}

	winston.add(CloudWatchTransport, CloudWatchConfig);
}

module.exports = winston;
