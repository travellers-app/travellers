'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const yelpKey = process.env.YELP;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
let key; // this variable is to set the token key
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_PASSWORD;
const express = require("express");
const superagent = require("superagent");
const cors = require("cors");
const pg = require("pg");
const methodOverride = require("method-override");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
const options = NODE_ENV === 'production' ? { connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } } : { connectionString: DATABASE_URL };
const client = new pg.Client(options);
client.on('error', error => { throw error; })
client.connect().then(() => {
    app.listen(PORT, () => {
        console.log('we are listening to port 3000')
    })
}).catch(error => {
    console.log("client connction faild");
})
let arrayWeatherObject = [];
let lon;
let lat;
app.get('/', homePage);
app.get('/token', getToken); // this path that we will go to to get the token for the hotels and it will redirect to the hotel path automatically
app.get('/token2', getToken2); // this path that we will go to to get the token for the touristic and it will redirect to the touristic path automatically
app.get('/search', searchPage);
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/hotels', getHotels); // 'token' will redirect to this path and render hotels
app.get('/resturants', handleYelpRequest);
app.get('/touristic', getTouristic); // 'token2' will redirect to this path and render tours
app.get('/user', userPage);
app.get('/about', aboutPage);
app.post('/insert', save);
app.delete('/delete', deleteTrip)
app.get('/detail/:id', detailPage)
app.post('/update', updatePage)
app.put('/put', putPage)

function updatePage(request, response) {
    const id = request.body.id
    let fromCity;
    let city;
    let checkin;
    let checkout;
    const sql = `SELECT * FROM trips WHERE id=$1`;
    client.query(sql, [id]).then(data => {
        fromCity = data.rows[0].fromcity;
        city = data.rows[0].city;
        checkin = data.rows[0].checkin;
        checkout = data.rows[0].checkout;
        response.render('update', { id, fromCity, city, checkin, checkout })
    })
}

function putPage(request, response) {
    const id = request.body.id;
    const data = request.body;
    const dataArr = Object.values(data);
    dataArr.shift();
    dataArr.push(id);
    console.log(dataArr)
    let sql = "UPDATE trips SET fromCity=$1,city=$2,lon=$3,lat=$4, hotel=$5,contact=$6,checkin=$7,checkout=$8,returant=$9,resturantimg=$10,resturanturl=$11,touristic=$12,touristicimg=$13,discrp=$14 WHERE id=$15"
    client.query(sql, dataArr).then(data => {
        response.redirect(`/detail/${id}`)
    })
}

