'use strict';

const taskPath = './tasks';
const gulp          = require('gulp');
const buildTasks    = require(`${ taskPath }/build.js`);
const cssTasks      = require(`${ taskPath }/css.js`);
const templateTasks = require(`${ taskPath }/template.js`);
const watchTasks    = require(`${ taskPath }/watch.js`);
const zipTasks      = require(`${ taskPath }/zip.js`);

const allTasks = [
  buildTasks.build,
  cssTasks.css,
  templateTasks.template,
  zipTasks.zip,
  zipTasks.report
];

exports.default = gulp.series(...allTasks);
