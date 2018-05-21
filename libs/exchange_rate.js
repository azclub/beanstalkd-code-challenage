'use strict';

const Logger = require('./logger');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const ExchangeRateModel = require('../models/exchange_rate');

class ExchangeRate {
	constructor(currency, config) {
		this.currency = currency;
		this.config = config;
	}

	async rate() {
		try {
			const [from, to] = this.currency.split('|');
			const url = `http://data.fixer.io/api/latest?access_key=${this.config.exchange.apiKey}&base=${from}&symbols=${to}`;
			const response = await fetch(url);
			const responseText = await response.text();
			const body = JSON.parse(responseText);
			if (body.success && response.status === 200) {
				const rateFloat = body.rates[to];
				const rateString = parseFloat(rateFloat).toFixed(2).toString();
				this.rate = rateString;
				Logger.info(`ExchangeRate - ${this.currency}: ${this.rate}`);
				return this.rate;
			}
			return '-1';
		} catch (err) {
			Logger.error(`ExchangeRate get rate exception: ${err}`);
			return '-1';
		}
	}

	static async read(currency, config) {
		const retryTotal = {success: 0, failed: 0};
		try {
			mongoose.connect(config.mongodb);
			await ExchangeRateModel.find({currency: currency}, (err, records) => {
				return records.reduce((allRetry, record) => {
					const retry = allRetry;
					if (parseFloat(record.rate) > 0) {
						retry.success++;
					} else {
						retry.failed++;
					}
					return retry;
				}, retryTotal);
			});

			Logger.info(`${currency}: ${JSON.stringify(retryTotal)}`);

			mongoose.connection.close();

			return retryTotal;
		} catch (err) {
			Logger.error(err);
			mongoose.connection.close();
			return retryTotal;
		}
	}

	static async save(currency, rate, config) {
		try {
			mongoose.connect(config.mongodb);
			const entity = new ExchangeRateModel({
				_id: new mongoose.Types.ObjectId(),
				currency: currency,
				timestamp: new Date(),
				rate: rate
			});

			await entity.save();
			mongoose.connection.close();
		} catch (err) {
			Logger.error(err);
		}
	}
}

module.exports = ExchangeRate;
