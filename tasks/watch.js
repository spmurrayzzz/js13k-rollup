'use strict';

const gulp = require('gulp');
const livereload  = require('gulp-livereload');

module.exports = () => {
  gulp.task( 'watch', () => {
    livereload.listen();
    return gulp.watch(
      [ 'src/js/**/*.js', 'src/css/**/*.css', 'src/index.hbs' ],
      [ 'build', 'css', 'template', 'zip', 'report' ]
    );
  });
};
