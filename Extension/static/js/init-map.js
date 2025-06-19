// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 25.683735, lng: 68.736162};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 9, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}