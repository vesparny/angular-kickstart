'use strict';
//https://github.com/StarterSquad/ngseed/blob/develop/Gulpfile.js
//https://github.com/google/web-starter-kit/blob/master/gulpfile.js
//https://github.com/Granze/applause/blob/master/package.json
//https://github.com/samora/ng-launchpad/blob/master/Gulpfile.js

var config = require('./build/build.config.js');
var karmaConfig = require('./build/karma.config.js');
var protractorConfig = require('./build/protractor.config.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pkg = require('./package');
var karma = require('karma').server;
var del = require('del');
var _ = require('lodash');
/* jshint camelcase:false*/
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

// Run e2e tests using protractor.
// Make sure server task is running.
gulp.task('e2e', ['webdriver:update'], function() {
  return gulp.src(protractorConfig.config.specs)
    .pipe($.protractor.protractor({
      configFile: 'build/protractor.config.js'
    }))
    .on('error', function(e) {
      throw e;
    });
});

gulp.task('webdriver:update', webdriverUpdate);


/**
 * Run test once and exit
 */
gulp.task('unit', ['build'], function(cb) {
  karma.start(_.assign({}, karmaConfig, {
    singleRun: true
  }), cb);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('unit:tdd', function(cb) {
  karma.start(_.assign({}, karmaConfig, {
    singleRun: false,
    action:'watch',
    browsers: ['PhantomJS']
  }), cb);
});

gulp.task('tdd', function(cb) {
  runSequence(['serve', 'unit:tdd']);
});


// Optimize Images
gulp.task('images', function() {
  return gulp.src(config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dist + '/assets/images'))
    .pipe($.size({
      title: 'images'
    }));
});

gulp.task('templates', function() {
  return gulp.src(config.tpl)
    .pipe($.changed(config.tmp))
    .pipe($.html2js({
      outputModuleName: 'templates',
      base: 'client',
      useStrict: true
    }))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(config.tmp))
    .pipe($.size({
      title: 'templates'
    }));
});

gulp.task('scss', function() {
  return gulp.src(config.mainScss)
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(config.tmp))
    .pipe($.size({
      title: 'scss'
    }));
});

gulp.task('serve', ['build'], function() {
  browserSync({
    notify: false,
    logPrefix: pkg.name,
    server: ['build', 'client']
  });


  gulp.watch(config.html, reload);
  gulp.watch(config.scss, ['scss', reload]);
  gulp.watch([config.js, 'gulpfile.js'], ['jshint']);
  gulp.watch(config.tpl, ['templates', reload]);
  gulp.watch(config.assets, reload);
});

gulp.task('build:dist', ['clean'], function(cb) {
  runSequence(['jshint', 'build', 'copy', 'images'], 'html', cb);
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(['scss', 'templates'], cb);
});

gulp.task('serve:dist', ['build:dist'], function() {
  browserSync({
    notify: false,
    server: [config.dist]
  });
});


gulp.task('html', function() {
  var assets = $.useref.assets({
    searchPath: '{build,client}'
  });

  return gulp.src(config.index)
    .pipe(assets)
    .pipe($.sourcemaps.init())
    .pipe($.if('**/*main.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify({
      mangle: false,
    })))
    .pipe($.if('*.css', $.csso()))
    .pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, {
      pkg: pkg
    })))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.minifyHtml({
      empty: true
    })))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.dist))
    .pipe($.size({
      title: 'html'
    }));
});

gulp.task('copy', function() {
  return gulp.src(config.assets, {
      dot: true
    }).pipe(gulp.dest(config.dist + '/assets'))
    .pipe($.size({
      title: 'copy'
    }));
});

gulp.task('clean', del.bind(null, [config.dist, config.tmp]));

gulp.task('default', ['serve']);

gulp.task('jshint', function() {
  return gulp.src([config.js, 'gulpfile.js'])
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});
