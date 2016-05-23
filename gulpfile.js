var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var sources = ['./src/main.js'];
var destination = './build';
var onError = function(error) {
  gutil.log(gutil.colors.red(error.message));
};

var standalone = 'Gulpp';

gulp.task('dev', function() {
  var opts = watchify.args;
  opts.debug = true;
  opts.standalone = standalone;
  var bundleStream = watchify(browserify(sources, opts))
      .transform('babelify',
                 { presets: ["es2015"],
                   plugins: ['add-module-exports'] })
      .on('update', rebundle)
      .on('log', gutil.log);

  function rebundle() {
    return bundleStream.bundle()
      .on('error', onError)
      .pipe(source('gulpp.js'))
      .pipe(gulp.dest(destination));
  }

  return rebundle();
});

gulp.task('assets', function() {
  var assetFiles = './assets/**/*';
  var path = require('path');
  gulp.src(assetFiles)
    .pipe(gulp.dest(path.join(destination)));
});

gulp.task('default', ['dev']);
