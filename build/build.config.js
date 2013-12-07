'use strict';

module.exports = {
    buildDir: 'build/tmp',
    distDir: 'build/dist',
    buildFiles: ['build/**/*.js', '!build/tmp/**', '!build/dist/**', '!build/*.config.js'],
    buildConf: ['build/*.config.js'],
    /*
     * banner to prepend on the generated files
     */
    banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd")  %> */\n',
    /*
	 * your proxy configuration, change it as you want.
	 */
    proxy: {
        context: '/api',
        host: 'localhost',
        port: 9001
    },
    /*
	 * connect configurations used during development.
	 */
    connect: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
    },
    /*
     * paths of your app files, they will be automagically loaded and watched by the build.
     */
    webappFiles: {
        js: ['webapp/src/app/**/*.js', 'webapp/src/common/**/*.js'],
        assets: ['assets/**'],
        tests: ['webapp/test/**/*.spec.js'],
        templatesApp: ['webapp/src/app/**/*.tpl.html'],
        templatesCommon: ['webapp/src/common/**/*.tpl.html'],
        sass: 'webapp/src/sass/main.scss',
        sassFiles: ['webapp/src/sass/**/*.scss'],
        html: 'webapp/index.tpl.html'
    },
    /*
     * bower files to load, they are not watched during the development, the order matters.
     */
    vendorFiles: {
        js: [
            'webapp/vendor/angular/angular.js',
            'webapp/vendor/angular-route/angular-route.js',
            'webapp/vendor/angular-resource/angular-resource.js',
            'webapp/vendor/angular-animate/angular-animate.js',
            'webapp/vendor/angular-loading-bar/build/loading-bar.js',
            'webapp/vendor/alertify/alertify.js',
            'webapp/vendor/lodash/dist/lodash.js'

        ],
        css: [
            'webapp/vendor/foundation/css/normalize.css',
            'webapp/vendor/angular-loading-bar/build/loading-bar.min.css',
            'webapp/vendor/alertify/themes/alertify.core.css',
            'webapp/vendor/alertify/themes/alertify.default.css'
        ]
    }
};
