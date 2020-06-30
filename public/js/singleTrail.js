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
          iFrameEl.css("margin-top", "125px")
          iFrameEl.css("margin-bottom", "50px")
          iFrameEl.css("margin-left", "50px")
          // $(".directionsEl").css("color", "black")
          localStorage.setItem("trailId", trailResponse.trails[0].id)
          localStorage.setItem("trailName", trailResponse.trails[0].name)

          var imageParentDiv = $("#imageParentDiv")
          var imageEl = $("<img>")
          imageEl.addClass("d-block w-100 carousel-inner")
          imageEl.css("height", "95%")
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

// var posSign = function(num) {
//     return num > 0 ? '+' + num : String(num);
// }

// var langDict = {
//     'eng': {
//         weekDay: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
//         timeOfDay: ['night', 'morning', 'day', 'evening'],
//         windDir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'SW'],
//         windSpeedUnit: 'm/sec',
//         pressureUnit: 'mmHg',
//         copyright: 'Data from <a href="http://openweathermap.org/">OpenWeatherMap</a>'
//     }, 
//     'rus': {
//         weekDay: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
//         timeOfDay: ['ночь', 'утро', 'день', 'вечер'],
//         windDir: ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'],
//         windSpeedUnit: 'м/с',
//         pressureUnit: 'м.р.с.',
//         copyright: 'По данным <a href="http://openweathermap.org/">OpenWeatherMap</a>'
//     }
// }

// var defaultCityIDs = [1850147,1273294,1816670,1185241,3688357,3435910,1701668,2988506,1642911,1835848,3936456,2643743,2314302,112931,1819729,3117735,98182,3871336,1880252,2240449,188714,2293538,323784,323786,3369157,2950159,184745,3646738,1138958,2253354,344979,2306104,1512569,3718426,3492908,2352778,587084,2357048,2460596,1070940,625144,2538475,909137,2422465,3054643,3911925,3441575,232422,3652462,2260535,3583361,1733046,890299,964137,2673730,2595294,2028462,250441,727011,1040652,658226,2964574,611717,616051,3600949,6611854,2759794,1283240,202061,3617763,2279755,2409306,2394819,1176615,6453366,1528675,1651944,281184,2464470,2377450,927967,2274895,2389853,7280679,456172,6322737,3186886,2399697,162183,1526273,425378,3489854,593116,2413876,785842,223817,1018725,3060972,2374775,2179537,588409,2172517,3191281,3352136,2661552,2088122,2392087,3903987,3383330,3196359,373303,3571824,932505,160196,933773,2562305,1645457,2198148,3193044,934154,2309527,4033936,1282027,3378644,1238992,3513090,1252416,2960316,282239,2108502,3382160,934985,5881576,7828758,921772,2110257,3577154,4035413,2993458,2113779,2411586,3041563,1820906,3582672,2110425,7521431,2110384,3042030,3168070,3426691,2069194,4036284,7303944,3169070,2800866,2618425,6458923,264371,786714,792680,683506,618426,703448,170654,276781,146268,2761367,3067696,756135,3553478,3530597,4140963,6094817,5419384,4684888,5368361,6173331,1275339,292968,71137,360630,2210247,2507480,3469058,3439389,3663517,3688689,3662574,6183235,5946768,5876855,4180439];

// var defaultLocalDateProvider = function(lat, lng) {
//     var def = $.Deferred();
//     $.getJSON('http://maps.kosmosnimki.ru/rest/ver1/layers/295894E2A2F742109AB112DBFEAEFF09/search', {
//         border: JSON.stringify({type: 'Point', coordinates: [lng, lat]}),
//         geometry: false,
//         api_key: 'Y5YMN9XSOC'
//     }).then(function(result) {
//         def.resolve(Number(result.features[0].properties.name));
//     }, def.reject.bind(def))

//     return def.promise();
// };

// L.OWMLayer = L.Class.extend({
//     getAttribution: function() {
//         return 'Weather from <a href="http://openweathermap.org/" alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>';
//     },
//     initialize: function(options) {
//         options = options || {};
//         var cityIDs = (options.cityIDs || defaultCityIDs).slice(0);
        
//         this._cityIDChunks = [];
//         while (cityIDs.length) {
//             this._cityIDChunks.push(cityIDs.splice(0, 100));
//         }
        
