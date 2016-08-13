'use strict';

const gulp        = require('gulp');
const rollup      = require('rollup-stream');
const srcmaps     = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const rename      = require('gulp-rename');
const livereload  = require('gulp-livereload');

module.exports = () => {

  gulp.task( 'build', [ 'build-min' ] );

  gulp.task( 'build-full', () => {
    return rollup({
      entry: 'src/js/main.js', format: 'iife', sourceMap: true
    })
    .pipe( source( 'main.js', './src' ) )
    .pipe( buffer() )
    .pipe( srcmaps.init({ loadMaps: true }) )
    .pipe( srcmaps.write( './' ) )
    .pipe( gulp.dest('./dist') )
    .pipe( livereload({}) );;
  });

  gulp.task( 'build-min', [ 'build-full' ], () => {
    return gulp.src('./dist/main.js')
      .pipe( uglify() )
      .pipe( rename('main.min.js') )
      .pipe( gulp.dest('./dist') );
  });
};
