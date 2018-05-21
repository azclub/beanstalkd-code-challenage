'use strict';

const Logger = require('./logger');
const ExchangeRate = require('./exchange_rate');
const {Consumer} = require('bsw');

class Worker {
	static client(config, handler) {
		(async () => {
			const connection = new Consumer({
				host: config.bs.host,
				port: config.bs.port,
				tube: config.bs.tube,
				handler: handler
			});

			connection.on('error', (err) => {
				Logger.error(`Worker ${config.bs.tube}: ${err}`);
			});

			await connection.start();
		})();
	}

	static async process(currency, config) {
		if (typeof currency !== 'string' || !currency.match(/^[A-Z]{3}\|[A-Z]{3}$/)) {
			return 'bury';
		}

		try {
			const record = await ExchangeRate.read(currency, config);
			if (record.success >= config.exchange.successLimit) {
				Logger.info(`Worker stop job schedule for currency(${currency}): success rate reatched`);
				return 'success';
			}

			if (record.failed >= config.exchange.failLimit) {
				Logger.info(`Worker stop job schedule for currency(${currency}): failed rate reatched`);
				return 'bury';
			}

			const rate = await new ExchangeRate(currency, config).rate();
			await ExchangeRate.save(currency, rate, config);
			if (rate === '-1') {
				return ['release', config.exchange.failDelaySec];
			}
			return ['release', config.exchange.successDelaySec];
		} catch (err) {
			Logger.error(err);
			return ['release', config.exchange.failDelaySec];
		}
	}

	static start(config) {
		Worker.client(config, async (currency, _job_info) => {
			Logger.info(`Worker: start process ${currency}`);
			return Worker.process(currency, config);
		});
	}
}

module.exports = Worker;

// Worker.process(config.bs.host, config.bs.port, config.bs.tube);
