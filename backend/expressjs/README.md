##ExpressJS backend

it uses **MongoDB** for storing the notes.

####How do I run it?
From this folder run the following commands to install the php and bower dependencies, import some data, and run a local php server.

You need node and MongoDB
    
    $ npm install 
    $ node server.js
    
Your api is now available at http://localhost:9001.

Under the **config/** folder you can change parameters such as http port or MongoDb connection Url

The requests will be proxied to this url from the connect middleware.






