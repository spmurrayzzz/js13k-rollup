const gulp      = require('gulp');
const zip       = require('gulp-zip');
const rename    = require('gulp-rename');
const util      = require('gulp-util');
const fs        = require('fs');

module.exports = () => {
  gulp.task( 'zip', [ 'build', 'template' ], () => {
    return gulp.src('./dist/index.min.html')
      .pipe( rename('index.html') )
      .pipe( zip('game.zip') )
      .pipe( gulp.dest('dist') );
  });

  gulp.task( 'report', [ 'zip' ], done => {
    fs.stat( './dist/game.zip', ( err, data ) => {
      if ( err ) {
        return done( err );
      }
      util.log(
        util.colors.yellow.bold(`Current game size: ${ data.size } bytes`)
      );
      done();
    });
  });
};
