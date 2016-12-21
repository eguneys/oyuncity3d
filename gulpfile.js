var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var bulkify = require('bulkify');
var csso = require('gulp-csso');

var livereload = require('gulp-livereload');

var sources = ['./src/main.js'];
var destination = './build';
var onError = function(error) {
  gutil.log(gutil.colors.red(error.message));
};

var standalone = 'Gulpp';

gulp.task('lint', function() {
  return gulp.src(sources)
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
});

gulp.task('dev', ['assets'], function() {
  var opts = watchify.args;
  opts.debug = true;
  opts.standalone = standalone;
  opts.insertGlobalVars = {
    THREE: function(file, dir) {
      return "require('three')";
    }
  };
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
      .pipe(gulp.dest(destination))
      .pipe(livereload());
  }

  livereload.listen();

  return rebundle();
});

gulp.task('assets', function() {
  var assetFiles = './assets/**/*';
  var path = require('path');
  gulp.src(assetFiles)
    .pipe(gulp.dest(path.join(destination)));
});

gulp.task('css', function() {
  var cssFiles = 'assets/*.css';

  return gulp.src(cssFiles)
    .pipe(csso())
    .pipe(gulp.dest(destination));
});

gulp.task('prod', ['css'], function() {
  return browserify(sources, {
    standalone: standalone
  }).transform('babelify',
               { presets: ["es2015"],
                 plugins: ['add-module-exports'] })
    .bundle()
    .on('error', onError)
    .pipe(source('gulpp.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(destination));
});

gulp.task('default', ['dev']);
