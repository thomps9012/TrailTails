$(document).ready(function () {

  var trailId = window.location.href.substring(34)
  var apiKey = "200712211-0e0047c0b205b2d2705a464dd36eccec";

  var trailIdURL = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + trailId + '&key=' + apiKey;
  let currentDay;

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
    var currentDay = weekday[d.getDay()];
    return currentDay
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
     
      
      currentDay = day()

      createWeatherForecast(data, currentDay)

      data.daily.forEach(item => {
        let dayTemp = item.day.temp
        // createWeeklyForecasts(dayTemp)
        })
    });
  };
  // appending weather data to carousel card
  function createWeatherForecast(data, currentDay) {
    var todaysDate = new Date ()
    var currentMonth = todaysDate.getMonth() + 1
    var today = todaysDate.getDate()
    // console.log(currentMonth, today)
    console.log(data.current.weather[0])
    //create html content for current weather
    var weatherCarousel = $("<div>").addClass("card card-weather");
    var cardBody = $("<div>").addClass("card-body");
    var weatherDate = $("<div>").addClass("weather-date-location");
    var day = $("<h3>").text(currentDay);
    var date = $("<p>").addClass("text-gray")
    var spanEl = $("<span>")
    spanEl.addClass("weather-date")
    spanEl.text(currentMonth + "/" + today)
    date.append(spanEl)
    var weatherData = $("<div>").addClass("weather-data d-flex");
    var auto = $("<div>").addClass("mr-auto");
    var temp = $("<h4>").addClass("display-3")
    temp.text(data.current.temp)
    var spanEl2 = $("<span>")
    spanEl2.addClass("symbol")
    spanEl2.text("°F");
    temp.append(spanEl2)
    var description = $("<p>").text(data.current.weather[0]["main"]);
    var weeklyBody = $("<div>").addClass("card-body p-0");
    var weeklyFlex = $("<div>").addClass("d-flex weakly-weather");
    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0]["icon"] + "@4x" + ".png")
    
    //merge and add to page
    weeklyBody.append(weeklyFlex);
    cardBody.append(weatherDate, day, date, img, description, weatherData, auto, temp);
    weatherCarousel.append(cardBody, weeklyBody);
    $("#currentWeather").append(weatherCarousel);
  }

  function createWeeklyForecasts(dayTemp) {
    var weeklyItem = $("<div>").addClass("weakly-weather-item");
    var weeklyDay = $("<p>").addClass("mb-1").text(day++)
    var weeklyTemp = $("<p>").addClass("mb-0").text(dayTemp + "°F")
    weeklyBody.append(weeklyItem, weeklyDay, weeklyTemp)

  }

  $.ajax({
            url: trailIdURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (trailResponse) {
          console.log(trailResponse)
          var iFrameEl = $("#directionMap")
          var originLat = localStorage.getItem("locationLat")
          var originLong = localStorage.getItem("locationLong")
          var trailLat = trailResponse.trails[0].latitude
          var trailLong = trailResponse.trails[0].longitude
          var srcURL = "https://www.google.com/maps/embed/v1/directions?origin=" + originLat + "," + originLong + "&destination=" + trailLat + "," + trailLong + "&key=AIzaSyDWH78cK63EUcdoo_tn0jlVn0sskHOb4ZI"
          iFrameEl.attr("src", srcURL)
          var mapHeader = $("#mapHeader")
          mapHeader.text("Directions to " + trailResponse.trails[0].name)
          localStorage.setItem("trailId", trailResponse.trails[0].id)
          localStorage.setItem("trailName", trailResponse.trails[0].name)

          var imageParentDiv = $("#imageParentDiv")
          var imageEl = $("<img>")
          imageEl.addClass("d-block w-100 carousel-inner")
          imageEl.css("height", "100%")
          imageEl.attr("alt", "First slide")
          imageEl.attr("src", trailResponse.trails[0].imgMedium)
          imageParentDiv.append(imageEl)


          var trailInfoDiv = $("#trailInfoDiv")
          var trailNameEl = $("<h5>")
          trailNameEl.text(trailResponse.trails[0].name)
          var trailLocationEl = $("<p>")
          trailLocationEl.text(trailResponse.trails[0].location)
          var trailLatLongEl = $("<p>")
          trailLatLongEl.text("Longitude: " + trailLong + " / " + "Latitude: " + trailLat)
          var buttonEl = $("<button>")
          buttonEl.text("Trail Info")
          buttonEl.addClass("btn btn-primary")
          buttonEl.attr("id", "modalBtn")
          buttonEl.attr("type", "submit")
          buttonEl.attr("data-toggle", "modal")
          buttonEl.attr("data-target", "#trailModal")
          buttonEl.css("margin", "5px")
          var reviewButtonEl = $("<a>")
          reviewButtonEl.text("Leave Review")
          reviewButtonEl.css("appearance", "button")
          reviewButtonEl.addClass("btn btn-primary")
          reviewButtonEl.attr("id", "reviewBtn")
          reviewButtonEl.attr("href", "/review")
          reviewButtonEl.css("margin", "5px")
          var saveTrailBtnEl = $("<button>")
          saveTrailBtnEl.addClass("btn btn-primary")
          saveTrailBtnEl.attr("id", "saveTrail")
          saveTrailBtnEl.text("Save Trail")
          saveTrailBtnEl.css("margin", "5px")

          trailInfoDiv.append(trailNameEl, trailLocationEl, trailLatLongEl, buttonEl, reviewButtonEl, saveTrailBtnEl)

          callWeather(trailLat, trailLong);

        })   

  // Save trail for user  
  $(document).on("click", "#saveTrail", function (event) {
    var trailId = localStorage.getItem("trailId")

    $.post("/api/saveTrail/" + trailId, function () {
      console.log("Saved Trail Successful")
    })
      .fail(function () {
        console.log("Something went wrong.")
      })
      
    })

 


        


 
 
  

// google maps javascript
// REQUIRES jquery.livequery
  //  $('.google-map iframe:visible').livequery(function() {
  //    var mapFrame = $(this);
  //    if (!$(mapFrame).hasClass('map-refreshed')) {
  //      mapFrame.attr('src', mapFrame.attr('src')+'');
  //      mapFrame.addClass('map-refreshed');
  //   }
// });
// function initMap() {
//         var directionsRenderer = new google.maps.DirectionsRenderer;
//         var directionsService = new google.maps.DirectionsService;
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 7,
//           center: {lat: 41.85, lng: -87.65}
//         });
//         directionsRenderer.setMap(map);
//         directionsRenderer.setPanel(document.getElementById('right-panel'));

//         var control = document.getElementById('floating-panel');
//         control.style.display = 'block';
//         map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

//         var onChangeHandler = function() {
//           calculateAndDisplayRoute(directionsService, directionsRenderer);
//         };
//         document.getElementById('start').addEventListener('change', onChangeHandler);
//         document.getElementById('end').addEventListener('change', onChangeHandler);
//       }

//       function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//         var start = document.getElementById('start').value;
//         var end = document.getElementById('end').value;
//         directionsService.route({
//           origin: start,
//           destination: end,
//           travelMode: 'DRIVING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsRenderer.setDirections(response);
//           } else {
//             window.alert('Directions request failed due to ' + status);
//           }
//         });
//       }

//openweather map api and javascript
// (function() {






// google maps api call

// appending google maps iframe to carousel card

})
