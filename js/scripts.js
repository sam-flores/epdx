$( document ).ready(function() {

    "strict";
    var src = "";
    var weeks = ["one", "two", "three", "four"];
    var days = ["one", "two", "three", "four", "five", "six", "seven"];

    // loop through weeks
    $.each(weeks, function (week, valuee) {

      src += '<div id="week'+week+'" class="btn-group" role="group" aria-label="Basic Example"></div><div id="flyers'+week+'"></div>'
    });

    // add src to collapse month
    $("#collapse_month").html(src);

    //reset src
    src = "";

    $.each(weeks, function (week, valuee) {

      // loop through days
      $.each(days, function (index, value) {
          src += '<button class="calendar_days" id="'+week+index+'">day'+week+index+'</button>';
      });

      // add src to week div
      $("#week"+week).html(src);

      // reset src
      src = "";

      // add a flyer section underneath each day
      $.each(days, function (index, value) {
          src += '<div style="color: white; display: none;" id="day'+week+index+'"></div>';
      });

      // add src to flyer divs
      $("#flyers"+week).html(src);

      src = "";
      // hard coded for now
      var flyers = ["one", "two", "three"];

      // loop through days of week
      $.each(days, function (index, value) {
        // loop through flyers for day
        src = '<div style="color: white; font-size: 32px;">day'+week+index+'</div>';
        $.each(flyers, function (flyer, val) {
          src +='<div class="col-md-4 mb-5"><div class="card h-100 bg-dark"><div class="card-body"><img class="img-fluid rounded mb-4 mb-lg-0" src="./assets/epdx_logo.png" alt="..." /><h2 class="card-title text-light">GAY BEHAVIOR: DJ SOUP and EMOJI HEAP</h2><p class="card-text text-success">gay people. gay music. all you need for your queer desires.</p></div><div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">more info</a><a class="btn btn-primary btn-sm" href="#!">save event</a></div></div></div>';
        });
        // add flyers to day
        $("#day"+week+index).html(src);
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
        $.each(weeks, function (week, valuee) {
          $("#week" + week).show();
        });
      }
      // shift to week view
      else{
      $.each(weeks, function (week, valuee) {
        // hide all weeks except for selected
        if(week.toString() != e.target.id.substring(0,1)) $("#week" + week).hide();
        $.each(days, function (index, value) {
          $("#day" + week+index).hide();
        });
      });
      // scroll to flyers animation
      $("#day" + e.target.id).toggle();
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#week"+e.target.id.substring(0, 1)).offset().top
        }, 15);
      }
    });

});
