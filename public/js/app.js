console.log('11111111111');
  // ----------- user page -----------------------------------------

  //  $('#details-container').clone();
   
  //  $('hotels-button').on('click',hotelsDetails);

  //  function hotelsDetails(){
  //   const ajaxSettings = {
  //     method: 'get',
  //     dataType: 'json',
  //     data: {city:search_query},
  //   };
  //   $.ajax('/userPage', ajaxSettings)
  //     .then(result => {
  //       console.log(result)
  //     })
  //     .catch(error => {
  //       showError(error);
  //     });
  //  }
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