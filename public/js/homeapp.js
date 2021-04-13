
const leftImg =document.getElementById('left');


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
            console.log(leftIndex,rightIndex,middleIndex)
            leftImg.src=result[leftIndex].image;
            $('$left-h').innerHTML=result[leftIndex].image

            var template =$('#template').innerHTML;
            var rendered = Mustache.render(template, result[leftIndex]);
            $('#left').innerHTML = rendered;
        });
        
    })
    

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }