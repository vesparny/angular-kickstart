'use strict';


module.exports = {
	jshint: {
		src: '<%= config.webapp_files.js %>',
		test: '<%= app_files.jsunit %>',
		gruntfile: [
			'Gruntfile.js'
		],
		options: {
			jshintrc: '.jshintrc',
			reporter: require('jshint-stylish')
		},
	},
	sass: { // Task
		dev: { // Target

			src: ['<%= config.webapp_files.sass %>'],
			dest: 	'<%= config.build_dir %>/assets/css/style.css'

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
			hostname: '0.0.0.0'
		},
		livereload: {
			options: {
				open: true,
				base: [
					'<%= config.build_dir %>'
				],

				middleware: function(connect, options) {
					var middlewares = [];
					if (!Array.isArray(options.base)) {
						options.base = [options.base];
					}
					middlewares.push(require('connect-modrewrite')([
						//'!(\\..+)$ /index.html [L]'
						//'^(.*) /index.html [NC,L]'
						'^/api/.*$ http://www.google.com [P,L]',
						'!\\.(js|css|.tpl.html|eot|svg|ttf|woff|otf|css|png|jpg|git|ico) /'

					]));


					options.base.forEach(function(base) {
						// Serve static files.
						middlewares.push(connect.static(base));
					});
					return middlewares;

				}
			}

		},
		dist: {
			options: {
				open: true,
				base: ['<%= config.dist_dir %>'],
				livereload: false,
				middleware: function(connect, options) {
					var middlewares = [];
					if (!Array.isArray(options.base)) {
						options.base = [options.base];
					}
					middlewares.push(require('connect-modrewrite')([
						//'!(\\..+)$ /index.html [L]'
						//'^(.*) /index.html [NC,L]'
						'^/api/.*$ http://www.google.com [P,L]',
						'!\\.(js|css|.tpl.html|eot|svg|ttf|woff|otf|css|png|jpg|git|ico) /'

					]));


					options.base.forEach(function(base) {
						// Serve static files.
						middlewares.push(connect.static(base));
					});
					return middlewares;

				}
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


	// Put files not handled in other tasks here

	modernizr: {
		devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
		outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
		files: [
			'<%= yeoman.dist %>/scripts/{,*/}*.js',
			'<%= yeoman.dist %>/styles/{,*/}*.css',
			'!<%= yeoman.dist %>/scripts/vendor/*'
		],
		uglify: true
	},



	html2js: {
		options: {
			base: 'webapp/src'
		},
		app: {
			src: ['<%= config.webapp_files.templates_app %>'],
			dest: '<%= config.build_dir %>/templates-app.js'
		},
		common: {
			src: ['<%= config.webapp_files.templates_common %>'],
			dest: '<%= config.build_dir %>/templates-common.js'
		}
	},
	        tpl: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
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
			dest: '<%= config.dist_dir %>/assets/js/<%= pkg.name %>-<%= pkg.version %>.app.js'
		},
		js_vendor: {
			src: '<%= config.vendor_files.js %>',
			dest: '<%= config.dist_dir %>/assets/js/<%= pkg.name %>-<%= pkg.version %>.vendor.js'
		},
		build_css: {
			src: [
				'<%= config.vendor_files.css %>',
				'<%= config.dist_dir %>/assets/css/<%= pkg.name %>-<%= pkg.version %>.css'
			],
			dest: '<%= config.dist_dir %>/assets/css/<%= pkg.name %>-<%= pkg.version %>.css'
		},
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



	'template': {
		'index_build': {
			'options': {
				'data': function() {
					return {
						js: getJs(),
						css: getCss()
					}
				}
			},
			'files': {
				'<%= config.build_dir %>/index.html': ['webapp/index.html.tpl']
			}
		},
		'index_dist': {
			'options': {
				'data': function() {
					return {
						js: getJsDist(),
						css: getCssDist()
					}
				}
			},
			'files': {
				'<%= config.dist_dir %>/index.html': ['webapp/index.html.tpl']
			}
		}
	},

	cssmin: {
		dist: {
			options: {
				banner: '<%= config.banner %>'
			},

			files: {
				'<%= config.dist_dir %>/assets/css/<%= pkg.name %>-<%= pkg.version %>.css': ['<%= config.dist_dir %>/assets/css/<%= pkg.name %>-<%= pkg.version %>.css']
			}

		}
	},
	ngmin: {
		compile: {
			files: [{
				src: ['<%= config.webapp_files.js %>'],
				cwd: '<%= config.build_dir %>',
				dest: '<%= config.build_dir %>',
				expand: true
			}]
		}
	},
	uglify: {
		options: {
			banner: '<%= config.banner %>',
			mangle: false
		},
		dist: {
			files: [{
				expand: true,
				cwd: '<%= config.dist_dir %>/assets/js/',
				src: '**/*.js',
				dest: '<%= config.dist_dir %>/assets/js/'
			}]
		}
	},

	htmlmin: { // Task
		dist: { // Target
			options: { // Target options

				collapseWhitespace: true
			},
			files: { // Dictionary of files
				'<%= config.dist_dir %>/index.html': '<%= config.dist_dir %>/index.html'
			}
		}
	}
};
