$(document).ready(function () {

setTimeout(function () { choices(); }, 3000);

//console logging to ensure that trailid is in local storage
console.log(localStorage.getItem("trailId"))
 
 //appending trail information to the first carousel item
  $('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i=0;i<4;i++) {
    next=next.next();
    if (!next.length) {
      next=$(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});


 //weather call data
     function callWeather(traillat, traillong) {
        var weatherAPIKey = "bdc52f64afd883566cab72d748eec127";
        var forecastURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + traillat + "&lon=" + traillong + "&APPID=" + weatherAPIKey + "&units=imperial";

        $.ajax({
            url: forecastURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (data) {
            $("#currentWeather").empty();
            console.log(data);
            //appends weather data to a carousel item
            var title = $("<div class='modal-header'>").text("Current Weather");
            var card = $("<div>").addClass("card");
            var description = $("<p>").addClass("card-text").text("Description: " + data.weather[0].description);
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
            var mintemp = $("<p>").addClass("card-text").text("Min Temperature: " + data.main.temp_min + " °F");
            var maxtemp = $("<p>").addClass("card-text").text("Max Temperature: " + data.main.temp_max + " °F");
            var cardBody = $("<div>").addClass("modal-content");


            //merge and add to page
            cardBody.append(title, description, temp, mintemp, maxtemp, humid, wind);
            card.append(cardBody);
            $("#weatherModal").append(card);

        });
    }
});