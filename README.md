Pre prerequisites for development and production mode
- Nodejs

For Development Mode

-Extract the zip
-open command line in root folder
-run the command "npm install"
-later open another command prompt from root folder and execute "npm run start-dev-server"
-And in another run "npm run start-dev"
-Make sure 8080 is empty else you can the port in server/config file
-Then we explore the app on localhost://8080 or localhost://XXXX

For Production Mode

-Extract the zip
-Open a command prompt from root folder and run the command "node server.js"
-Make sure 8080 is empty else you can the port in config.js file
-Then we explore the app on localhost://8080 or localhost://XXXX

Assumptions
- There was no api's for likes and comment for a group and i had to hit n api's for n groups which i havent done , so i have taken members and pool_count as likes and comments data
- And same for cover photos there were no apis for cover pics i had hit multiple api's.