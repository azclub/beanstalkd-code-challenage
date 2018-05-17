'use strict';

const Logger = require('./logger');
const {Producer} = require('bsw');

class Publisher {
	static pushJob(config, payload = 'EUR|USD') {
		(async () => {
			const connection = new Producer({
				host: config.bs.host,
				port: config.bs.port,
				tube: config.bs.tube
			});
			connection.on('error', (err) => {
				Logger.log('error', `Producer ${config.bs.tube}: ${err}`);
			});

			await connection.start();

			await connection.putJob({
				payload: payload,
				priority: 0,
				delay: 0,
				ttr: 60
			});

			Logger.log('info', `PutJob - tube: ${config.bs.tube} payload: ${payload}`);

			connection.stop();
		})();
	}
}

module.exports = Publisher;
