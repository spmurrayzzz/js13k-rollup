'use strict';

const gulp = require('gulp');

module.exports = () => {
  gulp.task( 'watch', () => {
    return gulp.watch(
      [ 'src/js/**/*.js', 'src/css/**/*.css', 'src/index.hbs' ],
      [ 'build', 'css', 'template', 'zip' ]
    );
  });
};
