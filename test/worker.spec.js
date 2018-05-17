/* eslint-env mocha */

'use strict';

const sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const Worker = require('../libs/worker');
const ExchangeRate = require('../libs/exchange_rate');

const {config, currency, stubExchangeAPIResponse} = require('./test_helpers');


describe('process job', () => {
	it('release suceesful job with 60 seconds delay', () => {
		stubExchangeAPIResponse(200);
		sinon.stub(ExchangeRate, 'read', () => {
			return {success: 0, failed: 0};
		});
		sinon.stub(ExchangeRate, 'save', () => {

		});

		Worker.process(currency, config).then((result) => {
			result[0].should.equal('release');
			result[0].should.be.a('string');
			result[1].should.equal(60);
			result[1].should.be.a('number');
		});

		ExchangeRate.read.restore();
		ExchangeRate.save.restore();
	});

	it('release failed job with 3 seconds delay', () => {
		stubExchangeAPIResponse(404);
		sinon.stub(ExchangeRate, 'read', () => {
			return {success: 0, failed: 0};
		});
		sinon.stub(ExchangeRate, 'save', () => {

		});

		Worker.process(currency, config).then((result) => {
			result[0].should.equal('release');
			result[0].should.be.a('string');
			result[1].should.equal(3);
			result[1].should.be.a('number');
		});

		ExchangeRate.read.restore();
		ExchangeRate.save.restore();
	});

	it('delete job on 10 success', () => {
		stubExchangeAPIResponse(200);
		sinon.stub(ExchangeRate, 'read', () => {
			return {success: 10, failed: 0};
		});
		sinon.stub(ExchangeRate, 'save', () => {

		});

		Worker.process(currency, config).should.eventually.equal('success');

		ExchangeRate.read.restore();
		ExchangeRate.save.restore();
	});

	it('bury job on 3 fail', () => {
		stubExchangeAPIResponse(404);
		sinon.stub(ExchangeRate, 'read', () => {
			return {success: 0, failed: 3};
		});
		sinon.stub(ExchangeRate, 'save', () => {

		});

		Worker.process(currency, config).should.eventually.equal('bury');

		ExchangeRate.read.restore();
		ExchangeRate.save.restore();
	});

	it('bury job when job body is invalid', () => {
		Worker.process('AAAA|BBB', config).should.eventually.equal('bury');
		Worker.process(3, config).should.eventually.equal('bury');
		Worker.process('{}', config).should.eventually.equal('bury');
	});
});
