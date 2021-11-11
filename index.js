const departure = document.getElementById("departure");
const arrival = document.getElementById("arrival");
const faqsContainer = document.querySelector("#faqContainer");
let faqsTitle = document.querySelector("#faqHeading");

var url;
var url1;
function frominput() {
  var from = document.getElementById("departure").value;
  url = "https://test.api.agentplus.io/publicservices/GetAirportsByPrefix/" + from;
  console.log(url);
  if(from.length > 2) {
    $(function getdeparture() {
      $.getJSON(url, function (data) {
        let autoComplete = [];
        for (var i = 0, len = data.length; i < len; i++) {
          data[i].cityName && autoComplete.push(data[i].cityName +", "+ data[i].countryCode + " - " + data[i].name + " (" + data[i].iata + ")");
        }
        $("#departure").autocomplete({
          source: autoComplete,
          minLength: 3,
          autoFocus: true,
        });
      });
    });
  }
}
function toinput() {
  var to = document.getElementById("arrival").value;
  url1 = "https://test.api.agentplus.io/publicservices/GetAirportsByPrefix/" + to;
  console.log(url1);
  if(to.length > 2) {
    $(function getdeparture() {
      $.getJSON(url1, function (data) {
        let autoComplete = [];
        for (var i = 0, len = data.length; i < len; i++) {
          data[i].cityName && autoComplete.push(data[i].cityName +", "+ data[i].countryCode + " - " + data[i].name + " (" + data[i].iata + ")");
        }
        $("#arrival").autocomplete({
          source: autoComplete,
          minLength: 3,
          autoFocus: true,
        });
      });
    });
  }
}

$(function getarrival() {
  $.getJSON(url, function (data) {
    let autoComplete = [];
    for (var i = 0, len = data.length; i < len; i++) {
      data[i].cityName && autoComplete.push(data[i].cityName +", "+ data[i].countryCode + " - " + data[i].name + " (" + data[i].iata + ")");
    }
    $("#arrival").autocomplete({
      source: autoComplete,
      // minLength: 2,
      autoFocus: true,
    });
  });
});


$(function () {
  $("#departure-date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: new Date(),
    // yearRange:
    //   new Date().getFullYear().toString() +
    //   ":" +
    //   new Date().getFullYear().toString(),
    onClose: function (selectedDate) {
      $("#arrival-date").datepicker(
        "option",
        "minDate",
        selectedDate,
        new Date()
      );
    },
  });
  $("#arrival-date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: new Date(),
    // yearRange:
    //   new Date().getFullYear().toString() +
    //   ":" +
    //   new Date().getFullYear().toString(),
    onClose: function (selectedDate) {
      $("#departure-date").datepicker(
        "option",
        "maxDate",
        selectedDate
      );
    },
  });
});

const getcms = async (data) => {
  console.log(data, "cms");
  const response = await fetch("https://wadiia-backend.herokuapp.com/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      departure: departure.value,
      arrival: arrival.value,
    }),
  });

  const body = await response.json();
  console.log({ body });
  const faqs = JSON.parse(body.data.faq_object);

  faqsTitle.innerHTML = `Frequently Asked Questions - ${body.data.airline_name} flights from ${body.data.source} to ${body.data.destination}`;
  // console.log(faqsTitle.innerHTML, "hhhh");

  let faqsComponent = ``;

  if (faqs[0]) {
    for (const faq of faqs) {
      const faqComponent = `
          <button class="accordion1">
            ${faq.question.trim()}
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
          <div class="panel1">
            <p> ${faq.answer.trim()} </p>
          </div>`;
      faqsComponent += faqComponent.trim();
    }
  }
  faqsContainer.innerHTML = faqsComponent;
  addAccordianEventListener();
  console.log({ faqsComponent });
};

//Form Section

var trip = "Roundtrip";

