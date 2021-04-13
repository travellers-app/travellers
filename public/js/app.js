  $(document).ready(userFunction);
  $('#details-hotels').hide();
  $('#details-resturants').hide();
  $('#details-touristical').hide();
  function userFunction(){
    $('#hotels-button').on('click',()=>{
      $('#details-hotels').show();
      $('#details-resturants').hide();
      $('#details-touristical').hide();
      console.log('1111112')
    })
    $('#resturants-button').on('click',()=>{
      $('#details-hotels').hide();
      $('#details-resturants').show();
      $('#details-touristical').hide();
      console.log('1111113');
    })
    $('#touristical-button').on('click',()=>{
      $('#details-hotels').hide();
      $('#details-resturants').hide();
      $('#details-touristical').show();
      console.log('1111114');

    })
  }
console.log("we are connected");
const search_query = 'london';
let lon;
let lat;
// let lon = 0.1278;
// let lat = 51.5074;
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
                console.log(result)
            })
            .catch(error => {
                showError(error);
            });
    });
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