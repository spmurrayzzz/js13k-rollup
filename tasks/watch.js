'use strict';

const gulp = require('gulp');
const livereload  = require('gulp-livereload');

function watch() {
  livereload.listen();
  return gulp.watch(
    [ 'src/js/**/*.js', 'src/css/**/*.css', 'src/index.hbs' ],
    [ 'build', 'css', 'template', 'zip', 'report' ]
  );
}

exports.watch = watch;
