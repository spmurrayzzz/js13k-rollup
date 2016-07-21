'use strict';

const gulp        = require('gulp');
const livereload  = require('gulp-livereload');

livereload.listen();

// Bootstrap individual task files
[ 'build', 'css', 'template', 'watch', 'zip' ]
  .forEach( task => require(`./tasks/${ task }`)() );

gulp.task( 'default', [ 'build', 'css', 'template', 'zip' ] );
