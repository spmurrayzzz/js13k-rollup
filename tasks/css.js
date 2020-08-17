const gulp        = require('gulp');
const concat      = require('gulp-concat-css');
const clean       = require('gulp-clean-css');
const livereload  = require('gulp-livereload');

function css() {
  return gulp.src( [ 'src/css/reset.css', 'src/css/**/*.css' ] )
      .pipe( concat('main.css') )
      .pipe( clean({ compatibility: 'ie8' }) )
      .pipe( gulp.dest('./dist') )
      .pipe( livereload() );
}

exports.css = css;
