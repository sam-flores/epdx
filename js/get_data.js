


function get_data(start, end, calendar_days){
    
    const sheetID = "1qnxhhs-4O4npQ7NdDwoWpQZkiKPA3qRNxVHBF3phyQw";
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const sheetName = "form_responses";

    // Generate yyyy-mm-dd date string
    var start_date = start.toLocaleString("default", { year: "numeric" }) 
                    + "-" + 
                    start.toLocaleString("default", { month: "2-digit" }) 
                    + "-" + 
                    start.toLocaleString("default", { day: "2-digit" });
    
    var end_date = end.toLocaleString("default", { year: "numeric" }) 
                    + "-" + 
                    end.toLocaleString("default", { month: "2-digit" }) 
                    + "-" + 
                    end.toLocaleString("default", { day: "2-digit" });
    
    const qu = `Select B,C,D,E,F WHERE B > date '${start_date}' AND B <= date '${end_date}'`;
    const query = encodeURIComponent(qu);
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    let data = [];
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsData = JSON.parse(rep.substr(47).slice(0,-2));
            const colz = [];
            jsData.table.cols.forEach((heading)=> 
            {
                if(heading.label){
                    colz.push(heading.label.
                    toLowerCase().replace(/\s/g, ''));
                }
            });
            jsData.table.rows.forEach((main)=>
            {
                const row = new Object();
                colz.forEach((ele, ind) =>{
                    row[ele.toLocaleString()] = (main.c[ind] != 
                    null) ? main.c[ind].v : '';
                });
                data.push(row);
            });
            // maker(data);
            create_events(data, calendar_days);
        });
}

// function maker(json){
//     const div = document.createElement('div');
//     div.style.display = 'grid';
//     const output = document.querySelector('.output');
//     output.append(div);
//     let first = false;
//     json.forEach((el) =>{
//         const keys = Object.keys(el);
//         div.style.gridTemplateColumns = `repeat(${keys.length} , 1fr)`;
//         if(first){
//             first = false;
//             keys.forEach((heading) =>
//             {
//                 const ele = document.createElement('div');
//                 ele.textContent = heading.toUpperCase();
//                 ele.style.background = 'black';
//                 ele.style.color = 'white';
//             })
//         }
//         keys.forEach((key)=>{
//             const ele = document.createElement('div');
//             ele.style.border = '1px solid #ddd';
//             ele.textContent = el[key];
//             div.append(ele);
//         })
//     })
// }

function create_events(events, calendar_days){

    let src = "";
    var index, date;
    // add src code to week divs
    for(var week = 0; week < 5; week++){
  
      // create a button for each day of the week
      for(var day = 0; day < 7; day++){
        index = week*7 + day;
        date = calendar_days[index].getDate();
        // console.log(date);
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
  
      // reset src
      src = "";
       
      // loop through days of week
      for(var day = 0; day < 7; day++){
        index = week*7 + day;
        date = calendar_days[index].toDateString();
        // loop through flyers for day
        src = '<div style="color: white; font-size: 16px; text-align: center;">'+date+'</div>';
  
        // filter events that match the current day in the month
        var found_event = events.filter(e =>{
            var ymd = e.date.substr(e.date.indexOf('(') + 1, e.date.indexOf(')')-5).split(",");
            return calendar_days[index].getFullYear() == ymd[0] && calendar_days[index].getMonth() == ymd[1] && calendar_days[index].getDate() == ymd[2];
            });
        // if(found_event.length > 0) console.log(found_event[0]);
        // found_event[0].date, found_event[0].flyer, 
        // found_event[0].ticketlink, found_event[0].eventdescription
        if(found_event.length != 0){
            $("#"+index).css('color', '#00FF00');
            for(var i = 0; i < found_event.length; i++){
                var id = found_event[i].flyer.substr(33);
                // console.log(found_event[i]);
                var img_src = "https://drive.google.com/uc?export=view&id=" + id;
                src +='<div class="col-md-4 mb-5">' + 
                '<div class="card h-100 bg-dark">' + 
                '<div class="card-body">' + 
                `<img width=90% class="img-fluid rounded mb-4 mb-lg-0" src="${img_src}" alt="..." />` + 
                `<h2 class="card-title text-light">${found_event[i].eventtitle}</h2>` + 
                `<p class="card-text text-success">${found_event[i].eventdescription}</p>`+
                '</div><div class="card-footer">' +
                `<a class="btn btn-primary btn-sm" href="${found_event[i].ticketlink}">ticket link</a>` +
                '</div></div></div>';
            }
        }else{
            src +='<div class="col-md-4 mb-5">' + 
            '<div class="card h-100 bg-dark">' + 
            '<div class="card-body">' + 
            '<h2 class="card-title text-light">NO EVENTS</h2>' + 
            '</div><div class="card-footer">' +
            `<a class="btn btn-primary btn-sm" href="https://forms.gle/uxbyqubfJPUzKvQr9">submit your event here</a>` +
            '</div></div></div>';
        }
        // add flyers to day
        $("#day"+index).html(src);
        src = "";// reset source for next day
      }
    }
}