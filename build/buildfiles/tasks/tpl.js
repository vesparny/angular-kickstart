'use strict';

function findJs(files) {
	return files.filter(function(file) {
		return file.match(/\.js$/);
	});
}

function findCss(files) {
	return files.filter(function(file) {
		return file.match(/\.css$/);
	});
}
module.exports = function(grunt) {
	grunt.registerMultiTask('tpl', 'Process index.tpl.html template', function() {
		var dirRE = new RegExp('^(' + grunt.config('config.buildDir') + '|' + grunt.config('config.distDir') + ')\/', 'g'),
		jsFiles = findJs(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '');
		}),
		cssFiles = findCss(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '');
		});
		grunt.file.copy('webapp/index.tpl.html', this.data.dir + '/index.html', {
			process: function(contents) {
				return grunt.template.process(contents, {
					data: {
						js: jsFiles,
						css: cssFiles,
						version: grunt.config('pkg.version')
					}
				});
			}
		});
	});
};
