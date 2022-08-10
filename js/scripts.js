$( document ).ready(function() {

    "strict";
    var src = "";
    var weeks = ["one", "two", "three", "four", "five"];
    var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    var calendar_days = [];

    // get first day of CURRENT MONTH
    var date = new Date();
    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date();
    var first_day = start.getDay();
    start.setDate(start.getDate() - first_day - 1); // track back to sunday of that week
    end.setDate(start.getDate() + 30 + first_day); // finish the block of the month
    var loop = new Date(start);
    while(loop <= end){
       console.log(loop);
       calendar_days.push(loop);
       var newDate = loop.setDate(loop.getDate() + 1);
       loop = new Date(newDate);
    }

    // loop through weeks
    for(var week = 0; week < 5; week++){
      src += '<div id="week'+week+'" class="btn-group" role="group" aria-label="Basic Example"></div><div id="flyers'+week+'"></div>'
    }

    // add src to collapse month
    $("#collapse_month").html(src);

    //reset src
    src = "";

    for(var week = 0; week < 5; week++){
      // loop through days
      for(var day = 0; day < 7; day++){
        date = calendar_days[week*7 + day].getDate();
        src += '<button type="button" class="calendar_button" id="day'+date+'">'+date+'</button>';
      }

      // add src to week div
      $("#week"+week).html(src);

      // reset src
      src = "";

      // add a flyer section underneath each day
      for(var day = 0; day < 7; day++){
          date = calendar_days[week*7 + day].getDate();
          src += '<div style="color: white; display: none;" id="day'+date+'"></div>';
      }

      // add src to flyer divs
      $("#flyers"+week).html(src);

      src = "";
      // hard coded for now
      var flyers = ["one", "two", "three"];

      // loop through days of week
      for(var day = 0; day < 7; day++){
        date = calendar_days[week*7 + day].getDate();
        // loop through flyers for day
        src = '<div style="color: white; font-size: 32px;">day'+date+'</div>';
        $.each(flyers, function (flyer, val) {
          src +='<div class="col-md-4 mb-5"><div class="card h-100 bg-dark"><div class="card-body"><img class="img-fluid rounded mb-4 mb-lg-0" src="./assets/epdx_logo.png" alt="..." /><h2 class="card-title text-light">GAY BEHAVIOR: DJ SOUP and EMOJI HEAP</h2><p class="card-text text-success">gay people. gay music. all you need for your queer desires.</p></div><div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">more info</a><a class="btn btn-primary btn-sm" href="#!">save event</a></div></div></div>';
        });
        // add flyers to day
        $("#day"+date).html(src);
        src = "";// reset source for next day
      }
    }
    // hide all day divs except for selected
    // hide current day if visible and clicked

    // $("#collapse_month").click(function(e) {
    //   // come back to month view
    //   if($("#day" + e.target.id).is(":visible")){
    //     $("#day" + e.target.id).hide();
    //     // show all previously hidden weeks
    //     for(var week = 0; week < 5; week++){
    //       $("#week" + week).show();
    //     }
    //   }
    //   // shift to week view
    //   else{
    //   for(var week = 0; week < 5; week++){
    //     // hide all weeks except for selected
    //     if(week.toString() != e.target.id.substring(0,1)) $("#week" + week).hide();
    //     for(var day = 0; day < 7; day++){
    //       date = calendar_days[week*7 + day].getDate();
    //       $("#day" + date).hide();
    //     }
    //   }
    //   // scroll to flyers animation
    //   $("#day" + e.target.id).toggle();
    //     $([document.documentElement, document.body]).animate({
    //       scrollTop: $("#week"+e.target.id.substring(0, 1)).offset().top
    //     }, 15);
    //   }
    // });
    //
});
