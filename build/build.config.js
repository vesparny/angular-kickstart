'use strict';

//basic configuration object used by gulp tasks
module.exports = {
  port: 3000,
  tmp: 'build/tmp',
  dist: 'build/dist',
  base: 'client',
  tpl: 'client/src/**/*.tpl.html',
  mainScss: 'client/src/scss/main.scss',
  scss: 'client/src/scss/**/*.scss',
  js: [
    'client/src/**/*.js',
    '!client/src/vendor/**/*.js',
    'client/test/unit/**/*.js',
    'client/test/e2e/**/*.js'
  ],
  index: 'client/index.html',
  assets: 'client/assets/**',
  images: 'client/assets/images/**/*',
  banner: ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
};
