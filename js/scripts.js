$( document ).ready(function() {

    "strict";
    var src = "";
    var weeks = ["one", "two", "three", "four"];
    var days = ["one", "two", "three", "four", "five", "six", "seven"];
    // loop through weeks
    $.each(weeks, function (indexx, valuee) {

      // loop through days
      $.each(days, function (index, value) {
          src += '<button id="'+indexx+index+'">day'+indexx+index+'</button>';
      });

      // add src to week div
      $("#week"+indexx).html(src);

      // reset src
      src = "";

      // add a flyer section underneath each day
      $.each(days, function (index, value) {
          src += '<div style="color: white; display: none;" id="day'+indexx+index+'"></div>';
      });

      // add src to flyer divs
      $("#flyers"+indexx).html(src);

      src = "";
      // hard coded for now
      var flyers = ["one", "two", "three"];

      // loop through days of week
      $.each(days, function (index, value) {
        // loop through flyers for day
        $.each(flyers, function (index, value) {
          src +='<div class="col-md-4 mb-5"><div class="card h-100 bg-dark"><div class="card-body"><img class="img-fluid rounded mb-4 mb-lg-0" src="./assets/epdx_logo.png" alt="..." /><h2 class="card-title text-light">GAY BEHAVIOR: DJ SOUP and EMOJI HEAP</h2><p class="card-text text-success">gay people. gay music. all you need for your queer desires.</p></div><div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">more info</a><a class="btn btn-primary btn-sm" href="#!">save event</a></div></div></div>';
        });
        // add flyers to day
        $("#day"+indexx+index).html(src);
        src = "";// reset source for next day
      });
    });

    // hide all day divs except for selected
    // hide current day if visible and clicked
    $("#collapse_month").click(function(e) {
      // come back to month view
      if($("#day" + e.target.id).is(":visible")){
        $("#day" + e.target.id).hide();
        // show all previously hidden weeks
        $.each(weeks, function (indexx, valuee) {
          $("#week" + indexx).show();
        });
      }
      // shift to week view
      else{
      $.each(weeks, function (indexx, valuee) {
        // hide all weeks except for selected
        if(indexx.toString() != e.target.id.substring(0,1)) $("#week" + indexx).hide();
        $.each(days, function (index, value) {
          $("#day" + indexx+index).hide();
        });
      });
      // scroll to flyers animation
      $("#day" + e.target.id).toggle();
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#day"+e.target.id).offset().top
        }, 15);
      }
    });

});
