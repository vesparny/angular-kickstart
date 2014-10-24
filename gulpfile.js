'use strict';

var config = require('./build/build.config.js');
var karmaConfig = require('./build/karma.config.js');
var protractorConfig = require('./build/protractor.config.js');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var pkg = require('./package');
var moment = require("moment");
var karma = require('karma').server;
var _ = require('lodash');
var fs = require('fs');
var url = require('url');
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
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


gulp.task('copy', ['copy:root', 'copy:assets']);
gulp.task('generated', ['html2js', 'scss']);

// Copy All Files At The Root Level (app)
gulp.task('copy:root', function() {
  return gulp.src([
      'webapp/*.*',
      '!webapp/*.html'
    ], {
      dot: true
    })
    .pipe(gulp.dest(config.distDir))
    .pipe(plugins.size({
      title: 'copy:root'
    }));
});

// Copy All Files At The Root Level (app)
gulp.task('copy:assets', function() {
  return gulp.src(['webapp/assets/**', '!webapp/assets/images'])
    .pipe(gulp.dest(config.distDir + "/assets"))
    .pipe(plugins.size({
      title: 'copy:assets'
    }));
});


gulp.task('html2js', function() {
  return gulp.src('webapp/src/**/*.tpl.html')
    .pipe(plugins.ngHtml2js({
      moduleName: "templates",
      prefix: "app/"
    }))
    .pipe(plugins.concat("templates.js"))
    .pipe(gulp.dest("webapp/tmp"));
});



gulp.task('html', function() {
  return gulp.src('webapp/*.html')
    .pipe(plugins.useref.assets())
    .pipe(plugins.if(/main.js/, plugins.ngAnnotate()))
    .pipe(plugins.if('*.js', plugins.uglify({
      mangle: false
    })))
    .pipe(plugins.if('*.css', plugins.csso()))

  .pipe(plugins.rev())
    .pipe(plugins.header(config.banner, {
      version: pkg.version,
      name: pkg.name,
      date: moment().format("YYYY-MM-DD")
    }))
    .pipe(plugins.useref.restore())
    .pipe(plugins.useref())
    .pipe(plugins.if('*.html', plugins.minifyHtml({
      empty: true
    })))
    .pipe(plugins.revReplace())
    .pipe(gulp.dest('build/dist'))
    .pipe(plugins.size({
      title: 'html'
    }));
});

gulp.task('scss', function() {
  return gulp.src(['webapp/src/scss/main.scss'])
    .pipe(plugins.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('webapp/tmp'))
    .pipe(plugins.size({
      title: 'scss'
    }));
});

gulp.task('serve', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: ['webapp']
    }
  });
  gulp.watch(['webapp/**/*.html'], reload);
  gulp.watch(['webapp/src/scss**/*.scss'], ['scss']);
  gulp.watch(['webapp/src/**/*.js'], ['jshint']);
  gulp.watch(['webapp/assets/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  browserSync({
    notify: false,
    server: {
      baseDir: 'build/dist',
      middleware: function(req, res, next) {
        var indexFile = "index.html";
        var rootDir = 'build/dist';
        var path = url.parse(req.url).pathname;

        fs.readFile('./' + rootDir + path, function(err, buffer) {
          if (!err) {
            return next();
          }

          fs.readFile('./' + rootDir + '/' + indexFile, function(err, buffer) {
            if (err) {
              return next(err);
            }

            var resp = {
              headers: {
                'Content-Type': 'text/html'
              },
              body: buffer
            };
            res.writeHead(200, resp.headers);
            res.end(resp.body);
          });
        });

      }
    }
  });
});


