'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const exchangeRateSchema = new Schema({
	currency: {type: String, require: true, max: 7},
	timestamp: Date,
	rate: String
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
