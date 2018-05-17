'use strict';

const config = require('../config');
const Publisher = require('../libs/publisher');

Publisher.pushJob(config, 'EUR|USD');
