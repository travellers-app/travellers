console.log("we are connected");
const search_query = 'london';
let lon;
let lat;
const ajaxSettingsOne = {
    method: 'get',
    dataType: 'json',
    data: { city: search_query },
};
function getLocation() {
    $.ajax('/location', ajaxSettingsOne)
        .then(result => {
            lat = (Math.ceil((Math.abs(result.latitude)) * 10000)) / 10000;
            lon = (Math.ceil((Math.abs(result.longitude)) * 10000)) / 10000;;
            let ajaxSettingsTwo = {
                method: 'get',
                dataType: 'json',
                data: { lon, lat }
            };
            console.log(ajaxSettingsTwo);
        })
        .catch(error => {
            showError(error);
        });
}
function getWeather() {
    $.ajax('/weather', ajaxSettingsOne)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            showError(error);
        });
}
function getResturants() {
    $.ajax('/resturants', ajaxSettingsOne)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            showError(error);
        });
}
function getTouristic() {
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
                    console.log(result)
                })
                .catch(error => {
                    showError(error);
                });
        });
}
function getHotels() {
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
                result.forEach(data=>{
                    new Hotel(data.picture,data.name,data.description,data.rate,data.contact,data.price)
                })
            })
            .catch(error => {
                showError(error);
            });
});
function Hotel(img,name,discription,rate,contact,price){
    this.img = img,
    this.name = name,
    this.discription = discription,
    this.rate = rate,
    this.contact = contact,
    this.price = price,
    this.render(this)
}
Hotel.prototype.render = (source) =>{
    let cardTemplate = $('#hotTemp').html();
    let cardHtmlData = Mustache.render(cardTemplate,source);
    console.log(cardHtmlData)
    $('#hotel').append(cardHtmlData);
}
//     console.log(ajaxSettingsTwo)
//     $.ajax('/token', ajaxSettingsTwo)
//         .then(result => {
//             console.log(result)
//         })
//         .catch(error => {
//             showError(error);
//         });
}
getLocation()
getWeather()
getResturants()
getTouristic()
getHotels()