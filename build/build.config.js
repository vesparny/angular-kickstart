'use strict';

module.exports = {
	buildDir: 'build/tmp',
	distDir: 'build/dist',
	buildFiles: ['build/**/*.js', '!build/tmp/**', '!build/dist/**', '!build/*.config.js'],
	buildConf: ['build/*.config.js'],
	banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd")  %> */\n',
	proxy: {
		context: '/api',
		host: 'localhost',
		port: 9001
	},
	connect: {
		port: 9000,
		livereload: 35729,
		hostname: 'localhost'
	},
	webappFiles: {
		js: ['webapp/src/app/**/*.js', 'webapp/src/common/**/*.js'],
		assets: ['assets/**'],
		tests: ['webapp/test/**/*.spec.js'],
		templatesApp: ['webapp/src/app/**/*.tpl.html'],
		templatesCommon: ['webapp/src/common/**/*.tpl.html'],
		sass: 'webapp/src/sass/main.scss',
		html: 'webapp/index.tpl.html'
	},
	vendorFiles: {
		js: [
			'webapp/vendor/angular/angular.js',
			'webapp/vendor/angular-route/angular-route.js',
			'webapp/vendor/angular-resource/angular-resource.js',
			'webapp/vendor/angular-animate/angular-animate.js',
			'webapp/vendor/angular-loading-bar/build/loading-bar.js',
			'webapp/vendor/alertify/alertify.js'
		],
		css: [
			'webapp/vendor/foundation/css/normalize.css',
			'webapp/vendor/angular-loading-bar/build/loading-bar.min.css',
			'webapp/vendor/alertify/themes/alertify.core.css',
			'webapp/vendor/alertify/themes/alertify.default.css'
		]
	}
};
