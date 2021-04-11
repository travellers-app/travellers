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
const pm = require('postman');
const unirest = require('unirest')
const { response, request } = require('express');
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
//     console.log("client connection failed");
// })

app.listen(PORT, () => {
    console.log('we are listening to port 3000')
});

app.get('/', homePage);
app.get('/search', searchPage);
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/hotels', getHotels);
app.get('/resturants',handleYelpRequest);
app.get('/touristic', getTouristic);
app.get('/user', userPage);
app.get('/about', aboutPage);
function homePage(request, response) { }
function searchPage(request, response) { }
function userPage(request, response) { }
function aboutPage(request, response) { }
function getHotels(request, response) {

    // let cityCode = request.query;
    let cityCode = 'LON';
    const key = process.env.ACCESS_TOKEN;
    const url = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}`;

    superagent.get(url).set('Authorization', `Bearer ${key}`).then(hotelsObj => {
        let newHotel = hotelsObj.body.data.map(offer => {
            return new Hotels(offer);
        })
        response.json(newHotel)

    }).catch(error => console.log('error'))
}
function Hotels(offer) {

    let desc = offer.hotel.description;
    let image = offer.hotel.media;
    let pay = offer.offers[0].price;

    this.name = offer.hotel.name;
    this.rate = offer.hotel.rating;
    offer.hotel.contact ? this.contact = offer.hotel.contact.phone : this.contact = 'No Contact Info Available';
    desc ? this.description = desc.text : this.description = 'No Description Available';
    image ? this.picture = image[0].uri : this.picture = 'Media Unavailable';
    this.price = pay.total + ' ' + pay.currency;
}
function getTouristic(request, response) {
    let lat = request.query.latitude;
    let lon = request.query.longitude;

    const key = process.env.ACCESS_TOKEN;
    const url = `https://test.api.amadeus.com/v1/shopping/activities?longitude=${lon}&latitude=${lat}&radius=1`;

    superagent.get(url).set('Authorization', `Bearer ${key}`).then(toursObj=>{
        let newTour = toursObj.body.data.map(tour =>{
            return new Tours(tour);
        })
        response.json(newTour);
    }).catch(error=>(log('error')));
 }
function Tours(tour) {
    
    let pay = tour.price;

    this.name = tour.name;
    this.description = tour.shortDescription;
    this.rate = tour.rating;
    tour.pictures ? this.picture = tour.pictures[0] : 'No Picture available';
    this.booking_link = tour.bookingLink;
    this.price = pay.amount + ' ' + pay.currencyCode;

}

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

function Yelp(yelpData) {
  this.name = yelpData.name;
  this.price = yelpData.price;
  this.rating = yelpData.rating;
  this.imgURL = yelpData.image_url;
  this.url = yelpData.url;
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
let arrayWeatherObject=[];
function Weather (city,temperature,descriptions,wind_speed,humidity){
    this.city=city;
    this.temperature=temperature;
    this.descriptions=descriptions;
    this.wind_speed=wind_speed;
    this.humidity=humidity;
    arrayWeatherObject.push(this);
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

function anyErrorHandler(error, req, res) {
    res.status(500).send(error);
  }
// calender (exists)
// city-search (autocomplete => stretch goal)
// location => insert the city name => API => long. + lat. => stretch goal
// weather => weather api => {"weather_descriptions","sunrise":,"sunset","temperature":,"wind_speed","humidity"}
// hotels => amadeus api => mohammed-ashor
// resturants => yelp api => raneem
// touristical monuments ?? => raneem 















