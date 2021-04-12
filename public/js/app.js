console.log("we are connected");
const search_query= 'rome';





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
    //   .catch(error => {
    //     showError(error);
    //   });
  }

  function getTouristic() {
    const ajaxSettings = {
      method: 'get',
      dataType: 'json',
      data: {city:search_query},
    };
    $.ajax('/touristic', ajaxSettings)
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
    $.ajax('/hotels', ajaxSettings)
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