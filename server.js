require('dotenv').config();
const PORT = process.env.PORT || 3000;
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
const yelpKey = process.env.yelpKey;
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
// app.get('/hotels',getHotels);
app.get('/resturants',handleYelpRequest);
app.get('/touristical',getTouristical);
app.get('/user',userPage);
app.get('/about',aboutPage);
function homePage(request,response){}
function searchPage(request,response){}







    function handleYelpRequest(req, res) {
        const yelpKey=process.env.YELP;
        city = req.query.city;
        const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
        superagent.get(url)
          .set('Authorization', `Bearer ${yelpKey}`)
          .then(yelp => {
              const yelpArr = yelp.body.businesses.map(yelpData => {
                  return new Yelp(yelpData);
            });
            console.log( yelpArr)
            res.status(200).send(yelpArr);
          })
          .catch((err) => anyErrorHandler(err, req, res));
    }

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



function getLocation(request,response){
    const city = request.query.city;
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&city=${city}&format=json&limit=1`;
    superagent.get(url)
    .then(data=>{
        const geoData= data.body[0];
        const locationInfo = new Location(city, geoData);
        response.send(locationInfo);
    })
    .catch((error) => {
        console.log(error.message);
        response.status(500).send('So sorry, something went wrong.');
      });
    


}




function Location(city, info) {
    this.search_query = city;
    this.formatted_query = info.display_name;
    this.latitude = info.lat;
    this.longitude = info.lon;
    Location.all.push(this);
  }
  Location.all=[];




function Yelp(yelpData) {
  this.name = yelpData.name;
  this.price = yelpData.price;
  this.rating = yelpData.rating;
  this.imgURL = yelpData.image_url;
  this.url = yelpData.url;
}


function anyErrorHandler(error, req, res) {
    res.status(500).send(error);
  }
 