$(function () {
  $('input:radio[name="radio-button"]').change(function () {
    if ($(this).val() == "Oneway") {
      document.getElementById("arrival-div").classList.add("wad-desktop-oneway-arr");
      var third_row_input = document.getElementsByClassName("wad-third-row-input");
      $("#arrival-date").val(undefined);
      for(var i = 0; i < third_row_input.length; i++)
      {
          third_row_input[i].classList.add('wad-desktop-oneway-dep');
          console.log(third_row_input[i].className);
      }
      trip = "Oneway";
    } else if ($(this).val() == "Roundtrip") {
      document.getElementById("arrival-div").classList.remove("wad-desktop-oneway-arr");
      var third_row_input = document.getElementsByClassName("wad-third-row-input");
      for(var i = 0; i < third_row_input.length; i++)
      {
          third_row_input[i].classList.remove('wad-desktop-oneway-dep');
          console.log(third_row_input[i].className);
      }
      trip = "Roundtrip";
    } else {
      document.getElementById("arrival-div").classList.remove("wad-desktop-oneway-arr");
      var third_row_input = document.getElementsByClassName("wad-third-row-input");
      for(var i = 0; i < third_row_input.length; i++)
      {
          third_row_input[i].classList.remove('wad-desktop-oneway-dep');
          console.log(third_row_input[i].className);
      }
      trip = "Multitrip";
    }
  });
});

// Mobile Button Functionality

