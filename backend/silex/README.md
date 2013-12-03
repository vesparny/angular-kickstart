##Silex backend
**This is a revisited version of the [silex-simple-rest](https://github.com/vesparny/silex-simple-rest) project. Go there for more specific info.**

it uses **SQLite** for storing the notes.

####How do I run it?
From this folder run the following commands to install the php and bower dependencies, import some data, and run a local php server.

You need at least php **5.4.*** with **SQLite extension** enabled and **Composer**
    
    $ composer install 
    $ sqlite3 app.db < resources/sql/schema.sql
    $ php -S 0:9001 -t web/
    
Your api is now available at http://localhost:9001.

The requests will be proxied to this url from the connect middleware.

####Run tests
Some tests were written, and all CRUD operations are fully tested :)

From this folder run the following command to run tests.
    
    vendor/bin/phpunit 






