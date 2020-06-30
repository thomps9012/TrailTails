$(document).ready(function () {

  var trailId = window.location.href.substring(34)
  var apiKey = "200712211-0e0047c0b205b2d2705a464dd36eccec";

  var trailIdURL = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + trailId + '&key=' + apiKey;
  let currentDay;

  function capitalizeFirstLetters(string) {
    var lcStr = string.toLowerCase()
    var firstCapWords
    var wordArr = lcStr.split(" ")
    var newWordArr = []
    for (i = 0; i < wordArr.length; i++) {
      var firstChar = wordArr[i].charAt(0).toUpperCase()
      var word = firstChar + wordArr[i].substring(1)
      newWordArr.push(word)
    }

    firstCapWords = newWordArr.join(' ')
    return firstCapWords
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

      
      $("#currentWeather").empty();
      console.log(data);
     
      
      currentDay = day()

      createWeatherForecast(data, currentDay)

      data.daily.forEach(day =>{
        console.log(day)
        var dayTemp = Math.floor(day.temp.day)
        var icon = day.weather[0]["icon"]
        var dateNow = new Date(day.dt * 1000)
        var month = dateNow.getMonth() + 1
        var date = dateNow.getDate()
        var day = dateNow.getDay()
        let wordDay;

        switch(day) {
          case 0: 
            wordDay = "Sunday"
          break;
          case 1:
            wordDay = "Monday"
            break;
          case 2:
            wordDay = "Tuesday"
            break;
          case 3:
            wordDay = "Wednesday"
            break;
          case 4:
            wordDay = "Thursday"
            break;
          case 5:
            wordDay = "Friday"
            break;
          case 6:
            wordDay = "Saturday"
            break;
        }
        (wordDay, month, date)
        var today = wordDay + ", " + month + "/" + date

        createWeeklyForecasts(dayTemp, today, icon)
        })
    });
  };
  // appending weather data to carousel card
  function createWeatherForecast(data, currentDay) {
    var todaysDate = new Date ()
    var currentMonth = todaysDate.getMonth() + 1
    var today = todaysDate.getDate()
    //create html content for current weather
    var weatherHeader = $("<h5>").text("Current Weather")
    weatherHeader.addClass("text-center")
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
    temp.text(Math.floor(data.current.temp))
    var spanEl2 = $("<span>")
    spanEl2.addClass("symbol")
    spanEl2.text("°F");
    temp.append(spanEl2)
    var description = capitalizeFirstLetters(data.current.weather[0]["description"])
    var descriptionEl = $("<p>").text("Current Conditions: " + description);
    var weeklyBody = $("<div>").addClass("card-body p-0");
    var weeklyFlex = $("<div>").addClass("d-flex weakly-weather");
    weeklyFlex.attr("id", "weeklyFlex")
    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0]["icon"] + "@4x" + ".png")
    
    //merge and add to page
    auto.append(temp, descriptionEl, img)
    weatherData.append(auto)
    weatherDate.append(day, date)
    weeklyBody.append(weeklyFlex);
    cardBody.append(weatherHeader, weatherDate, weatherData);
    weatherCarousel.append(cardBody, weeklyBody);
    $("#currentWeather").append(weatherCarousel);
  }

  function createWeeklyForecasts(dayTemp, today, icon) {
    console.log("this")
    var weeklyFlex = $("#weeklyFlex")
    var weeklyItem = $("<div>").addClass("weakly-weather-item");
    var weeklyDay = $("<p>")
    var weeklyImg = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + icon  + ".png")
    weeklyDay.addClass("mb-1")
    weeklyDay.text(today)
    var weeklyTemp = $("<p>")
    weeklyTemp.addClass("mb-0")
    weeklyTemp.text(dayTemp + "°F")
    weeklyItem.append(weeklyDay, weeklyTemp, weeklyImg)
    weeklyFlex.append(weeklyItem)

  }

  $.ajax({
            url: trailIdURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (trailResponse) {
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

})