//         this._lang = options.language || 'eng';
//         this._key = options.key;
//         this._timeShiftProvider = options.timeShiftProvider || defaultLocalDateProvider;
//     },
//     _icons: {
//         '01d': '0.png',
//         '01n': '0.png',
//         '02d': '1.png',
//         '02n': '1.png',
//         '03d': '2.png',
//         '03n': '2.png',
//         '04d': '3.png',
//         '04n': '3.png',
//         '09d': '5.png',
//         '09n': '5.png',
//         '10d': '4.png',
//         '10n': '4.png',
//         '11d': '8.png',
//         '11n': '8.png',
//         '13d': '6.png',
//         '13n': '6.png',
//         '50d': '9.png',
//         '50n': '9.png'
//     },
//     _template: Handlebars.compile(
//         '<div class="owm-city-name">{{cityName}}</div>' +
//         '<table class="owm-forecast-table"><tbody>' +
//             '{{#forecast}}<tr>' +
//                 '<td>{{dayInfo}}</td>' +
//                 '<td>{{tempMin}}..{{tempMax}}</td>' +
//                 '<td>{{windDir}}</td>' +
//                 '<td>{{windSpeed}}</td>' +
//                 '<td>{{pressure}}</td>' +
//                 '<td>{{humidity}}%</td>' +
//                 '<td><img width=16 height=16 src="http://maps.kosmosnimki.ru/api/img/weather/16/{{icon}}"></img></td>' +
//             '</tr>{{/forecast}}' +
//         '</tbody></table>' + 
//         '<div class="owm-city-copyright">{{{copyright}}}</div>'),
//     onAdd: function(map) {
//         if (this._markers) {
//             map.addLayer(this._markers);
//             return;
//         };
        
//         var _this = this;
        
//         var requests = this._cityIDChunks.map(function(cityIDs) {
//             var params = {id: cityIDs.join(','), units: 'metric'};
//             if (_this._key) {
//                 params.APPID = _this._key;
//             }
//             return $.getJSON('http://api.openweathermap.org/data/2.5/group', params);
//         });
        
//         $.when.apply($.when, requests).then(function() {
//             var list = [];
            
//             for (var i = 0; i < arguments.length; i++) {
//                 list = list.concat(arguments[i][0].list);
//             }
            
//             _this._markers = L.layerGroup();
            
//             list.forEach(function(city) {
//                 var marker = L.marker([city.coord.lat, city.coord.lon], {
//                     icon: L.icon({
//                         iconUrl: 'http://maps.kosmosnimki.ru/api/img/weather/24/' + _this._icons[city.weather[0].icon],
//                         iconAnchor: [12, 12]
//                     })
//                 }).on('click', function() {
//                     marker.unbindPopup();
                    
//                     var params = {id: city.id, units: 'metric'};
//                     if (_this._key) {
//                         params.APPID = _this._key;
//                     }
                    
//                     $.when(
//                         $.getJSON('http://api.openweathermap.org/data/2.5/forecast', params),
//                         _this._timeShiftProvider(city.coord.lat, city.coord.lon)
//                     ).then(function(owmRes, timeShift) {
//                         var owmData = owmRes[0],
//                             dict = langDict[_this._lang];
                            
//                         var forecastData = [];
//                         var html = '';
//                         for (var t = 0; t < 4; t++) {
//                             var f = owmData.list[2 * t + 1]; //each 6 hours

//                             if (!f) continue;

//                             var localTime = new Date(f.dt*1000 + timeShift*3600*1000),
//                                 localWeekDay = localTime.getUTCDay(),
//                                 localHours = localTime.getUTCHours();
                            
//                             forecastData.push({
//                                 dayInfo: dict.weekDay[localWeekDay] + ', ' + dict.timeOfDay[Math.floor(localHours/6)],
//                                 tempMin: posSign(Math.round(f.main.temp_min)),
//                                 tempMax: posSign(Math.round(f.main.temp_max)),
//                                 windDir: dict.windDir[Math.round(f.wind.deg/45) % 8],
//                                 windSpeed: Math.round(f.wind.speed) + ' ' + dict.windSpeedUnit,
//                                 pressure: Math.round(f.main.pressure * 0.75006375541921) + ' ' + dict.pressureUnit,
//                                 humidity: Math.round(f.main.humidity),
//                                 icon: _this._icons[f.weather[0].icon]
//                             });
//                         }
                        
//                         marker.bindPopup(_this._template({
//                             forecast: forecastData, 
//                             cityName: owmData.city.name, 
//                             copyright: dict.copyright
//                         }), {maxWidth: 500}).openPopup();
//                     })
//                 });
                
//                 _this._markers.addLayer(marker);
//             })
            
//             map.addLayer(_this._markers);
//         });
//     },
    
//     onRemove: function(map) {
//         map.removeLayer(this._markers);
//     }
// })

// })();
 

// $.get('apiCall')
//       .then(function(response) {
//           var $carousel = $('#carouselExampleIndicators');
//           var $carouselInner = $carousel.find('.carousel-inner');

//           response.data.forEach(function(item, i) {
//             var template = '';

//             if(i === 0) {
//               template = '<div class="carousel-item active">';
//             } else {
//               template = '<div class="carousel-item">';
//             }
            
//             template += '<img class="d-block w-80" src="' + item.image + '" alt="Second slide">'; 
//             template += '<div class="carousel-caption">';
//             template += '<h5>' + item.title_a + '</h5>';
//             template += '<p>' + item.category + '</p>';
//             template += '</div>';
//             template += '</div>';

//             $carouselInner.append(template);
//           })

//           $carousel.carousel();
//       })
})
