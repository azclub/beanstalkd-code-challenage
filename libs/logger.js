'use strict';

const {createLogger, format, transports} = require('winston');

const Logger = createLogger({
	format: format.combine(
		format.splat(),
		format.simple()
	),
	transports: [
		new transports.Console(),
		new transports.File({filename: 'log/error.log', level: 'error'}),
		new transports.File({filename: 'log/info.log', level: 'info'})
	]
});

module.exports = Logger;
