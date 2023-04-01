"strict";
var this_month =  new Date().getMonth();
var current_month = new Date().getMonth();
var current_year = new Date().getFullYear();

$( document ).ready(function() {

    load_cal(current_month, current_year);

});

function load_cal(current_month, current_year){
  var src = "";
  var index = 0;
  var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const month_names = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  // name the current month_names    // add src to collapse month
  $("#month_name").html(month_names[current_month] + " " +  current_year);

  // create list of days for this month
  var calendar_days = [];

  // get first day of CURRENT MONTH
  // var date = new Date();
  var start = new Date(current_year, current_month, 1);
  var end = new Date(current_year, current_month, 35);
  var first_day = start.getDay();
  start.setDate(start.getDate() - first_day - 1); // track back to sunday of that week
  var loop = new Date(start);
  while(loop <= end){
     calendar_days.push(loop); // load next day into loop
     var newDate = loop.setDate(loop.getDate() + 1); // get next day
     loop = new Date(newDate); // set loop to next day
  }
  src += '<div id="day_words" class="btn-group container-fluid justify-content-center" role="group"></div>';

  // loop through weeks
  for(var week = 0; week < 5; week++){
    src += '<div id="week'+week+'" class="btn-group container-fluid justify-content-center" role="group"></div><div id="flyers'+week+'"></div>'
  }

  // add src to collapse month
  $("#collapse_month").html(src);

  //reset src
  src = "";
  for(var day = 0; day < 7; day++){
    src += '<button class="calendar_button" style="border: none">'+days[day]+'</button>';
  }
  $("#day_words").html(src);

  // get spreadsheet data
  // data is an array of events
  // events have 4 properties: 
  //          date, flyer link, ticket link, 
  //          and event description
  // attach flyers to days where there are events
  get_data(start, end, calendar_days);

  // hide all day divs except for selected
  // hide current day if visible and clicked
}

$("#collapse_month").click(function(e) {
  // come back to month view
  // check if e.target.id is valid
  if(e.target.type != "button") return;
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

function next_month(){
  current_month++;
  if(current_month == 12){
    current_month = 0;
    current_year++;
  }
  load_cal(current_month, current_year);
}

function prev_month(){
  current_month--;
  if(current_month == -1){
    current_year--;
    current_month = 11;
  } 
  load_cal(current_month, current_year);
}