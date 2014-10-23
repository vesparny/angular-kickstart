##ExpressJS backend

it uses **MongoDB** for storing the notes.

####How do I run it?

You need node and MongoDB.

From this folder run the following commands to install the application and run it.
    
    $ npm install 
    $ node server.js
    
Your api is now available at http://localhost:8001.

Under the **config/** folder you can change parameters such as http port or MongoDb connection Url.

The requests will be proxied to this url from the connect middleware.
