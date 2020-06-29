$(document).ready(function () {
  var trailId = window.location.href.substring(34)
  var apiKey = "200712211-0e0047c0b205b2d2705a464dd36eccec";
  var trailIdURL = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + trailId + '&key=' + apiKey;

  $.ajax({
            url: trailIdURL,
            method: "GET",
            dataType: "JSON",
        }).then(function (trailResponse) {
          console.log(trailResponse)
          localStorage.setItem("trailId", trailResponse.trails[0].id)
          localStorage.setItem("trailName", trailResponse.trails[0].name)


        })


<<<<<<< HEAD
  // Save trail for user  
  $("#saveTrail").click(function () {
    var trailId = localStorage.getItem("trailId")

    $.post("/api/saveTrail/" + trailId)
      .then(function (response) {
        console.log(response)
      })
  })
  
  
  
  // Functionality to save review

  function saveReview () {
    var hashtags = []

    $("#addHashtag").click(function () {
      var hashtagVal = $("#hashtag").val().trim()
      hashtags.push(hashtagVal)
      var newTextVal = "#" + hashtagVal
      var parentDiv = $("#addedHashtags")
      var hashTagBadge = $('<span />')
      hashTagBadge.addClass("badge badge-pill badge-primary")
      hashTagBadge.text(newTextVal)
      parentDiv.append(hashTagBadge)
      $("#hashtag").val("")

    })

    var reviewForm = $("form.reviewForm")
    reviewForm.on("submit", function () {
      event.preventDefault()

      var title = $("#title").val().trim()
      var overallStars = $("#overallStars").val().trim()

      var difficultyStars = $("#difficultyStars").val().trim()
      var review = $("#body").val().trim()
      var hashtagString = hashtags.toString()

      var currentTrailName = localStorage.getItem("trailName")
      var currentTrailId = localStorage.getItem("trailId")

      var data = {
        title: title,
        trailName: currentTrailName,
        trailId: currentTrailId,
        overallStars: parseInt(overallStars),
        difficultyStars: parseInt(difficultyStars),
        review: review,
        hashtags: hashtagString
      }

      // POST route to create review

      $.post("/api/createReview", data)
        .then(function (response) {
          console.log(response)
        })

    });
  }


        


 
=======
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
>>>>>>> 886640c17134ee41cce9e624c4622f3ae3dfc944
 
  

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
