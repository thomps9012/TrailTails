$(document).ready(function () {
  var trailId = localStorage.getItem("trailId");
  var searchLat = localStorage.getItem("searchLat");
  var searchLong = localStorage.getItem("searchLong");
  var trailLat = trailResponse.trails[i].latitude;
  var trailLong = trailResponse.trails[i].longitude;

  var apiKey = "200712211-0e0047c0b205b2d2705a464dd36eccec";

  var trailIdURL = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + trailId + '&key=' + apiKey;

  $.ajax({
            url: trailIdURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (trailResponse) {

          console.log(trailResponse)


        })


  $(".backup_img").on("error", function(){
        $(this).attr('src', "./assets/images/dog-2.jpg");
    });
    //creates cards with a trail infromation based off of Latitude and longitude
    function createTrailList(response, i) {
        var card = $("<div class='card'>");
        var cardBody = $("<div class='card-body'>");
        var title = $("<h3 class='card-title'>").text(response.trails[i].name);
        // var summary = $("<p class='card-text'>").text(response.trails[i].summary);
        var stars = $("<p class='card-text'>").text("Stars: " + response.trails[i].stars);
        var trailLength = $("<p class='card-text'>").text("Trail Length: " + response.trails[i].length + " miles");
        var condition = $("<p class='card-text'>").text("Trail condition: " + response.trails[i].conditionStatus);
        var hikeBtn = $("<button class='btn btn-primary stretched-link'>View Trail</button>");
        var trailId = $("<p class=" + response.trails[i].id + ">");
        //console.log(trailId)
        var src = response.trails[i].imgMedium;
        var img = $("<div class='card-img'>").css("background-image", "url('" + src + "')", 'backup_img');

        // merge and add to page
        cardBody.append(title, trailLength, stars, condition, hikeBtn, trailId);
        card.append(img, cardBody);
        $("#trailList").append(card);
        $('html, body').animate({
            scrollTop: ($('#trailList').offset().top)
        }, 500);
    }


// day of the week function
function day() {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var day = weekday[d.getDay()];
}

    // weather data api call
    function callWeather(traillat, traillong) {
            var weatherAPIKey = "bdc52f64afd883566cab72d748eec127";
            var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + traillat + "&lon=" + traillong + "&units=imperial&exclude=minutely,hourly&appid=" + weatherAPIKey;

            $.ajax({
                url: forecastURL,
                method: "GET",
                dataType: "JSON",
            }).then(function (data) {
                var i = 0;

                $("#currentWeather").empty();
                console.log(data);
                for (daily in data) {
                    i++;
                    createWeatherForecast(data, i);
                }
            });
     };
// appending weather data to carousel card
        function createWeatherForecast(data, i) {
            //create html content for current weather
           var weatherCarousel = $("<div>").addClass("card card-weather");
           var cardBody = $("<div>").addClass("card-body");
           
           var weatherDate = $("<div>").addClass("weather-date-location");
           var day = $("<h3>").text(day);
           var date = $("<p>").addClass("text-gray").span(addClass("weather-date").text(date.now()));
           
           var weatherData =$("<div>").addClass("weather-data d-flex");
           var auto = $("<div>").addClass("mr-auto");
           var temp = $("<h4>").addClass("display-3").text(data.current.temp).span(addClass("symbol").text("°")).text("F");
           var description =$("<p>").text(data.current.weather.main);
           
           var weeklyBody = $("<div>").addClass("card-body p-0");
           var weeklyFlex = $("<div>").addClass("d-flex weakly-weather");
           
           var weeklyItem = $("<div>").addClass("weakly-weather-item");

           
           var weeklyDay = $("<p>").addClass("mb-1").text(day++).("<i>").addClass("mdi mdi-weather-"+ data.weather.main);
           var weeklyTemp = $("<p>").addClass("mb-0").text(data.temp.day +"°F")


            //merge and add to page
            weeklyBody.append(weeklyFlex, weeklyItem, weeklyDay, weeklyTemp);
            cardBody.append(weatherDate, day, date);
            weatherCarousel.append(cardBody, weeklyBody);
            $("#currentWeather").append(weatherCarousel);

        });
    }



// google maps api call

// appending google maps iframe to carousel card

})
