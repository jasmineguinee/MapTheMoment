# MapTheMoment

[Render deployed website](https://mapthemoment.onrender.com)  

MapTheMoment is a Placemark Hapi/Node Application which allows users to log wedding venues and proposal hotspots. 

## Description
Users can create areas on their dashboard. They can add wedding or proposal venues to each area. The dashboard also has a public map where they can view all public postings for wedding venues or proposal venues, choosing which category they wish to see. Users can click to get further details of each venue including images, descriptions, reviews and its community ratings. Users can also choose to keep their venues private while they are drafting them. The noticeboard gives users the opportunity to post and discuss venues.

## Use cases for application
This app could be used for businesses to promote their venues. Users can also post venues that they have found and share details. This can be useful from a tourism perspective to help people who want to find good places to visit. There is also a commmunity aspect to this application as users can post on the noticeboard. There is potential of using the the app for planning local activities and community groups. It could be scoped out further with messaging as a type of social media application.

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
[javascript star ratings](https://www.geeksforgeeks.org/javascript/star-rating-using-html-css-and-javascript/)  
[Playwright docs](https://playwright.dev/docs/locators)  
