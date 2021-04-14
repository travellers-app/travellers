let search_query;
let hotelAll=[];
let resturentAll=[];
let tourAll=[];
let lon;
let lat;

  $(document).ready(userFunction)
  $('#details-touristical').hide();
  $('#details-hotels').hide();
  $('#details-resturants').hide();
  $('#details-weather').hide();
  function userFunction(){
    $('#hotels-button').on('click',()=>{
      $('#details-hotels').show();
      $('#details-resturants').hide();
      $('#details-touristical').hide();
      $('#details-weather').hide();
      console.log('1111112')
    })
    $('#resturants-button').on('click',()=>{
      $('#details-hotels').hide();
      $('#details-touristical').hide();
      $('#details-weather').hide();
      $('#details-resturants').show();

      console.log('1111113');
    })
    $('#touristical-button').on('click',()=>{
      $('#details-touristical').show();
      $('#details-hotels').hide();
      $('#details-resturants').hide();
      $('details-weather').hide();
      console.log('1111114');

    })
    $('#Weather-button').on('click',()=>{
        $('#details-hotels').hide();
        $('#details-resturants').hide();
        $('#details-touristical').hide();
        $('#details-weather').show();


    })
    $('#delete-button').on ('click',()=>{

    })
  }



$(document).ready(renderSearhPage)
function renderSearhPage() {
 search_query;
 hotelAll=[];
 resturentAll=[];
 tourAll=[];
 lon;
 lat;
    $('#searchBtu').on('click', (event) => {
        event.preventDefault();
        search_query = $('#to').val().toLowerCase();
        getLocation();
        getWeather();
        getResturants();
        getTouristic();
        getHotels();
    })
    $('#button').on('click',(event)=>{
        event.preventDefault();
       $('#fromCity').val($('#from').val());
       $('#city').val(search_query);
       $('#lon').val(lon);
       $('#lat').val(lat);
       let length=$('.hotel-box').children().prevObject.length;
       let index;
       for(let i=0 ; i<length;i++){
        const box = $('.hotel-box').eq(i);
        if( box[0].checked===true){
            index=i;
            break;
        }else{
            index=0;
        }
       }

                 
       $('#hotel').val(hotelAll[index].name);
       $('#contact').val(hotelAll[index].contact)
       $('#checkin').val($('#start').val());
       $('#checkout').val($('#end').val());
        length=$('.resturent-box').children().prevObject.length;
        index;
       for(let i=0 ; i<length;i++){
        const box = $('.resturent-box').eq(i);
        if( box[0].checked===true){
            index=i;
            break;
        }else{
            index=0;
        }
       }

       $('#returant').val(resturentAll[index].name);
       $('#resturantimg').val(resturentAll[index].img);
       $('#resturanturl').val(resturentAll[index].contact);
       length=$('.tour-box').children().prevObject.length;
       index;
      for(let i=0 ; i<length;i++){
       const box = $('.tour-box').eq(i);
       if( box[0].checked===true){
           index=i;
           break;
       }else{
           index=0;
       }
      }

       $('#touristic').val(tourAll[index].name);
       $('#touristicimg').val(tourAll[index].img);
       $('#discrp').val(tourAll[index].discription);
       console.log ($('#hotel').val(),
       $('#contact').val(),
       $('#checkin').val(),
       $('#checkout').val(),$('#returant').val(),
       $('#resturantimg').val(),
       $('#resturanturl').val(),$('#touristic').val(),
       $('#touristicimg').val(),
       $('#discrp').val())  ;
       $('#save-form').submit()


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
        hotelAll.push(this)
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
        resturentAll.push(this)
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
        tourAll.push(this);
}

Tour.prototype.render = (source) => {
    let cardTemplate = $('#tourTemp').html();
    let cardHtmlData = Mustache.render(cardTemplate, source);
    $('#touristic').append(cardHtmlData);
}