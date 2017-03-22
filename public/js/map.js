var currentMap;

$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });
});


function updateMarkers(){
  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

  drawMarker('hotel', [40.705137, -74.007624]);
  drawMarker('restaurant', [40.705137, -74.013940]);
  drawMarker('activity', [40.716291, -73.995315]);
}

var day = 2;
var hotels = [null, [],[],[]];
var restaurants = [null, [],[],[]];
var activities = [null, [],[],[]];

var $activitylist = $('#activitylist');
var $hotellist = $('#hotellist');
var $restaurantlist = $('#restaurantlist');

function megaclear() {
  $hotellist.empty();
  $restaurantlist.empty();
  $activitylist.empty();
}

function megapopulate() {
  hotels[day].forEach(function(hotel) {
    $hotellist.append(hotel);
  });
  restaurants[day].forEach(function(restaurant) {
    $restaurantlist.append(restaurant);
  });
  activities[day].forEach(function(activity) {
    $activitylist.append(activity);
  });
}

function mega() {
  megaclear();
  megapopulate();
}

function changeDay(day) {
  $('#day-text').empty();
  $('#day-text').append('Day ' + day);
}

$("#removeDay").on("click", function(){
  hotels.splice(day, 1);
  hotels.push([]);

  restaurants.splice(day, 1);
  restaurants.push([]);

  activities.splice(day, 1);
  activities.push([]);

  mega();
})

//here, 'this' points to whatever's clicked
$("#day1").on("click", function(){
  $(this).addClass("current-day");
  $('#day' + day).removeClass('current-day');
  day = 1;
  changeDay(day);
  mega();
})

$('#day2').on('click', function(){
  $(this).addClass('current-day');
  $('#day' + day).removeClass('current-day');
  day = 2;
  changeDay(day);
  mega();
})

$('#day3').on('click', function(){
  $(this).addClass('current-day');
  $('#day' + day).removeClass('current-day');
  day = 3;
  changeDay(day);
  mega();
})

$('#hoteladd').on('click', function() {
  var $hotelchoice = $('#hotel-choices').val();
  hotels[day].push($hotelchoice);
  mega();
  updateMarkers();
  //$hotellist.append($hotelchoice);
})

$('#restaurantadd').on('click', function() {
  var $restaurantchoice = $('#restaurant-choices').val();
  restaurants[day].push($restaurantchoice);
  mega();
  //$restaurantlist.append($restaurantchoice);
})

$('#activityadd').on('click', function() {
  var $activitychoice = $('#activity-choices').val();
  activities[day].push($activitychoice);
  mega();
  //$activitylist.append($activitychoice);
})

$('#hotelremove').on('click', function() {
  var $hotellist = $('#hotellist');
  hotels[day].pop();
  mega();
})

$('#restaurantremove').on('click', function() {
  var $restaurantlist = $('#restaurantlist');
  restaurants[day].pop();
  mega();
})

$('#activityremove').on('click', function() {
  var $activitylist = $('#activitylist');
  activities[day].pop();
  mega();
})