function detailPage(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM trips WHERE id=$1`;
    client.query(sql, [id]).then(data => {
        const resultsDataBase = data.rows[0];
        let allData;
        const sql2 = `SELECT * FROM trips`;
        client.query(sql2).then(data => {
            allData = data.rows
            const weather = arrayWeatherObject;
            arrayWeatherObject = [];
            response.render('detail', { reviewResult: resultsDataBase, weather, allData, id });
        })
    })
}

function deleteTrip(request, response) {
    const id = request.body.id;
    if (id == 1) {
        const deleteSql1 = 'DELETE FROM trips'
        client.query(deleteSql1).then(data => {
            response.redirect('/user');
        });
    } else {
        const deleteSql = 'DELETE FROM trips WHERE id = $1'
        client.query(deleteSql, [id]).then(data => {
            response.redirect('/user');
        });
    }
}

function aboutPage(request, response) {
    response.render('about');
}

function save(request, response) {
    const sqlData = request.body;
    const valuesArr = Object.values(sqlData)
    const sql = 'INSERT INTO trips (fromCity,city,lon,lat, hotel,contact,checkin,checkout,returant,resturantimg,resturanturl,touristic,touristicimg,discrp) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *';
    client.query(sql, valuesArr)
        .then(data => {
            response.redirect('/user');
        }).catch(error => (console.log('Token ' + error)))
}

function userPage(request, response) {
    const sql = `SELECT * FROM trips`;
    client.query(sql).then(data => {
        const resultsDataBase = data.rows[data.rowCount - 1];
        if (data.rowCount == 0) {
            response.render('search')
        } else {
            const allData = data.rows
            const weather = arrayWeatherObject;
            arrayWeatherObject = [];
            response.render('userpage', { reviewResult: resultsDataBase, weather, allData, id: resultsDataBase.id });
        }
    })
}

function save(request, response) {
    const sqlData = request.body;
    const valuesArr = Object.values(sqlData)
    const sql = 'INSERT INTO trips (fromCity,city,lon,lat, hotel,contact,checkin,checkout,returant,resturantimg,resturanturl,touristic,touristicimg,discrp) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *';
    client.query(sql, valuesArr)
        .then(data => {
            response.redirect('/user');
        }).catch(error => (console.log(error)))
}

function searchPage(request, response) {
    response.render('search');
}

function homePage(request, response) {
    response.render('main');
}

function getToken(request, response) {
    lon = request.query.lon;
    lat = request.query.lat;
    const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    superagent.post(tokenUrl)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ "grant_type": "client_credentials", "client_id": clientId, "client_secret": clientSecret })
        .then(obj => {
            key = obj.body.access_token
            response.redirect('/hotels');
        }).catch(error => (console.log('Token ' + error)))
}

function getHotels(request, response) {
    const url = `https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM`;
    superagent.get(url).set('Authorization', `Bearer ${key}`).then(hotelsObj => {
        let newHotel = hotelsObj.body.data.map(offer => {
            return new Hotels(offer);
        })
        response.json(newHotel)
    }).catch(error => console.log(error))
}

function getToken2(request, response) {
    lon = request.query.lon;
    lat = request.query.lat;
    const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    superagent.post(tokenUrl)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ "grant_type": "client_credentials", "client_id": clientId, "client_secret": clientSecret })
        .then(obj => {
            key = obj.body.access_token
            response.redirect('/touristic');
        }).catch(error => (console.log('Token ' + error)))
}

function getTouristic(request, response) {
    const url = `https://test.api.amadeus.com/v1/shopping/activities?longitude=${lon}&latitude=${lat}&radius=5`;
    superagent.get(url).set('Authorization', `Bearer ${key}`).then(toursObj => {
        let newTour = toursObj.body.data.map(tour => {
            return new Tours(tour);
        })
        response.json(newTour);
    }).catch(error => (console.log(error)));
}

function handleYelpRequest(req, res) {
    const city = req.query.city;
    const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
    superagent.get(url)
        .set('Authorization', `Bearer ${yelpKey}`)
        .then(yelp => {
            const yelpArr = yelp.body.businesses.map(yelpData => {
                return new Yelp(yelpData);
            });
            res.json(yelpArr);
        })
        .catch((err) => anyErrorHandler(err, req, res));
}

function getWeather(request, response) {
    const city = request.query.city;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&limit=4&key=${WEATHER_API_KEY}`;
    superagent.get(url).then(data => {
        let weatherData = data.body.data;
        for (let i = 0; i < 3; i++) {
            let temp = weatherData[i].temp;
            let desc = weatherData[i].weather.description;
            let windSpeed = weatherData[i].wind_spd;
            let humidity = weatherData[i].rh;
            new Weather('', temp, desc, windSpeed, humidity);
        }
        response.send(arrayWeatherObject);
    })
}

function getLocation(request, response) {
    const city = request.query.city;
    const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&city=${city}&format=json&limit=1`;
    superagent.get(url)
        .then(data => {
            const geoData = data.body[0];
            const locationInfo = new Location(city, geoData);
            response.json(locationInfo);
        })
        .catch((error) => {
            response.status(500).send('So sorry, something went wrong.');
        });
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

function Tours(tour) {
    let pay = tour.price;
    this.name = tour.name;
    this.description = tour.shortDescription;
    this.rate = tour.rating;
    tour.pictures ? this.picture = tour.pictures[0] : 'No Picture available';
    this.booking_link = tour.bookingLink;
    this.price = pay.amount + ' ' + pay.currencyCode;
}

function Yelp(yelpData) {
    this.name = yelpData.name;
    this.price = yelpData.price;
    this.rating = yelpData.rating;
    this.imgURL = yelpData.image_url;
    this.url = yelpData.url;
}

function Weather(city, temperature, descriptions, wind_speed, humidity) {
    this.city = city;
    this.temperature = temperature;
    this.descriptions = descriptions;
    this.wind_speed = wind_speed;
    this.humidity = humidity;
    arrayWeatherObject.push(this);
}
function Location(city, info) {
    this.search_query = city;
    this.formatted_query = info.display_name;
    this.latitude = info.lat;
    this.longitude = info.lon;
    Location.all.push(this);
}
Location.all = [];
function anyErrorHandler(error, req, res) {
    res.status(500).send(error);

}

