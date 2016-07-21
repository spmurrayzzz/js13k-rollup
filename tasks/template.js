'use strict';

const gulp        = require('gulp');
const handlebars  = require('handlebars');
const fs          = require('fs');
const srcmaps     = require('gulp-sourcemaps');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');

function getJS() {
  return readFile('./dist/main.min.js');
}

function getCSS() {
  return readFile('./dist/main.css');
}

function writeFile( fname, data ) {
  return new Promise(( resolve, reject ) => {
    fs.writeFile( fname, data, err => {
      if ( err ) {
        return reject( err );
      }
      resolve();
    });
  });
}

function readFile( fname ) {
  return new Promise(( resolve, reject ) => {
    fs.readFile( fname, ( err, data ) => {
      if ( err ) {
        return reject( err );
      }
      resolve( data.toString('utf8') );
    });
  });
}

module.exports = () => {
  gulp.task( 'template', [ 'build', 'css' ], done => {
    let ctx = {};

    getJS()
    .then( js => ctx.js = js )
    .then( () => getCSS() )
    .then( css => ctx.css = css )
    .then( () => readFile( './src/index.hbs') )
    .then( str => {
      // Inline/minified index file
      let inlineResult = handlebars.compile( str )
        ({ js: ctx.js, css: ctx.css });

      writeFile( './dist/index.min.html', inlineResult )
      .then( () => {
        // development index file
        let result = handlebars.compile( str )();
        return writeFile( './dist/index.html', result )
      })
      .then( done );
      
    });

  });
};
