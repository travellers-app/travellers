require('dotenv').config();
const PORT = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL;
const express = require("express");
const superagent = require("superagent");
const cors = require("cors");
const pg = require("pg");
const methodOverride = require("method-override");
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
// const options = NODE_ENV === 'production' ? { connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } } : { connectionString: DATABASE_URL };
// const client = new pg.Client(options);
// client.on('error', error => { throw error; })
// client.connect().then(() => {
//     app.listen(PORT, () => {
//         console.log('we are listening to port 3000')
//     })
// }).catch(error => {
//     console.log("client connction faild");
// })
app.listen(PORT, () => {
    console.log('we are listening to port 3000')
});
app.get('/',homePage);
app.get('/search',searchPage);
app.get('/location',getLocation);
app.get('/weather',getWeather);
app.get('/hotels',getHotels);
app.get('/resturants',getResturants);
app.get('/touristical',getTouristical);
app.get('/user',userPage);
app.get('/about',aboutPage);
function homePage(request,response){
    response.render('main');
}
function searchPage(request,response){}
function getWeather(request,response){}
function getLocation(request,response){}
function getHotels(request,response){}
function getResturants(request,response){}
function getTouristical(request,response){}
function userPage(request,response){}
function aboutPage(request,response){}
// calender (exists)
// city-search (autocomplete => stretch goal)
// location => insert the city name => API => long. + lat. => stretch goal
// weather => weather api => {"weather_descriptions","sunrise":,"sunset","temperature":,"wind_speed","humidity"}
// hotels => amadeus api => mohammed-ashor
// resturants => yelp api => raneem
// touristical monuments ?? => raneem 
