'use strict';

var html5ModeMiddleware = require('../../utils/grunt-connect-html5Mode'),
	middleware = function(connect, options) {
		return [
			// redirect all urls to index.html
			html5ModeMiddleware('build/tmp/', 'index.html'),

			// Serve static files.
			connect.static(options.base),

			// Make empty directories browsable.
			connect.directory(options.base)
		];
	}
module.exports = {
	jshint: {
		src: '<%= config.webapp_files.js %>',
		test: '<%= config.webapp_files.test %>',
		gruntfile:
			'Gruntfile.js'
		,
		options: {
			jshintrc: '.jshintrc',
			reporter: require('jshint-stylish')
		},
	},
	sass: {
		dev: {
			src: ['<%= config.webapp_files.sass %>'],
			dest: '<%= config.build_dir %>/assets/css/<%= pkg.version %>.style.css'
		}
	},
	karma: {
		unit_once: {
			singleRun: true,
			reporters: ['progress'],
			frameworks: ['mocha'],
			browsers: ['PhantomJS'],
			options: {
				files: ['test/client/unit/**/*.js']
			}
		},
		unit_background: {
			background: true,
			reporters: ['progress'],
			frameworks: ['mocha'],
			browsers: ['PhantomJS'],
			options: {
				files: ['test/client/unit/**/*.js']
			}
		}
	},
	watch: {
		rebuild: {
			tasks: ['build:rebuild'],
			files: ['Gruntfile.js', 'build/**/*.js']
		},
		jshint_client: {
			tasks: ['jshint:client'],
			files: ['src/client/js/**/*.js']
		},
		jshint_client_tests: {
			tasks: ['jshint:client_tests'],
			files: ['test/client/**/*.js']
		},
		jshint_server: {
			tasks: ['jshint:server'],
			files: ['src/srv/**/*.js', 'app.js']
		},
		jshint_server_tests: {
			tasks: ['jshint:server_tests'],
			files: ['test/server/**/*.js']
		},
		jshint_server_support: {
			tasks: ['jshint:server_support'],
			files: ['Gruntfile.js', 'build/**/*.js', 'deploy/**/*.js']
		},
		test_client: {
			tasks: ['karma:unit_background:run'],
			files: ['src/client/js/**/*.js', 'test/client/**/*.js']
		},
		test_server: {
			tasks: ['mochaTest:unit'],
			files: ['src/srv/**/*.js', 'app.js', 'test/server/**/*.js']
		},
		images: {
			tasks: ['images:debug'],
			files: ['src/client/img/**/*.{png,jpg,gif,ico}']
		},
		css: {
			tasks: ['css:debug'],
			files: ['src/client/css/**/*.styl', 'bin/.tmp/sprite/*.css', 'bower_components/**/*.css']
		},
		js_sources: {
			tasks: ['copy:js_sources'],
			files: ['src/client/js/**/*.js']
		},
		js_bower: {
			tasks: ['copy:js_bower_debug'],
			files: ['bower_components/**/*.js']
		},
		views: {
			tasks: ['views:debug'],
			files: ['src/client/views/**/*.jade']
		},
		livereload: {
			options: {
				livereload: true
			},
			files: ['bin/public/**/*.{css,js}', 'bin/views/**/*.html']
		}
	},
	connect: {
		options: {
			port: 9000,
			livereload: 35729,
			hostname: 'localhost'
		},
		livereload: {
			options: {
				open: true,
				base: '<%= config.build_dir %>',
				middleware: middleware
			}
		},
		dist: {
			options: {
				open: true,
				base: '<%= config.dist_dir %>',
				livereload: false,
				middleware: middleware
			}
		}
	},
	clean: {
		dist: '<%= config.dist_dir %>/*',
		tmp: '<%= config.build_dir %>/*'
	},
	rev: {
		dist: {
			files: {
				src: [
					'<%= config.dist_dir %>/assets/js/{,*/}*.js',
					'<%= config.dist_dir %>/assets/css/{,*/}*.css'
				]
			}
		}
	},
	imagemin: {
		dist: {
			files: [{
				expand: true,
				cwd: '<%= config.dist_dir %>/assets/img',
				src: '{,*/}*.{gif,jpeg,jpg,png}',
				dest: '<%= config.dist_dir %>/assets/img'
			}]
		}
	},
	svgmin: {
		dist: {
			files: [{
				expand: true,
				cwd: '<%= config.dist_dir %>/assets/img',
				src: '{,*/}*.svg',
				dest: '<%= config.dist_dir %>/assets/img'
			}]
		}
	},
	html2js: {
		options: {
			base: 'webapp/src'
		},
		app: {
			options: {
				module: "templates.app"
			},
			src: ['<%= config.webapp_files.templates_app %>'],
			dest: '<%= config.build_dir %>/templates-app.js'
		},
		common: {
			options: {
				module: "templates.common"
			},
			src: ['<%= config.webapp_files.templates_common %>'],
			dest: '<%= config.build_dir %>/templates-common.js'
		}
	},
	tpl: {
		build: {
			dir: '<%= config.build_dir %>',
			src: [
				'<%= config.vendor_files.js %>',
				'<%= config.build_dir %>/webapp/src/**/*.js',
				'<%= html2js.common.dest %>',
				'<%= html2js.app.dest %>',
				'<%= config.vendor_files.css %>',
				'<%= sass.dev.dest %>'
			]
		},
		dist: {
			dir: '<%= config.dist_dir %>',
			src: [
				'<%= config.dist_dir %>/assets/css/*.css',
				'<%= config.dist_dir %>/assets/js/*vendor.js',
				'<%= config.dist_dir %>/assets/js/*app.js'
			]
		}
	},
	copy: {
		webapp_js: {
			files: [{
				src: ['<%= config.webapp_files.js %>'],
				dest: '<%= config.build_dir %>/',
				cwd: '.',
				expand: true
			}]
		},
		webapp_assets: {
			files: [{
				src: ['<%= config.webapp_files.assets %>'],
				dest: '<%= config.build_dir %>',
				cwd: 'webapp/src',
				expand: true
			}]
		},
		vendor_css: {
			files: [{
				src: ['<%= config.vendor_files.css %>'],
				dest: '<%= config.build_dir %>',
				cwd: '.',
				expand: true
			}]
		},
		vendor_js: {
			files: [{
				src: ['<%= config.vendor_files.js %>'],
				dest: '<%= config.build_dir %>',
				cwd: '.',
				expand: true
			}]
		},
		dist_assets: {
			files: [{
				src: ['**'],
				dest: '<%= config.dist_dir %>/assets',
				cwd: '<%=config.build_dir %>/assets',
				expand: true
			}]
		}
	},
	ngmin: {
		dist: {
			files: [{
				src: ['<%= config.webapp_files.js %>'],
				cwd: '<%= config.build_dir %>',
				dest: '<%= config.build_dir %>',
				expand: true
			}]
		}
	},
	htmlmin: {
		dist: {
			options: {
				collapseWhitespace: true
			},
			files: {
				'<%= config.dist_dir %>/index.html': '<%= config.dist_dir %>/index.html'
			}
		}
	},
	concurrent: {
		build: [
			'sass',
			'copy:webapp_assets',
			'copy:webapp_js',
			'copy:vendor_js',
			'copy:vendor_css'
		]
	},
	uglify: {
		options: {
			banner: '<%= config.banner %>',
			mangle: false
		},
		app: {
			src: '<%= config.dist_dir %>/assets/js/<%= pkg.version %>.app.js',
			dest: '<%= config.dist_dir %>/assets/js/<%= pkg.version %>.app.js'
		},
		vendor: {
			src: '<%= config.dist_dir %>/assets/js/<%= pkg.version %>.vendor.js',
			dest: '<%= config.dist_dir %>/assets/js/<%= pkg.version %>.vendor.js'
		}
	},
	cssmin: {
		dist: {
			options: {
				banner: '<%= config.banner %>'
			},
			src: '<%= config.dist_dir %>/assets/css/<%= pkg.version %>.style.css',
			dest: '<%= config.dist_dir %>/assets/css/<%= pkg.version %>.style.css'
		}
	},
	concat: {
		js_app: {
			options: {
				banner: '<%= config.banner %>'
			},
			src: [
				'build/module.prefix',
				'<%= config.build_dir %>/webapp/src/**/*.js',
				'<%= html2js.app.dest %>',
				'<%= html2js.common.dest %>',
				'build/module.suffix'
			],
			dest: '<%= config.dist_dir %>/assets/js/<%= pkg.version %>.app.js'
		},
		js_vendor: {
			src: '<%= config.vendor_files.js %>',
			dest: '<%= config.dist_dir %>/assets/js/<%= pkg.version %>.vendor.js'
		},
		build_css: {
			src: [
				'<%= config.vendor_files.css %>',
				'<%= config.dist_dir %>/assets/css/<%= pkg.version %>.style.css'
			],
			dest: '<%= config.dist_dir %>/assets/css/<%= pkg.version %>.style.css'
		},
	}

};
