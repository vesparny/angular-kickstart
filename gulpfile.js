'use strict';
https://github.com/StarterSquad/ngseed
https://github.com/driftyco/gulp-angular-seed
vimeo tj

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
var fs = require('fs');
var url = require('url');
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

// Run e2e tests using protractor.
// Make sure server task is running.
gulp.task('protractor', ['webdriver:update'], function() {
  return gulp.src("webapp/test/e2e/**/*.scenario.js")
    .pipe(plugins.protractor.protractor({
      configFile: "build/protractor.config.js"
    }))
    .on('error', function(e) {
      throw e
    });
});

gulp.task('webdriver:update', webdriverUpdate);

// Run webdriver standalone server indefinitely.
// Usually not required.
gulp.task('webdriver:standalone', ['webdriver:update'], webdriverStandalone);
/**
 * Run test once and exit
 */
gulp.task('test:unit', ["generated"], function(done) {
  karma.start(_.assign({}, karmaConfig, {
    singleRun: true
  }), done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function(done) {
  karma.start(karmaConfig, done);
});
// Lint JavaScript
gulp.task('jshint', function() {
  return gulp.src("webapp/src/**/*.js")
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('webapp/assets/images/**')
    .pipe(plugins.cache(plugins.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/dist/assets/images'))
    .pipe(plugins.size({
      title: 'images'
    }));
});

gulp.task('templates', function() {
  return gulp.src(config.tpl)
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
    .on('error', $.notify.onError())
    .pipe(gulp.dest(config.tmp))
    .pipe($.size({
      title: 'scss'
    }));
});

gulp.task('serve', ['templates', 'scss'], function() {
  browserSync({
    notify: false,
    server: ['build', 'client']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});


gulp.task('build', ['clean'], function(cb) {
  runSequence(['scss', 'copy', 'templates'], 'html', cb);
});

gulp.task('serve:dist', function() {
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
    .pipe($.if('**/*main.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify({
      mangle: false
    })))
    .pipe($.if('*.css', $.csso()))
    .pipe($.if(['**/*main.js', '**/*main.css'], $.header(banner, {
      pkg: pkg
    })))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.minifyHtml({
      empty: true
    })))
    .pipe(gulp.dest(config.dist))
    .pipe($.size({
      title: 'html'
    }));
});

gulp.task('copy', function() {
  return gulp.src([
      'client/assets/*'
    ], {
      dot: true
    }).pipe(gulp.dest(config.dist + '/assets'))
    .pipe($.size({
      title: 'copy'
    }));
});

gulp.task('clean', del.bind(null, [config.dist, config.tmp]));
