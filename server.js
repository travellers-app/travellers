require('dotenv').config();
const PORT = process.env.PORT || 3000;
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
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
function homePage(request,response){}
function searchPage(request,response){}

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
let arrayWeatherObject=[];
function Weather (city,temperature,descriptions,wind_speed,humidity){
    this.city=city;
    this.temperature=temperature;
    this.descriptions=descriptions;
    this.wind_speed=wind_speed;
    this.humidity=humidity;
    arrayWeatherObject.push(this);
}

function getWeather(request,response){
    // let city = request.query.city;
    
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=amman&limit=4&key=${WEATHER_API_KEY}`;
    superagent.get(url).then(data=>{
        let weatherData=data.body.data;
       for (i=0;i<3;i++){
        let temp = weatherData[i].temp;
        let desc = weatherData[i].weather.description;
        let windSpeed=weatherData[i].wind_spd;
        let humidity= weatherData[i].rh;
        // console.log(temp);
        // console.log(desc);
        // console.log(windSpeed);
        // console.log(humidity);
        new Weather('' , temp,desc,windSpeed,humidity);
              }
        // console.log(arrayWeatherObject);
        response.send(arrayWeatherObject);
    })
}
