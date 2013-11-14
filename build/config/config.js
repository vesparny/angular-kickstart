/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
	/**
	 * The `build_dir` folder is where our projects are compiled during
	 * development and the `compile_dir` folder is where our app resides once it's
	 * completely built.
	 */
	build_dir: 'build/tmp',
	dist_dir: 'build/dist',

	webapp_files: {
		js: ['webapp/src/app/**/*.js', 'webapp/src/common/**/*.js'],
		tests: ['webapp/src/test/**/*.spec.js'],
		assets: ['assets/**'],
		templates_app: ['webapp/src/app/**/*.tpl.html'],
		templates_common: ['webapp/src/common/**/*.tpl.html'],
		html: ['webapp/index.html.tpl'],
		sass: 'webapp/src/sass/main.scss'
	},

	test_files: {
		js: [
			'vendor/angular-mocks/angular-mocks.js'
		]
	},

	vendor_files: {
		js: [
			'webapp/vendor/angular/angular.js',
			'webapp/vendor/angular-route/angular-route.js',
			'webapp/vendor/angular-resource/angular-resource.js',
			'webapp/vendor/angular-animate/angular-animate.js',
			'webapp/vendor/angular-loading-bar/build/loading-bar.js',
			'webapp/vendor/alertify/alertify.js'
		],
		css: [
			'webapp/vendor/angular-loading-bar/build/loading-bar.min.css',
			'webapp/vendor/alertify/themes/alertify.core.css',
			'webapp/vendor/alertify/themes/alertify.default.css'
		]
	},
	banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd")  %>*/'
};
