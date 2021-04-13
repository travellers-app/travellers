'use strict';


$(document).ready(function () {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('/card.json', ajaxSettings)
        .then(result =>{
            let leftIndex = randomNumber(0, result.length -1);
            let middleIndex = randomNumber(0, result.length -1);
            let rightIndex = randomNumber(0, result.length -1);
            while(leftIndex===middleIndex || middleIndex===rightIndex || leftIndex===rightIndex ){
                leftIndex = randomNumber(0, result.length -1);
                middleIndex = randomNumber(0, result.length -1);
                rightIndex = randomNumber(0, result.length -1);
              }
            const template =$('#templet').html();

            const renderedOne = Mustache.render(template, result[leftIndex]);
            $('#left').append(renderedOne);

            const renderedTwo = Mustache.render(template, result[middleIndex]);
            $('#middle').append(renderedTwo);

            const renderedThree = Mustache.render(template, result[rightIndex]);
            $('#right').append(renderedThree);

        });
        
    })

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }