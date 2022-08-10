$( document ).ready(function() {

    "strict";
    var src = "";
    var index = 0;
    var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    // create list of days for this month
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
       // console.log(loop);
       calendar_days.push(loop);
       var newDate = loop.setDate(loop.getDate() + 1);
       loop = new Date(newDate);
    }

    src += '<div id="day_words" class="btn-group" role="group"></div>';

    // loop through weeks
    for(var week = 0; week < 5; week++){
      src += '<div id="week'+week+'" class="btn-group" role="group"></div><div id="flyers'+week+'"></div>'
    }

    // add src to collapse month
    $("#collapse_month").html(src);

    //reset src
    src = "";
    for(var day = 0; day < 7; day++){
      src += '<button class="calendar_button" style="border: none">'+days[day]+'</button>';
    }
    $("#day_words").html(src);

    src = "";
    // add src code to week divs
    for(var week = 0; week < 5; week++){

      // create a button for each day of the week
      for(var day = 0; day < 7; day++){
        index = week*7 + day;
        date = calendar_days[index].getDate();
        src += '<button type="button" class="calendar_button" id="'+index+'">'+date+'</button>';
      }

      // add src to week div
      $("#week"+week).html(src);

      // reset src
      src = "";

      // add a flyer section underneath each day
      for(var day = 0; day < 7; day++){
          index = week*7 + day;
          date = calendar_days[index].getDate();
          src += '<div style="color: white; display: none;" id="day'+index+'">'+date+'</div>';
      }

      // add src to flyer divs
      $("#flyers"+week).html(src);

      src = "";
      // hard coded for now
      var flyers = ["one", "two", "three"];

      // loop through days of week
      for(var day = 0; day < 7; day++){
        index = week*7 + day;
        date = calendar_days[index].toDateString();
        // loop through flyers for day
        // src = '<div style="color: white; font-size: 16px; text-align: center;">'+date+'</div>';
        $.each(flyers, function (flyer, val) {
          src +='<div class="col-md-4 mb-5"><div class="card h-100 bg-dark"><div class="card-body"><img class="img-fluid rounded mb-4 mb-lg-0" src="./assets/epdx_logo.png" alt="..." /><h2 class="card-title text-light">GAY BEHAVIOR: DJ SOUP and EMOJI HEAP</h2><p class="card-text text-success">gay people. gay music. all you need for your queer desires.</p></div><div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">more info</a><a class="btn btn-primary btn-sm" href="#!">save event</a></div></div></div>';
        });
        // add flyers to day
        $("#day"+index).html(src);
        src = "";// reset source for next day
      }
    }
    // hide all day divs except for selected
    // hide current day if visible and clicked
    $("#collapse_month").click(function(e) {
      // come back to month view
      // check if e.target.id is valid
      if(event.target.type != "button") return;

      //get week
      selected_week = parseInt(e.target.id / 7);
      if($("#day" + e.target.id).is(":visible")){
        $("#day" + e.target.id).hide();
        $("#" + e.target.id).blur();
        // show all previously hidden weeks
        for(var week = 0; week < 5; week++){
          $("#week" + week).show();
        }
      }
      // shift to week view
      else{
      for(var week = 0; week < 5; week++){
        // hide all weeks except for selected
        if(week != selected_week) $("#week" + week).hide();

        for(var day = 0; day < 7; day++){
          index = week*7 + day;
          $("#day" + index).hide();
        }
      }
      // scroll to flyers animation
      $("#day" + e.target.id).show();
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#day_words").offset().top
        }, 0);

      }
    });

});
