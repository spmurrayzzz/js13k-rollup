'use strict';

const gulp        = require('gulp');
const rollup      = require('rollup-stream');
const srcmaps     = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const rename      = require('gulp-rename');
const livereload  = require('gulp-livereload');
const util        = require('gulp-util');

function onError( err, pipeline ) {
  util.log( util.colors.red( `Error: ${ err.message }` ) );
  util.beep();
  pipeline.emit('end');
}

module.exports = () => {

  gulp.task( 'build', [ 'build-min' ] );

  gulp.task( 'build-full', () => {
    let pipeline;
    return pipeline = rollup({
      entry: 'src/js/main.js', format: 'iife', sourceMap: true
    })
    .on( 'error', err => onError( err, pipeline ) )
    .pipe( source( 'main.js', './src' ) )
    .pipe( buffer() )
    .pipe( srcmaps.init({ loadMaps: true }) )
    .pipe( srcmaps.write( './' ) )
    .pipe( gulp.dest('./dist') )
    .pipe( livereload({}) );
  });

  gulp.task( 'build-min', [ 'build-full' ], () => {
    let pipeline;
    return pipeline = gulp.src('./dist/main.js')
      .pipe( uglify() )
      .on( 'error', err => onError( err, pipeline ) )
      .pipe( rename('main.min.js') )
      .pipe( gulp.dest('./dist') );
  });
};
