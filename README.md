Pre prerequisites for development and production mode
- Nodejs

For Development Mode

-open command line in root folder
-run the command "npm install"
-later open another command prompt from root folder and execute "npm run start-dev-server"
-And in another run "npm run start-dev"
-Make sure 8080 is empty else you can the port in server/config file
-Then we explore the app on localhost://8080 or localhost://XXXX

For Production Mode

-run "npm run build:client" and also "npm run build:server"
-move into the folder flickr created inside root
-Open a command prompt from root folder and run the command "node server.js"
-Make sure 8080 is empty else you can the port in config.js file
-Then we explore the app on localhost://8080 or localhost://XXXX
