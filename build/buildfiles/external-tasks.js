'use strict';

var _ = require("lodash"),
	html5ModeMiddleware = require('./utils/grunt-connect-html5Mode'),
	proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest,
	karmaConfig = function(configFile, customOptions) {
		var options = {
			configFile: configFile,
			keepalive: true
		}, travisOptions = process.env.TRAVIS && {
				browsers: ['Firefox'],
				reporters: 'dots'
			};
		return _.extend(options, customOptions, travisOptions);
	};

module.exports = function(grunt) {
	return {
		jshint: {
			src: '<%= config.webappFiles.js %>',
			tests: '<%= config.webappFiles.tests %>',
			gruntfile: 'Gruntfile.js',
			buildFiles: '<%= config.buildFiles %>',
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
		},
		sass: {
			dev: {
				src: '<%= config.webappFiles.sass %>',
				dest: '<%= config.buildDir %>/assets/css/<%= pkg.version %>.style.css'
			}
		},
		karma: {
			unit: {
				options: karmaConfig('build/karma.config.unit.js')
			},
			/* TODO
			watch: {
				options: karmaConfig('build/karma.config.unit.js', {
					singleRun: false,
					autoWatch: true
				})
			}
			*/
		},
		watch: {
			options: {
				livereload: true
			},
			buildFiles: {
				files: '<%= config.buildFiles %>',
				tasks: ['newer:jshint:buildFiles'],
				options: {
					livereload: false
				}
			},
			buildConf: {
				files: '<%= config.buildConf %>',
				tasks: ['build']
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['newer:jshint:gruntfile'],
				options: {
					livereload: false
				}
			},
			jssrc: {
				files: '<%= config.webappFiles.js %>',
				tasks: ['newer:jshint:src', 'newer:copy:webappJs']
			},
			assets: {
				files: '<%= config.webappFiles.assets %>',
				tasks: ['newer:copy:webappAssets']
			},
			html: {
				files: ['<%= config.webappFiles.html %>'],
				tasks: ['newer:tpl:build']
			},
			templates: {
				files: [
					'<%= config.webappFiles.templatesApp %>',
					'<%= config.webappFiles.templatesCommon %>'
				],
				tasks: ['html2js']
			},
			sass: {
				files: '<%= config.webappFiles.sass %>',
				tasks: ['sass']
			}
		},
		connect: {
			options: {
				port: '<%= config.connect.port %>',
				livereload: '<%= config.connect.livereload %>',
				hostname: '<%= config.connect.hostname %>'
			},
			livereload: {
				options: {
					open: true,
					livereload: true,
					base: '<%= config.buildDir %>',
					middleware: function(connect, options) {
						return [
							proxySnippet,
							html5ModeMiddleware(grunt.config('config.buildDir')),
							connect.static(options.base),
							connect.directory(options.base)
						];
					}

				}
			},
			proxies: [{
				context: '<%= config.proxy.context %>',
				host: '<%= config.proxy.host %>',
				port: '<%= config.proxy.port %>',
				changeOrigin: true
			}],
			dist: {
				options: {
					open: true,
					base: '<%= config.distDir %>',
					livereload: false,
					middleware: function(connect, options) {
						return [
							html5ModeMiddleware(grunt.config('config.distDir')),
							connect.static(options.base),
							connect.directory(options.base)
						];
					}
				}
			}
		},
		clean: {
			dist: '<%= config.distDir %>/*',
			tmp: '<%= config.buildDir %>/*'
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.distDir %>/assets/js/{,*/}*.js',
						'<%= config.distDir %>/assets/css/{,*/}*.css'
					]
				}
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.distDir %>/assets/img',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.distDir %>/assets/img'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.distDir %>/assets/img',
					src: '{,*/}*.svg',
					dest: '<%= config.distDir %>/assets/img'
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
				src: ['<%= config.webappFiles.templatesApp %>'],
				dest: '<%= config.buildDir %>/templates-app.js'
			},
			common: {
				options: {
					module: "templates.common"
				},
				src: ['<%= config.webappFiles.templatesCommon %>'],
				dest: '<%= config.buildDir %>/templates-common.js'
			}
		},
		tpl: {
			build: {
				dir: '<%= config.buildDir %>',
				src: [
					'<%= config.vendorFiles.js %>',
					'<%= config.buildDir %>/webapp/src/**/*.js',
					'<%= html2js.common.dest %>',
					'<%= html2js.app.dest %>',
					'<%= config.vendorFiles.css %>',
					'<%= sass.dev.dest %>'
				]
			},
			dist: {
				dir: '<%= config.distDir %>',
				src: [
					'<%= config.distDir %>/assets/css/*.css',
					'<%= config.distDir %>/assets/js/*vendor.js',
					'<%= config.distDir %>/assets/js/*app.js'
				]
			}
		},
		copy: {
			webappJs: {
				files: [{
					src: ['<%= config.webappFiles.js %>'],
					dest: '<%= config.buildDir %>/',
					cwd: '.',
					expand: true
				}]
			},
			webappAssets: {
				files: [{
					src: ['<%= config.webappFiles.assets %>'],
					dest: '<%= config.buildDir %>',
					cwd: 'webapp/src',
					expand: true
				}]
			},
			vendorCss: {
				files: [{
					src: ['<%= config.vendorFiles.css %>'],
					dest: '<%= config.buildDir %>',
					cwd: '.',
					expand: true
				}]
			},
			vendorJs: {
				files: [{
					src: ['<%= config.vendorFiles.js %>'],
					dest: '<%= config.buildDir %>',
					cwd: '.',
					expand: true
				}]
			},
			distAssets: {
				files: [{
					src: ['**'],
					dest: '<%= config.distDir %>/assets',
					cwd: '<%=config.buildDir %>/assets',
					expand: true
				}]
			}
		},
		ngmin: {
			dist: {
				files: [{
					src: ['<%= config.webappFiles.js %>'],
					cwd: '<%= config.buildDir %>',
					dest: '<%= config.buildDir %>',
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
					'<%= config.distDir %>/index.html': '<%= config.distDir %>/index.html'
				}
			}
		},
		concurrent: {
			build: [
				'sass',
				'copy:webappJs',
				'copy:vendorJs',
				'copy:vendorCss'
			]
		},
		uglify: {
			options: {
				banner: '<%= config.banner %>',
				mangle: false
			},
			app: {
				src: '<%= config.distDir %>/assets/js/<%= pkg.version %>.app.js',
				dest: '<%= config.distDir %>/assets/js/<%= pkg.version %>.app.js'
			},
			vendor: {
				src: '<%= config.distDir %>/assets/js/<%= pkg.version %>.vendor.js',
				dest: '<%= config.distDir %>/assets/js/<%= pkg.version %>.vendor.js'
			}
		},
		cssmin: {
			dist: {
				options: {
					banner: '<%= config.banner %>',
					keepSpecialComments: 0
				},
				src: '<%= config.distDir %>/assets/css/<%= pkg.version %>.style.css',
				dest: '<%= config.distDir %>/assets/css/<%= pkg.version %>.style.css'
			}
		},
		concat: {
			webappJs: {
				options: {
					banner: '<%= config.banner %>'
				},
				src: [
					'build/module.prefix',
					'<%= config.buildDir %>/webapp/src/**/*.js',
					'<%= html2js.app.dest %>',
					'<%= html2js.common.dest %>',
					'build/module.suffix'
				],
				dest: '<%= config.distDir %>/assets/js/<%= pkg.version %>.app.js'
			},
			vendorJS: {
				src: '<%= config.vendorFiles.js %>',
				dest: '<%= config.distDir %>/assets/js/<%= pkg.version %>.vendor.js'
			},
			buildCss: {
				src: [
					'<%= config.vendorFiles.css %>',
					'<%= config.distDir %>/assets/css/<%= pkg.version %>.style.css'
				],
				dest: '<%= config.distDir %>/assets/css/<%= pkg.version %>.style.css'
			},
		},
		changelog: {
			options: {
				dest: 'CHANGELOG.md'
			}
		}
	};
};
