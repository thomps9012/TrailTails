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
});