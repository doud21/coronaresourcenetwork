document.cookie = "promo_shown=1; SameSite=None; Secure";
$("table").stupidtable();

// Display Hamburger Contents
function openBurger() {
  var x = document.getElementsByClassName("buttons2");

  if (x[0].style.display === "block") {
    x[0].style.display = "none";
  } else {
    x[0].style.display = "block";
  }
}

// Display Form Error Messages
const form = document.getElementsByClassName('form')[0];
const zip = document.getElementById('zip');
const error = document.querySelector('#zip + span.error');

zip.addEventListener('input', function (event) {

  if (zip.validity.valid) {
    error.innerHTML = '';
    error.className = 'error';
  } else {
    showError();
  }
});

form.addEventListener('submit', function (event) {
  if(!zip.validity.valid) {
    showError();
    event.preventDefault();
  }
});

document.addEventListener('invalid', (function(){
    return function(e) {
      e.preventDefault();
    };
  })
(), true);

function showError() {
  if(zip.validity.valueMissing) {
    error.textContent = 'Please enter a zip code';
  } else if(zip.validity.patternMismatch) {
    error.textContent = 'Please enter a valid zip code';
  }
  error.className = 'error active';
}

//Use Zipwise API for Submission
var request = new XMLHttpRequest();

function submitForm() {

  //Clear Previous Display
  document.getElementById('instructions').innerHTML = '';
  document.getElementById('tHead').innerHTML = '';
  document.getElementById('tBody').innerHTML = '';

  document.getElementById('tHead').innerHTML = ('<tr><th data-sort="string">City</th><th data-sort="string">Free?*</th><th data-sort="string">Site</th></tr>');
  document.getElementById('disclaimer').innerHTML = ('*Some mask providers have eligibility requirements for receving a free mask. Check the website for details.');

  //Conduct Zip Code Radius Search
  var zipcode = document.getElementById('zip').value.toString();

  var url = 'https://www.zipwise.com/webservices/radius.php?key=hdsbdjvr9emzm9yk&zip=' + zipcode + '&radius=10&format=json';

  request.open('GET', url, true);
  request.onload = function() {
    var zipSearch = JSON.parse(this.response);

    var filteredZip = [];

    for (var i = 0; i < zipSearch.results.length; i++) {
      filteredZip.push(zipSearch.results[i]["zip"]);
    };

    //Get Google Sheets Data as JSON
    $.getJSON("https://spreadsheets.google.com/feeds/list/1pIoT11igVnkenL8MrC7GIEsLLAp_V1EU3iwFUFQmlmw/1/public/values?alt=json", function (data) {

      var sheetData = data.feed.entry;

      var i;
      var count = 0;

      for (i = 0; i < sheetData.length; i++) {

        var city = sheetData[i]['gsx$city']['$t'];
        var zip = sheetData[i]['gsx$zip']['$t'];
        var free = sheetData[i]['gsx$free']['$t'];
        var org = sheetData[i]['gsx$org']['$t'];
        var url = sheetData[i]['gsx$url']['$t'];
        const common = filteredZip.some(code=> zip.includes(code));

        if (common) {
          document.getElementById('tBody').innerHTML += ('<tr>'+'<td>'+city+'</td>'+'<td>'+free+'</td>'+'<td>'+'<a target="_blank" href="'+url+'">'+org+'</a>'+'</td>'+'</tr>');
          document.getElementById('instructions').innerHTML = ('Results displayed within a 10 mile radius and may not include all mask providers in your area. Click on column titles to sort.');
        }else {
          count += 1
        }
        if (zip==0) {
          document.getElementById('tBody').innerHTML += ('<tr>'+'<td>'+city+'</td>'+'<td>'+free+'</td>'+'<td>'+'<a target="_blank" href="'+url+'">'+org+'</a>'+'</td>'+'</tr>');
        }
      };

      if (count == sheetData.length) {
        document.getElementById('instructions').innerHTML = ('We have not yet identified mask providers in your area. These national resources may be helpful.');
      }
    });
  };
  request.send();
}
