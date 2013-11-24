'use strict';
var _ = require("lodash");
var html5ModeMiddleware = require('./utils/grunt-connect-html5Mode');
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var karmaConfig = function(configFile, customOptions) {
	var options = {
		configFile: configFile,
		keepalive: true
	};
	var travisOptions = process.env.TRAVIS && {
		browsers: ['Firefox'],
		reporters: 'dots'
	};
	return _.extend(options, customOptions, travisOptions);
};

module.exports = function(grunt) {
	return {
		jshint: {
			src: '<%= config.webapp_files.js %>',
			test: '<%= config.webapp_files.test %>',
			gruntfile: 'Gruntfile.js',
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
		},
		sass: {
			dev: {
				src: '<%= config.webapp_files.sass %>',
				dest: '<%= config.build_dir %>/assets/css/<%= pkg.version %>.style.css'
			}
		},
		karma: {
			unit: {
				options: karmaConfig('build/karma.config.unit.js')
			},
			watch: {
				options: karmaConfig('build/karma.config.unit.js', {
					singleRun: false,
					autoWatch: true
				})
			}
		},
		watch: {
			options: {
				livereload: true
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
				options: {
					livereload: false
				}
			},
			jssrc: {
				files: '<%= config.webapp_files.js %>',
				tasks: ['jshint:src', 'copy:webapp_js']
			},
			assets: {
				files: '<%= config.webapp_files.assets %>',
				tasks: ['copy:webapp_assets']
			},
			html: {
				files: ['<%= config.webapp_files.html %>'],
				tasks: ['tpl:build']
			},
			templates: {
				files: [
					'<%= config.webapp_files.templates_app %>',
					'<%= config.webapp_files.templates_common %>'
				],
				tasks: ['html2js']
			},
			sass: {
				files: ['webapp/src/sass/**/*.sass'],
				tasks: ['sass']
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
					livereload: true,
					base: '<%= config.build_dir %>',
					middleware: function(connect, options) {
						return [
							proxySnippet,
							html5ModeMiddleware(grunt.config('config.build_dir')),
							connect.static(options.base),
							connect.directory(options.base)
						];
					}

				}
			},
			proxies: [{
				context: '/api',
				host: 'localhost',
				port: 9001,
				changeOrigin: true
			}],
			dist: {
				options: {
					open: true,
					base: '<%= config.dist_dir %>',
					livereload: false,
					middleware: function(connect, options) {
						return [
							html5ModeMiddleware(grunt.config('config.dist_dir')),
							connect.static(options.base),
							connect.directory(options.base)
						];
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
					banner: '<%= config.banner %>',
					keepSpecialComments: 0
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
		},
		changelog: {
			options: {
				dest: 'CHANGELOG.md'
			}
		}
	}
};
