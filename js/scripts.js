$( document ).ready(function() {

  "strict";
  var src = "";
  var week = ["one", "two", "three", "four", "five", "six", "seven"];
  $.each(week, function (index, value) {
      src += '<h2 class="font-weight-light text-light"><a class="btn btn-primary" data-toggle="collapse" href="#collapse_day'+index+'" role="button" aria-expanded="false" aria-controls="collapse_day">'+index+'</a></h2><div class="collapse" id="collapse_day'+index+'"></div>';
  });
  $("#monthly_calendar").html(src);

  var flyer = "";
  $.each(week, function (index, value) {
    flyer ='<div class="col-md-4 mb-5"><div class="card h-100 bg-dark"><div class="card-body"><img class="img-fluid rounded mb-4 mb-lg-0" src="./assets/epdx_logo.png" alt="..." /><h2 class="card-title text-light">GAY BEHAVIOR: DJ SOUP and EMOJI HEAP</h2><p class="card-text text-success">gay people. gay music. all you need for your queer desires.</p></div><div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">more info</a><a class="btn btn-primary btn-sm" href="#!">save event</a></div></div></div>';
    $("#collapse_day"+index).html(flyer);
  });


});
