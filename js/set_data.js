
  var form = document.getElementById('form');
  // TODO: NEEDS TO ACCEPT IMAGE FILES AS WELL
  form.addEventListener("submit", e => {
    // e.preventDefault();
    fetch(form.action, {
        method : "POST",
        body: new FormData(document.getElementById("form")),
    }).then(
        response => response.json()
    ).then((html) => {
      // you can put any JS code here
      alert('success')
      // TODO: link back to home page
    });
  });

function parseDate(str_date) {
    return new Date(Date.parse(str_date));
  }
var img_url = "";
let form_data = [];

$(document).ready(function(){

    let uploadInput = document.getElementById("upfile");
    uploadInput.onchange = function () {
        let image = new FileReader();
        image.onload = function (e) {
            img_url = e.target.result;
            // document.getElementById("imagePreview").src = e.target.result;
        };
        image.readAsDataURL(this.files[0]);
    }
});

//read form data and create card preview
$(document).keyup(function() {
    var x = $("#form").serializeArray();
    $.each(x, function(i, field) {
        form_data[field.name] = field.value;
    });

        
        var date = new Date(form_data['data[Date]'].replace(/-/g, '\/'));
        date = date.toDateString();
        let src ='<div class="col-md-4 mb-5">' + 
        '<div class="card h-100 bg-dark">' + 
        '<div class="card-body">' + 
        `<p class="card-text text-success">${date}</p>`+
        `<img width=90% class="img-fluid rounded mb-4 mb-lg-0" src="${img_url}" alt="..." />` + 
        `<h2 class="card-title text-light">${form_data['data[Event Title]']}</h2>` + 
        `<p class="card-text text-success">${form_data['data[Event Description]']}</p>`+
        '</div><div class="card-footer">' +
        `<a class="btn btn-primary btn-sm" target="_blank" href="${form_data['data[Ticket Link]']}">check your ticket link here</a>` +
        '</div></div></div>';

        $('#card_preview').html(src);
});

