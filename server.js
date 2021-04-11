require('dotenv').config();
const PORT = process.env.PORT || 3000;
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
app.get('/restaurants', getRestaurants);
app.get('/touristic', getTouristic);
app.get('/user', userPage);
app.get('/about', aboutPage);
function homePage(request, response) { }
function searchPage(request, response) { }
function getWeather(request, response) { }
function getLocation(request, response) { }

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

function getRestaurants(request, response) { }

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
function userPage(request, response) { }
function aboutPage(request, response) { }
// calender (exists)
// city-search (autocomplete => stretch goal)
// location => insert the city name => API => long. + lat. => stretch goal
// weather => weather api => {"weather_descriptions","sunrise":,"sunset","temperature":,"wind_speed","humidity"}
// hotels => amadeus api => mohammed-ashor
// resturants => yelp api => raneem
// touristical monuments ?? => raneem 


// Hotel Constructor
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


function Tours(tour) {
    
    let pay = tour.price;

    this.name = tour.name;
    this.description = tour.shortDescription;
    this.rate = tour.rating;
    tour.pictures ? this.picture = tour.pictures[0] : 'No Picture available';
    this.booking_link = tour.bookingLink;
    this.price = pay.amount + ' ' + pay.currencyCode;

}


