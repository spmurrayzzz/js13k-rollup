'use strict';

const distTasks = require('./tasks/dist.js');
const watchTasks = require('./tasks/watch.js');

exports.default = distTasks.dist;
exports.watch = watchTasks.watch;
