# [ng-kickstart](http://vesparny.github.io/ng-kickstart/)

**Brought to you by [Alessandro Arnodo](http://alessandro.arnodo.net) [[@vesparny](https://twitter.com/vesparny)]**
http://selenium.googlecode.com/git/docs/api/javascript/index.html

[![Dev dependency status](https://david-dm.org/vesparny/ng-kickstart/dev-status.png)](https://david-dm.org/vesparny/ng-kickstart#info=devDependencies "Dependency status") [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/vesparny/ng-kickstart/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

**Speed up your [AngularJS 1.2](http://angularjs.org) development with a complete and scalable build system that scaffolds the project for you. Just focus on your app, ng-kickstart will take care of the rest.**
***

#### See a [demo](http://vesparny.github.io/ng-kickstart/).

##What and Why

ng-kickstart is an opinionated kickstart for single page application development in AngularJS 1.2. It makes your development easy, keeps the structure of the project consistent and allows you to create a fully-optimized production release with a single grunt task. I decided to build this tool because of the lack of a build system that let me develop a single page application while keeping an organized file structure; and in the meantime that allowed me to develop on an index.html file generated at build time, tied to my real backend.

##Getting started

Install **node.js**. Then **sass**, **grunt-cli** **karma** and **bower** if you haven't yet.

    $ gem install sass
    $ sudo npm -g install grunt-cli karma bower

After that, install ng-kickstart downloading the [latest release](https://github.com/vesparny/ng-kickstart/releases) (or clone the master branch if you want to run the development version). Unzip the project and cd into it, then install bower and npm dependencies, and run the application in development mode.

    $ npm install
    $ bower install
    $ grunt serve

You are now ready to go, your applcation is available at **http://127.0.0.1:8000**. Every request to /api will be proxied to **http://127.0.0.1:8001/api**.

In the `/backend` folder, you can find two examples of a **RESTFul backend**. One using **Silex PHP micro-framework + SQLite** and another using **expressjs + MongoDB**. Refer to the README.md in each folder to launch the desired backend (or run your own). Then go to **http://127.0.0.1:8000/notes**. You are now ready to start coding.

**Every file you add, edit or delete into the `/webapp` folder will be handled by the build system**.

When you are ready to build a production release there is a task for that:

    $ grunt dist

After the task has finished you can find an optimized version of your project inside the `/build/dist` folder.


##Directory Structure

At a high level, the structure looks roughly like this:

```
ng-kickstart/
├── backend
│   ├── expressjs
│   └── silex
├── build
│   ├── buildfiles
│   │   ├── tasks
│   │   │   └── tpl.js
│   │   ├── utils
│   │   │   └── grunt-connect-html5Mode.js
│   │   ├── external-tasks.js
│   │   ├── module.prefix
│   │   └── module.suffix
│   ├── build.config.js
│   └── karma.config.unit.js
├── webapp
│   ├── src
│   │   ├── app
│   │   │   ├── docs
│   │   │   │   ├── docs.js
│   │   │   │   └── docs.tpl.html
│   │   │   ├── home
│   │   │   │   ├── home.js
│   │   │   │   └── home.tpl.html
│   │   │   ├── notes
│   │   │   │   ├── notes.js
│   │   │   │   ├── notes.tpl.html
│   │   │   │   └── notesService.js
│   │   │   └── app.js
│   │   ├── assets
│   │   │   ├── fonts
│   │   │   │   ├── FontAwesome.otf
│   │   │   │   ├── fontawesome-webfont.eot
│   │   │   │   ├── fontawesome-webfont.svg
│   │   │   │   ├── fontawesome-webfont.ttf
│   │   │   │   └── fontawesome-webfont.woff
│   │   │   ├── img
│   │   │   │   ├── angular-logo.png
│   │   │   │   ├── bower-logo.png
│   │   │   │   └── grunt-logo.png
│   │   │   └── favicon.ico
│   │   ├── common
│   │   │   ├── directives
│   │   │   │   ├── appVersion.js
│   │   │   │   └── plusOne.js
│   │   │   └── interceptors
│   │   │       └── http.js
│   │   └── sass
│   │       ├── app
│   │       │   └── _foundation-custom-vars.scss
│   │       └── main.scss
│   ├── test
│   │   └── app
│   │       └── home
│   │           └── home.spec.js
│   ├── vendor
│   └── index.tpl.html
├── .bowerrc
├── .jshintrc
├── Gruntfile.js
├── bower.json
└── package.json

```

- `backend/` - Fully working RESTful backend, available in 2 versions.
- `build/` - Build files and configuration, the most important files to note are `build.config.js` and `karma.config.unit.js`. These files are the heart of the build system, and they are well commented so take a look for more information.
- `webapp/` the source code of your application, take a look at the modules in this folder, you should structure your application following those conventions, but you can choose another convention as well.
- `.bowerrc` - the Bower configuration file. This tells Bower to install components in the `webapp/vendor/` directory.
- `.jshintrc` - JSHint configuration.
- `Gruntfile.js` - see [The Build System](#thebuildsystem) below.
- `bower.json` - It contains the list of Bower dependencies.
- `build.config.js` - our customizable build settings; see "The Build System" below.
- `package.json` - node.js dependencies.

### <a name="thebuildsystem"></a>The Build System

There are some `tasks` available in `Gruntfile.js`. Every task is defined in `build/external-tasks.js`. You can dig into the file to familiarize yourself with grunt, but you don't have to in order to be getting started with ng-kickstart.

A description of every available task:

* **grunt serve** - When this task runs, the build system will create a version of the application under the `build/tmp/` folder. The build will take care of creating an index.html with js and css (generated from sass) loaded. Every request to `/api` will be proxied to your backend listening to port 8001 by default. Every time you change a file into the `webapp/` folder, the build recompiles every file, and your browser will reload automagically showing you your changes.
* **grunt dist** - This task will run jshint and unit tests under the `webapp/test/` folder (thanks to `karma runner`), and create a fully-optimized version of your code under the `build/dist/` folder. The optimization consists of concatenate, minify and compress js and css files, optimize images, and put every template into a js file loaded by the application.
* **grunt unit** - Just run unit tests.


### Features

* 3 simple task: grunt serve, grunt dist, grunt unit
* JavaScript file continuous linting.
* SASS continuous compiling.
* Unit testing ready and configured.
* HTML templates converted into strings and attached to javascript files (to avoid one http call for every template).
* Proxy every request to `/api` (configurable of course) to your backend listening on another port.
* Livereload.
* Static resources minification and optimization for production.
* html5mode enabled by default (and fully handled by the build connect middleware).

**See also the CHANGELOG.md file**

### TODO

* E2E tests with protractor
* ...

### Contributing

PR and issues reporting are always welcome :)

### License

See LICENSE file

### Changelog

See CHANGELOG.md file

### Thank you, community!

All this wouldn't have been possible without these great contributors and everybody who comes with new ideas and suggestions.

* [Mitch Pirtle](https://github.com/spacemonkey)
* [Peter Renström](https://github.com/renstrom)
