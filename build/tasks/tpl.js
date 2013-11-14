'use strict';

function filterForJS(files) {
	return files.filter(function(file) {
		return file.match(/\.js$/);
	});
}

function filterForCSS(files) {
	return files.filter(function(file) {
		return file.match(/\.css$/);
	});
}
module.exports = function(grunt) {
	grunt.registerMultiTask('tpl', 'Process index.tpl.html template', function() {
		var dirRE = new RegExp('^(' + grunt.config('config.build_dir') + '|' + grunt.config('config.dist_dir') + ')\/', 'g');
		var jsFiles = filterForJS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '');
		});
		var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
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
}
