# MapTheMoment

[Render deployed website](https://mapthemoment.onrender.com)  

MapTheMoment is a Placemark Hapi/Node Application which allows users to log wedding venues and proposal hotspots. 

## Description
Users can create areas and add wedding or proposal venues. On the main dashboard when the user logs in, they can view all public postings for wedding venues or proposal venues, choosing which category they wish to see. Each venue shows the users' name who posted the venue along with it's pictures, details and reviews. There is an option to click on the venue to bring you to a page where you can leave a review. The user also has their personal venue map with all the venues they have created.

## Use cases for application
This app could be used for businesses to promote their venues and showcase what's on offer. It may also be helpful in building customer trust in their brand as there is a review system where customers can share their experiences. Users can also post venues and proposal hotspots that they have found and give their experience in the description. Something like this could be useful from a tourism perspective as people often travel to propose and get married. This would also be helpful for users wishing to access to all information in one spot, for example with venue descriptions and reviews there is opportunities for people to share service information close to the area such as where to buy flowers or finding a nearby photographer. 

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

<u>We need to install Joi for validation:</u>   

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
[c8 for coverage reports](https://github.com/bcoe/c8)  
[Argon2 for hashing and salting passwords](https://www.npmjs.com/package/argon2)  
[sanitise-html package for santising input and output](https://www.npmjs.com/package/sanitize-html)  
[Argon2 - a helpful guide for understanding hashing](https://argon2-cffi.readthedocs.io/en/stable/howto.html)  
[dayjs](https://www.npmjs.com/package/dayjs)  
