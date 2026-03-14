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
<u>Hapi is required for this project. Please install hapi, hapi vision for template rendering, hapi cookie to enable user sessions and hapi boom for http friendly errors with the commands below:</u>   

npm install @hapi/hapi  
npm install @hapi/vision  
npm install @hapi/cookie  
npm install @hapi/boom  

<u>The following command is required to install uuid which is necessary for creating unique identifiers:</u>  

npm install uuid  

<u>The following commands are to install coding quality tools, Eslint for JavaScript standards, Prettier is a code formatter:</u>  
npm install -D eslint@8  
npm install -D eslint-config-airbnb-base  
npm install -D eslint-config-prettier  
npm install -D eslint-plugin-import  
npm install -D prettier  

<u>The following command is required for a .env file which will be required for credentials:</u>  

npm install dotenv  

<u>We need to install Joi for vaidation:</u>   

npm install joi  

<u>We need to install lowdb for local JSON file persistence:</u>  

npm install lowdb  

<u>The following commands are for installing Mocha and Chai globally for unit testing (I would also recommend installing Mocha Test Explorer on your IDE):</u>  

npm install -g mocha  
npm install -g chai  

<u>To use a mongoDB database service, I would recommend installing mongodb and Studio3T from robomongo (referenced below). You also need to install mongoose in the project. You will need to add a path from your database to the db folder. Complete this with the following commands:</u>  

mongod --dbpath db  
npm install mongoose  

<u>We need the following library for http requests:</u>  

npm install -D axios  

<u>Add the following plugin for images to be supported:</u>

npm install @hapi/inert  

<u>For JWT security for API tests, complete the following command:</u>

npm install hapi-auth-jwt2 jsonwebtoken  


## Installation instructions  
<u>To install and start the project use the following commands:</u>

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