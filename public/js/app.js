console.log("we are connected");
const search_query= '';





function getLocation() {
    const ajaxSettings = {
      method: 'get',
      dataType: 'json',
      data: {city:search_query},
    };
    $.ajax('/location', ajaxSettings)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        showError(error);
      });
  }

  function getWeather() {
    const ajaxSettings = {
      method: 'get',
      dataType: 'json',
      data: {city:search_query},
    };
    $.ajax('/weather', ajaxSettings)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        showError(error);
      });
  }


  function getResturants() {
    const ajaxSettings = {
      method: 'get',
      dataType: 'json',
      data: {city:search_query},
    };
    $.ajax('/resturants', ajaxSettings)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        showError(error);
      });
  }

  function getTouristic() {
    const ajaxSettings = {
      method: 'get',
      dataType: 'json',
      data: {city:search_query},
    };
    $.ajax('/token2', ajaxSettings)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        showError(error);
      });
  }

  function getHotels() {
    const ajaxSettings = {
      method: 'get',
      dataType: 'json',
      data: {city:search_query},
    };
    $.ajax('/token', ajaxSettings)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        showError(error);
      });
  }


  getLocation()
  getWeather()
  getResturants()
  getTouristic()
  getHotels()





