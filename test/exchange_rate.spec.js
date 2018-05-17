/* eslint-env mocha */

'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const {config, currency, stubExchangeAPIResponse} = require('./test_helpers');
const ExchangeRate = require('../libs/exchange_rate');

describe('rate', () => {
	it('should be 2 decimals', () => {
		stubExchangeAPIResponse(200);
		const exchangeRate = new ExchangeRate(currency, config);
		return exchangeRate.rate().should.eventually.equal('1.18');
	});

	it('should be string', () => {
		stubExchangeAPIResponse(200);
		const exchangeRate = new ExchangeRate(currency, config);
		return exchangeRate.rate().should.eventually.be.a('string');
	});

	it('should return -1 on error', () => {
		stubExchangeAPIResponse(500);
		const exchangeRate = new ExchangeRate(currency, config);
		return exchangeRate.rate().should.eventually.equal('-1');
	});
});