$("#onewaybutton").click(function () {
  document.getElementById("arrival-div").classList.add("wad-mob-oneway-arr");
  document.getElementById("onewaybutton").classList.add("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.remove("wad-button-clicked");
  document.getElementById("multicitybutton").classList.remove("wad-button-clicked");
  trip = "Oneway";
  console.log(trip);
});

$("#roundtripbutton").click(function () {
  document.getElementById("arrival-div").classList.remove("wad-mob-oneway-arr");
  document.getElementById("onewaybutton").classList.remove("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.add("wad-button-clicked");
  document.getElementById("multicitybutton").classList.remove("wad-button-clicked");
  trip = "Roundtrip";
});

$("#multicitybutton").click(function () {
  document.getElementById("arrival-div").classList.remove("wad-mob-oneway-arr");
  document.getElementById("onewaybutton").classList.remove("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.remove("wad-button-clicked");
  document.getElementById("multicitybutton").classList.add("wad-button-clicked");
  trip = "Multitrip";
});


// Redirecting URL

  var domorint;
  var departcountry;
  var arrivalcountry;
  var departcity;
  var arrivalcity;
  var departCouncode;
  var arrivalCouncode;

function redirectURL() {
  var departure = document.getElementById("departure").value;
    var departcode = departure.match(/\((.*?)\)/);
    var departcode1 = departcode[1].trimRight();
    var departname = departure.match(/\- (.*?)\(/);
    var departname1 = departname[1].trimRight();
    console.log(departcode1);
    console.log(departname1);

    $(function mapping() {
      $.getJSON(url, function (data) {
        var objectdata = data.filter(obj => {
          return obj.iata === departcode1 &&
                 obj.name === departname1;
        })
        console.log(data);
        departcountry = objectdata[0].countryName;
        console.log(departcountry);
        departcity = objectdata[0].cityName;
        departCouncode = objectdata[0].countryCode;
      });
    });
    console.log(departcountry);
  var arrival = document.getElementById("arrival").value;
    var arrivalcode = arrival.match(/\((.*?)\)/);
    var arrivalcode1 = arrivalcode[1].trimRight();
    var arrivalname = arrival.match(/\- (.*?)\(/);
    var arrivalname1 = arrivalname[1].trimRight();
    console.log(arrivalcode1);
    console.log(arrivalname1);

    $(function mapping() {
      $.getJSON(url1, function (data) {
        var objectdata = data.filter(obj => {
          return obj.iata === arrivalcode1 &&
                obj.name === arrivalname1;
        })
        console.log(data);
        arrivalcountry = objectdata[0].countryName;
        arrivalcity = objectdata[0].cityName;
        arrivalCouncode = objectdata[0].countryCode;
        URL();
      });
    });

  var fromdate = document.getElementById("departure-date").value;
  var todate = document.getElementById("arrival-date").value;
  var traveller = document.getElementById("travellers").value;
  var adult = document.getElementById("adult-count").innerHTML;
  var child = document.getElementById("child-count").innerHTML;
  var infant = document.getElementById("infant-count").innerHTML;
  var journeyclass = document.getElementById("class").value;
    function URL() {
      if (departcountry === arrivalcountry) { domorint = "domestic" }
      else { domorint = "international" }

      window.open("https://newdemo.wadiia.com/" +
        "../../../flight-listing/" +
        domorint +
        "?fromDate=" +
        fromdate +
        "&toDate=" +
        todate +
        "&fromLocation=" +
        '{"id":"' + departcode1 + '","city":"' + departcity + '","country":"' + departcountry + '","address":"[' + departcode1 + '] - ' + departcity + ' - ' + departname1 +'","countryID":"' + departCouncode + '"}' +
        "&toLocation=" +
        '{"id":"' + arrivalcode1 + '","city":"' + arrivalcity + '","country":"' + arrivalcountry + '","address":"[' + arrivalcode1 + '] - ' + arrivalcity + ' - ' + arrivalname1 +'","countryID":"' + arrivalCouncode + '"}' +
        "&passanger=" +
        '{"adult":' + adult + ',"child":' + child + ',"infant":' + infant + '}' +
        "&serviceClasses=" +
        journeyclass +
        "&tripType=" +
        trip +
        "&direct=" +
        false
      );
    }

  return false;
}


// Load more table
$(function() {
  var totalrowshidden;
  var rows2display = 5;
  var rem = 0;
  var rowCount = 0;
  var forCntr;
  var forCntr1;
  var MaxCntr = 0;
  var forStarter = 0;

  $('#showtable').click(function() {
      rowCount = $('#wad-logo-table tr').length;

      MaxCntr = forStarter + rows2display;

      if (forStarter <= $('#wad-logo-table tr').length) {

          for (var i = forStarter; i < MaxCntr; i++) {
              $('tr:nth-child(' + i + ')').show(200);
          }

          forStarter = forStarter + rows2display;

          if (forStarter-1 >= rowCount) {
            $('#showtable').hide();
          }
      } else {
          $('#showtable').hide();
      }
  });



  $(document).ready(function() {
      var rowCount = $('#wad-logo-table tr').length;

      if (rowCount < 6 ){
        $('#showtable').hide();
      }
      else if (forStarter-1 >= rowCount) {
        $('#showtable').hide();
      }
      else {
        $('#showtable').show();
      }

      for (var i = $('#wad-logo-table tr').length; i-1 > rows2display; i--) {
          rem = rem + 1
          $('tr:nth-child(' + i + ')').hide(200);
      }
      forCntr = $('#wad-logo-table tr').length - rem;
      forStarter = forCntr + 1
  });
});



// Passenger type

function plus(type) {
  var value = document.getElementById(type).innerHTML;
  var total = document.getElementById("travellers").value;
  if(parseInt(total)<9 || total == "") {
      value++;
  }
  document.getElementById(type).innerHTML = value;
  var value = document.getElementById("adult-count").innerHTML;
  var value1 = document.getElementById("child-count").innerHTML;
  var value2 = document.getElementById("infant-count").innerHTML;

  var total = +value + +value1 + +value2;

  document.getElementById("travellers").value = total + " travellers";
}
function minus(type) {
  var value = document.getElementById(type).innerHTML;
  var total = document.getElementById("travellers").value;
  if(parseInt(total)>1 && value >0) {
      value--;
  }
  document.getElementById(type).innerHTML = value;
  var value = document.getElementById("adult-count").innerHTML;
  var value1 = document.getElementById("child-count").innerHTML;
  var value2 = document.getElementById("infant-count").innerHTML;

  var total = +value + +value1 + +value2;

  document.getElementById("travellers").value = total + " travellers";
}
function passengerdone() {
  document.getElementById("travellers-card").style.display = "none";
}
function block(id_name) {
  document.getElementById(id_name).style.display = "block";
}

$(document).click(function() {
  var container = $("#travellers-card");
  var input = $("#travellers");
  if (!container.is(event.target) && !container.has(event.target).length && !input.is(event.target) && !input.has(event.target).length) {
      container.hide();
  }
});


// Passenger class

function traveller_class(traveller_class) {
  document.getElementById("class").value = traveller_class;
  document.getElementById("wad-class-card").style.display = "none";
}

function block(id_name) {
  document.getElementById(id_name).style.display = "block";
}

$(document).click(function() {
  var class_container = $("#wad-class-card");
  var class_input = $("#class");
  if (!class_container.is(event.target) && !class_container.has(event.target).length && !class_input.is(event.target) && !class_input.has(event.target).length) {
      class_container.hide();
  }
});