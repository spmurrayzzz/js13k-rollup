const gulp      = require('gulp');
const zip       = require('gulp-zip');
const rename    = require('gulp-rename');

module.exports = () => {
  gulp.task( 'zip', [ 'build', 'template' ], () => {
    return gulp.src('./dist/index.min.html')
      .pipe( rename('index.html') )
      .pipe( zip('game.zip') )
      .pipe( gulp.dest('dist') );
  });
};
