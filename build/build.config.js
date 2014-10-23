'use strict';

module.exports = {
	buildDir: 'build/tmp',
	distDir: 'build/dist',
	buildFiles: ['build/**/*.js', '!build/tmp/**', '!build/dist/**', '!build/*.config.js'],
	buildConf: ['build/*.config.js'],
	/*
	 * banner to prepend on generated files
	 */
	banner: ['/**',
  ' * <%= name %>',
  ' * @version <%= version %>',
  ' * @date <%= date %>',
  ' */',
  ''].join('\n'),
	/*
	 * your proxy configuration, change it as you want.
	 */
	proxy: {
		context: '/api',
		host: 'localhost',
		port: 8001
	},
	/*
	 * connect configurations used during development.
	 */
	connect: {
		port: 8000,
		livereload: 35729,
		hostname: 'localhost'
	},
	/*
	 * paths of your app files, they will be automagically loaded and watched by the build.
	 */
};
