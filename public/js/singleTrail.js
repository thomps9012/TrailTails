$(document).ready(function () {
const trailTails = require('./trailTails.js');
trailTails.trailInfo();

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
});