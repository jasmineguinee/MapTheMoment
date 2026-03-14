# MapTheMoment

[Render deployed website](https://mapthemoment.onrender.com)  

MapTheMoment is a Placemark Hapi/Node Application which allows users to log wedding venues and proposal hotspots. 

## Description
Users can create areas and add venues for weddings or proposals. 
Users can decide to make venues publicly visible or they can keep them private. 
On the main dashboard when the user logs in, they can view all public postings for wedding venues or proposal hotspots, choosing which catagory they wish to see. When the user clicks on their area, they have a private map which shows the venues they have added for that area.

## Use cases for application
This app could be used for businesses to display information about and promote their venues. Users can also post venues and proposal hotspots they have found and give their experience in the description. This could also be helpful for users who are seeking to plan events and wish to access to all information in one spot. 

## Packages required  
Hapi is required for this project. Please install hapi, hapi vision for template rendering, hapi cookie to enable user sessions and hapi boom for http friendly errors with the commands below:  
npm install @hapi/hapi  
npm install @hapi/vision  
npm install @hapi/cookie  
npm install @hapi/boom  

The following command is required to install uuid which is necessary for creating unique identifiers:   
npm install uuid  

The following commands are to install coding quality tools, Eslint for JavaScript standards, Prettier is a code formatter:  
npm install -D eslint@8  
npm install -D eslint-config-airbnb-base  
npm install -D eslint-config-prettier  
npm install -D eslint-plugin-import  
npm install -D prettier  

The following command is required for a .env file which will be required for credentials:  

npm install dotenv  

We need to install Joi for vaidation:  

npm install joi  

We need to install lowdb for local JSON file persistence:  

npm install lowdb  

The following commands are for installing Mocha and Chai globally for unit testing (I would also recommend installing Mocha Test Explorer on your IDE):  

npm install -g mocha  
npm install -g chai  

To use a mongoDB database service, I would recommend installing mongodb and Studio3T from robomongo (referenced below). You also need to install mongoose in the project. You will need to add a path from your database to the db folder. Complete this with the following commands:   

mongod --dbpath db  
npm install mongoose  

We need the following library for http requests:  

npm install -D axios  

Add the following plugin for images to be supported:  

npm install @hapi/inert  

For JWT security for API tests, complete the following command:  

npm install hapi-auth-jwt2 jsonwebtoken  


## Installation instructions
To install and start the project use the following commands:  

npm install  
npm run start  

## References:   
[Eslint](https://eslint.org/)  
[Prettier](https://prettier.io/)  
[Hapi](https://hapi.dev/module/?sort=name)  
[Joi](https://github.com/hapijs/joi)  
[Mongodb](https://www.mongodb.org)  
[robomongo](https://robomongo.org)
[Plugin for geocoding in the map search](https://github.com/perliedman/leaflet-control-geocoder)
[Leaflet documentation](https://leafletjs.com/reference.html#event-objects)