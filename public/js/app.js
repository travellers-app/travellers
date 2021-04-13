///////////////////////////////////////////////////////////////////////////
let search_query;
let lon;
let lat;
$(document).ready(renderSearhPage)
function renderSearhPage() {
    $('#searchBtu').on('click', (event) => {
        event.preventDefault();
        search_query = $('#to').val().toLowerCase();
        getLocation();
        getWeather();
        getResturants();
        getTouristic();
        getHotels();
    })
}
function getLocation() {
    const ajaxSettingsOne = {
        method: 'get',
        dataType: 'json',
        data: { city: search_query },
    };
    $.ajax('/location', ajaxSettingsOne)
        .then(result => {
            lat = (Math.ceil((Math.abs(result.latitude)) * 10000)) / 10000;
            lon = (Math.ceil((Math.abs(result.longitude)) * 10000)) / 10000;;
        })
        .catch(error => {
            showError(error);
        });
}
function getWeather() {
    const ajaxSettingsOne = {
        method: 'get',
        dataType: 'json',
        data: { city: search_query },
    };
    $.ajax('/weather', ajaxSettingsOne)
        .then(result => {
        })
        .catch(error => {
            showError(error);
        });
}
function getResturants() {
    const ajaxSettingsOne = {
        method: 'get',
        dataType: 'json',
        data: { city: search_query },
    };
    $.ajax('/resturants', ajaxSettingsOne)
        .then(result => {
            result.forEach((data, idx) => {
                new Resturants(data.imgURL, data.name, data.rating, data.url, idx)
            })
        })
        .catch(error => {
            showError(error);
        });
}
function getTouristic() {
    const ajaxSettingsOne = {
        method: 'get',
        dataType: 'json',
        data: { city: search_query },
    };
    $.ajax('/location', ajaxSettingsOne)
        .then(result => {
            lat = (Math.ceil((Math.abs(result.latitude)) * 10000)) / 10000;
            lon = (Math.ceil((Math.abs(result.longitude)) * 10000)) / 10000;;
            let ajaxSettingsTwo = {
                method: 'get',
                dataType: 'json',
                data: { lon, lat }
            };
            $.ajax('/token2', ajaxSettingsTwo)
                .then(result => {
                    result.forEach((data, idx) => {
                        new Tour(data.picture, data.name, data.description, data.rate, data.booking_link, data.price, idx)
                    })
                })
                .catch(error => {
                    showError(error);
                });
        });
}
function getHotels() {
    const ajaxSettingsOne = {
        method: 'get',
        dataType: 'json',
        data: { city: search_query },
    };
    $.ajax('/location', ajaxSettingsOne)
        .then(result => {
            lat = (Math.ceil((Math.abs(result.latitude)) * 10000)) / 10000;
            lon = (Math.ceil((Math.abs(result.longitude)) * 10000)) / 10000;;
            let ajaxSettingsTwo = {
                method: 'get',
                dataType: 'json',
                data: { lon, lat }
            };
            $.ajax('/token', ajaxSettingsTwo)
                .then(result => {
                    result.forEach((data, idx) => {
                        new Hotel(data.picture, data.name, data.description, data.rate, data.contact, data.price, idx)
                    })
                })
                .catch(error => {
                    showError(error);
                });
        });
}
function Hotel(img, name, discription, rate, contact, price, idx) {
    this.img = img,
        this.name = name,
        this.discription = discription,
        this.rate = rate,
        this.contact = contact,
        this.price = price,
        this.idx = idx,
        this.render(this)
}
Hotel.prototype.render = (source) => {
    let cardTemplate = $('#hotTemp').html();
    let cardHtmlData = Mustache.render(cardTemplate, source);
    $('#hotel').append(cardHtmlData);
}
function Resturants(img, name, rate, contact, idx) {
    this.img = img,
        this.name = name,
        this.rate = rate,
        this.contact = contact,
        this.idx = idx,
        this.render(this)
}
Resturants.prototype.render = (source) => {
    let cardTemplate = $('#resTemp').html();
    let cardHtmlData = Mustache.render(cardTemplate, source);
    $('#returants').append(cardHtmlData);
}
function Tour(img, name, discription, rate, contact, price, idx) {
    this.img = img,
        this.name = name,
        this.discription = discription,
        this.rate = Math.ceil(rate * 10) / 10,
        this.contact = contact,
        this.price = price,
        this.idx = idx,
        this.render(this)
}
Tour.prototype.render = (source) => {
    let cardTemplate = $('#tourTemp').html();
    let cardHtmlData = Mustache.render(cardTemplate, source);
    $('#touristic').append(cardHtmlData);
}
///////////////////////////////////////////////////////////////////////////