(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/footer.tpl.html",
    "<div class=\"row\">\n" +
    "  <div class=\"me large-12 columns center\">\n" +
    "    <p>&copy; 2013 - <a href=\"http://alessandro.arnodo.net\">Alessandro Arnodo.</a>\n" +
    "      <br/><a href=\"https://twitter.com/vesparny\" class=\"twitter-follow-button\" data-show-count=\"false\">Follow\n" +
    "      @vesparny</a>\n" +
    "      <script>\n" +
    "        ! function(d, s, id) {\n" +
    "          var js, fjs = d.getElementsByTagName(s)[0],\n" +
    "            p = /^http:/.test(d.location) ? 'http' : 'https';\n" +
    "          if (!d.getElementById(id)) {\n" +
    "            js = d.createElement(s);\n" +
    "            js.id = id;\n" +
    "            js.src = p + '://platform.twitter.com/widgets.js';\n" +
    "            fjs.parentNode.insertBefore(js, fjs);\n" +
    "          }\n" +
    "        }(document, 'script', 'twitter-wjs');\n" +
    "      </script>\n" +
    "  </div>\n" +
    "  <div class=\"social large-12 columns center\">\n" +
    "    <ul class=\"inline-list\">\n" +
    "      <li><a target=\"_blank\" href=\"http://twitter.com/vesparny\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "      </li>\n" +
    "      <li><a target=\"_blank\" href=\"https://plus.google.com/+AlessandroArnodo\"><i\n" +
    "        class=\"fa fa-google-plus\"></i></a>\n" +
    "      </li>\n" +
    "      <li><a target=\"_blank\" href=\"http://www.linkedin.com/in/alessandroarnodo\"><i\n" +
    "        class=\"fa fa-linkedin\"></i></a>\n" +
    "      </li>\n" +
    "      <li><a target=\"_blank\" href=\"https://github.com/vesparny/ng-kickstart\"><i\n" +
    "        class=\"fa fa-github\"></i></a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/header.tpl.html",
    "<div class=\"pure-menu pure-menu-open pure-menu-horizontal\">\n" +
    "  <a class=\"pure-menu-heading\" href=\"\">ng-kickstart <span app-version></span></a>\n" +
    "  <ul>\n" +
    "    <li ui-sref-active=\"pure-menu-selected\"><a href ui-sref=\"root.home\">{{ 'home' | uppercase }}</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active=\"pure-menu-selected\"><a href ui-sref=\"root.docs\">{{ 'docs' | uppercase }}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/docs/docs.tpl.html",
    "<div class=\"pure-g\">\n" +
    "  <div class=\"content pure-u-1 pure-u-md-4-4\">\n" +
    "    <p class=\"panel\">\n" +
    "      <strong>Note that this is only a getting started guide, for more detailed information about the build system, the available tasks, the configuration of the build or anything else, please refer to the <a href=\"https://github.com/vesparny/ng-kickstart/#readme\" target=\"_blank\">documentation</a> on the GitHub project.</strong>\n" +
    "    </p>\n" +
    "\n" +
    "    <h3>What and Why</h3>\n" +
    "    <p>\n" +
    "      <code>ng-kickstart</code> is an opinionated kickstart for single page application development in AngularJS 1.2. It makes your development easy, keeps the structure of the project consistent and allows you to create a fully optimized production release\n" +
    "      with a single grunt task. I decided to build this tool because of the lack of a build system that let me develop a single page application while keeping an organized file structure, and in the meantime that allows me to develop on a index.html file\n" +
    "      generated at build time, tied to my real backend.\n" +
    "    </p>\n" +
    "\n" +
    "    <h3>Getting started</h3>\n" +
    "    <p>\n" +
    "      Install\n" +
    "      <strong><a href=\"https://github.com/joyent/node/wiki/installation\" target=\"_blank\">node.js</a></strong>. Then\n" +
    "      <strong>sass, grunt-cli, karma and bower</strong> if you haven't yet.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ gem install sass\n" +
    "    $ sudo npm -g install grunt-cli karma bower\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p>\n" +
    "      After that, install\n" +
    "      <code>ng-kickstart</code> - download the <a href=\"https://github.com/vesparny/ng-kickstart/archive/v0.0.2.zip\">latest</a> release (or clone the master branch if want to run the development version). Unzip the project and cd into it, then install\n" +
    "      bower and npm dependencies, and run the application in development mode.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ npm install\n" +
    "    $ bower install\n" +
    "    $ grunt serve\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p>\n" +
    "      You are now ready to go, your applcation is available at\n" +
    "      <code>http://127.0.0.1:8000</code>. Every request to\n" +
    "      <code>/api</code> will be proxied to\n" +
    "      <code>http://127.0.0.1:8001/api</code>.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      In the\n" +
    "      <strong>/backend</strong> folder, you can find two examples of RESTFul backend. One using <strong> Silex PHP micro-framework + SQLite</strong> and another using <strong>expressjs + MongoDB</strong>. Refer to the README.md into its folder to launch\n" +
    "      the desired backend (or run your own). Then go to\n" +
    "      <code>http://127.0.0.1:8000/notes</code>. You are now ready to start coding, every file you add, edit or delete into the\n" +
    "      <strong>/webapp</strong> folder, will be handled by the build system.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      When you are ready to build a production release there is a task for that.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ grunt dist\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p>\n" +
    "      After the task has finished you can find an optimized version of your project in the\n" +
    "      <strong>/build/dist</strong> folder.\n" +
    "    </p>\n" +
    "\n" +
    "    <p>\n" +
    "      There is also a task for execute unit tests located inside the <strong>/webapp/test</strong> folder.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ grunt unit\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p class=\"text-center\">\n" +
    "      <a href=\"https://github.com/vesparny/ng-kickstart/#readme\" target=\"_blank\" class=\"button expand\">\n" +
    "        <i class=\"fa fa-share\"></i>&nbsp;&nbsp;Full documentation on GitHub\n" +
    "      </a>\n" +
    "    </p>\n" +
    "\n" +
    "    <hr/>\n" +
    "    <p class=\"text-center\">\n" +
    "      <strong>Inspired by ng-boilerplate, yeoman and so many other beautiful projects.</strong>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/home/home.tpl.html",
    "<div class=\"pure-g\">\n" +
    "  <div class=\"content pure-u-1 pure-u-md-4-4\">\n" +
    "    <div class=\"social large-12 columns center\">\n" +
    "      <ul class=\"inline-list\">\n" +
    "        <li><a target=\"_blank\" href=\"http://twitter.com/vesparny\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "        <li><a target=\"_blank\" href=\"https://plus.google.com/+AlessandroArnodo\"><i\n" +
    "          class=\"fa fa-google-plus\"></i></a>\n" +
    "        </li>\n" +
    "        <li><a target=\"_blank\" href=\"http://www.linkedin.com/in/alessandroarnodo\"><i\n" +
    "          class=\"fa fa-linkedin\"></i></a>\n" +
    "        </li>\n" +
    "        <li><a target=\"_blank\" href=\"https://github.com/vesparny/ng-kickstart\"><i\n" +
    "          class=\"fa fa-github\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"large-9 columns\">\n" +
    "        <blockquote>\n" +
    "          <h3>Speed up your <strong>AngularJS 1.2</strong> development with a complete and scalable build system that scaffolds the project for you. Just focus on your app,\n" +
    "                <code>ng-kickstart</code> will take care of the rest.</h3>\n" +
    "        </blockquote>\n" +
    "      </div>\n" +
    "      <div class=\"large-3 columns\">\n" +
    "        <a href=\"https://github.com/vesparny/ng-kickstart/archive/v0.0.2.zip\" class=\"button expand\">\n" +
    "          <i class=\"fa fa-download\"></i>&nbsp;&nbsp;Download\n" +
    "        </a>\n" +
    "        <a href=\"https://github.com/vesparny/ng-kickstart/#readme\" target=\"_blank\" class=\"button secondary expand\">\n" +
    "          <i class=\"fa fa-share\"></i>&nbsp;&nbsp;Docs on GitHub\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"text-center\">\n" +
    "      <ul class=\"inline-list\">\n" +
    "        <li>\n" +
    "          <iframe class=\"github-btn\" src=\"http://ghbtns.com/github-btn.html?user=vesparny&amp;repo=ng-kickstart&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"85px\" height=\"20px\"></iframe>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <iframe class=\"github-btn\" src=\"http://ghbtns.com/github-btn.html?user=vesparny&amp;repo=ng-kickstart&amp;type=fork&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"85px\" height=\"20px\"></iframe>\n" +
    "        </li>\n" +
    "        <li class=\"tweet-btn\">\n" +
    "\n" +
    "          <iframe allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" src=\"https://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fbit.ly%2Fng-kickstart&amp;counturl=http%3A%2F%2Fvesparny.github.io%2Fng-kickstart&amp;text=Try%20ng-kickstart%20-%20Speed%20up%20your%20AngularJS%20development&amp;hashtags=angularjs, gruntjs, foundationzurb, bower&amp;via=vesparny&amp;related=vesparny\"\n" +
    "          style=\"width:130px; height:20px;\"></iframe>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <div plus-one></div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <hr/>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <div class=\"text-center\">\n" +
    "          <img src=\"assets/img/angular-logo.png\">\n" +
    "        </div>\n" +
    "        <h4>AngularJS</h4>\n" +
    "        <p>The best JavaScript framework out there will power up your awesome app.\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <div class=\"text-center\">\n" +
    "          <img src=\"assets/img/grunt-logo.png\">\n" +
    "        </div>\n" +
    "        <h3>Grunt</h3>\n" +
    "        <p>A smart and scalable <a href=\"http://gruntjs.com\" target=\"_blank\">grunt</a> based build system will take care of your development workflow, as well as the optimization process for production release. <a ng-href=\"gettingStarted\">Read more...</a>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <div class=\"text-center\">\n" +
    "          <img src=\"assets/img/bower-logo.png\">\n" +
    "        </div>\n" +
    "        <h3>Bower</h3>\n" +
    "        <p><a href=\"http://bower.io\" target=\"_blank\">Bower</a> will handle your front-end dependencies.</p>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <h4>Sass + Zurb Foundation</h4>\n" +
    "        <p><a href=\"http://sass-lang.com/\" target=\"_blank\">Sass</a> is the most mature, stable, and powerful professional grade CSS extension language. Write your CSS in a modular way, the build system will compile your .scss files into a single css files.\n" +
    "          It should be easy to integrate less, stylus or any other preprocessor if you prefer. <a href=\"http://foundation.zurb.com/\" target=\"_blank\">Zurb Foundation</a> is the default CSS framework.</p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <h4>API Proxy</h4>\n" +
    "        <p>If you are developing a single page application tied to a\n" +
    "          <code>real backend</code>, ng-kickstart will proxy every request to your backend listening on another port. You can configure this of course. <a ng-href=\"gettingStarted\">Read more...</a>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <h4>Modular Structure</h4>\n" +
    "        <p>Instead of angular-seed monolithic files structure, ng-kickstart comes with a\n" +
    "          <code>by-feature/files organization</code>, keeping your code organized, especially if you are working on a large code base. If you don't like it, just use your preferred structure, and the build system will still work. <a ng-href=\"gettingStarted\">Read more...</a>\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <h4>Keep Your Code Reusable</h4>\n" +
    "        <p>Every general purpose directive, service or filter, should be placed into a common directory, in this way you can copy and paste the directory into another project, require the module you need, and you are ready to go with your new project.\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <h4>Unit Testing</h4>\n" +
    "        <p>The build system comes with a special task for running tests by using <a href=\"http://karma-runner.github.io/\" target=\"_blank\">Karma Test Runner</a>. Every time you make a production release, unit tests will be run for you.\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"large-4 columns\">\n" +
    "        <h4>RESTFul Backend Included</h4>\n" +
    "        <p>ng-kickstart ships with a working\n" +
    "          <code>REST api</code> written in 2 versions: One using <strong>Silex PHP micro-framework + SQLite</strong> and another using <strong>expressjs + MongoDB</strong> See the <a ng-href=\"gettingStarted\">getting started section</a> for more information.\n" +
    "          It would be awesome to have more working examples with other technologies. Please feel free to code, hack and <a href=\"https://github.com/vesparny/ng-kickstart/blob/master/CONTRIBUTING.md\">send PR</a>.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();
