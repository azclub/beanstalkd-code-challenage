'use strict';

const nock = require('nock');

module.exports = {
	stubExchangeAPIResponse: (status) => {
		let body = {'success': false};
		if (status === 200) {
			body = {
				'success': true,
				'timestamp': 1526393827,
				'base': 'ABC',
				'date': '2018-05-15',
				'rates': {'DEF': 1.184782}
			};
		}

		nock('http://data.fixer.io')
			.get('/api/latest?access_key=key&base=ABC&symbols=DEF')
			.reply(status, body);
	},
	config: {
		bs: {
			host: 'test_host',
			port: 'test_port',
			tube: 'test_tube'
		},
		mongodb: 'mongodb://127.0.0.1:27017/exchange_rate',
		exchange: {
			apiKey: 'key',
			successLimit: 10,
			successDelaySec: 60,
			failLimit: 3,
			failDelaySec: 3
		}
	},
	currency: 'ABC|DEF'
};