/*
// Update/install webdriver.
gulp.task('webdriver:update', webdriverUpdate);

// Run webdriver standalone server indefinitely.
// Usually not required.
gulp.task('webdriver:standalone', ['webdriver:update'], webdriverStandalone);

// Run unit tests using karma.
gulp.task('karma', function () {
	return gulp.src(files.test.unit)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function (e) {
			throw e
		});
});

// Run e2e tests using protractor.
// Make sure server task is running.
gulp.task('protractor', ['webdriver:update'], function () {
	return gulp.src(files.test.e2e)
		.pipe(protractor({
			configFile: 'protractor.conf.js',
		}))
		.on('error', function (e) {
			throw e
		});
});

gulp.task('test', ['karma', 'protractor']);
*/

// Clean Output Directory
gulp.task('clean', function() {
  return gulp.src('build/dist', {
      read: false
    }) // much faster
    .pipe(plugins.rimraf());
});




gulp.task('default', ['clean'], function(cb) {
  runSequence('generated', ['copy', 'jshint', 'images', 'html'], cb);
});

/*
.pipe(concat("ng-quick-date.js"))   // Combine into 1 file
	.pipe(gulp.dest("dist"))            // Write non-minified to disk
	.pipe(uglify())                     // Minify
	.pipe(rename({extname: ".min.js"})) // Rename to ng-quick-date.min.js
	.pipe(gulp.dest("dist"))
 */
/*

grunt.registerTask('unit', 'karma:unit');

grunt.registerTask('default', 'serve');
*/
* *
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  buildFolder = 'presentation',
  assetsFolder = 'assets',
  srcPaths = {
    scss: assetsFolder + '/styles/main.scss',
    theme: assetsFolder + '/theme/*.scss',
    css: assetsFolder + '/styles/main.css',
    scripts: assetsFolder + '/scripts/{,*/}*.js',
    images: assetsFolder + '/images/*.*'
  };

gulp.task('clean', function(cb) {
  del([buildFolder], cb);
});

gulp.task('styles', function() {
  gulp.src(srcPaths.scss)
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(assetsFolder + '/styles'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('theme', function() {
  gulp.src(srcPaths.theme)
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(assetsFolder + '/theme'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('scripts', function() {
  gulp.src([srcPaths.scripts, 'gulpfile.js', '!assets/scripts/vendor/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('fonts', function() {
  gulp.src('theme/fonts/*.*')
    .pipe(gulp.dest('presentation/theme/fonts'));
});

gulp.task('images', function() {
  gulp.src('assets/images/*.*')
    .pipe(gulp.dest('presentation/assets/images'));
});

gulp.task('themeMove', function() {
  gulp.src('assets/theme/**/*.*')
    .pipe(gulp.dest('presentation/assets/theme'));
});

gulp.task('prepare', ['styles', 'scripts'], function() {
  var assets = $.useref.assets();

  gulp.src('*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('bump', function() {
  gulp.src(['./bower.json', './package.json', './bower-dist.json'])
    .pipe($.bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function() {
  var version = require('./bower.json').version;
  $.git.tag('v' + version, function(err) {
    if (err) {
      throw err;
    } else {
      console.log('tag created');
    }
  });
});

gulp.task('bowerDist', function() {
  gulp.src('bower-dist.json')
    .pipe($.rename('bower.json'))
    .pipe(gulp.dest('presentation'));
});

gulp.task('push', ['tag'], function() {
  $.git.push('bower', 'master', {
    args: ' --tags --dry-run'
  }, function(err) {
    if (err) {
      throw err;
    } else {
      console.log('pushed to repo');
    }
  });
});

gulp.task('build', ['clean'], function() {
  gulp.start(['prepare', 'images', 'fonts', 'themeMove']);
});

gulp.task('bower', ['build'], function() {
  gulp.start(['tag', 'push']);
});

gulp.task('watch', function() {
  gulp.start(['browserSync', 'styles', 'theme', 'scripts']);
  gulp.watch(srcPaths.scss, ['styles']);
  gulp.watch(srcPaths.theme, ['theme']);
  gulp.watch(srcPaths.scripts, ['scripts', browserSync.reload]);
});
