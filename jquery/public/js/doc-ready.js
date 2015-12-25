$(document).ready(function() {
  $('a').click(function (event) {
    //event.preventDefault();
    $('a').addClass('sample');
    alert('Will continue to open the link.');
  });
});