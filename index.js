const departure = document.getElementById("departure");
const arrival = document.getElementById("arrival");
const faqsContainer = document.querySelector("#faqContainer");
let faqsTitle = document.querySelector("#faqHeading");

$(function getdeparture() {
  $.getJSON("https://wadiia-backend.herokuapp.com/departure", function (data) {
    let autoComplete = [];
    for (var i = 0, len = data.length; i < len; i++) {
      data[i].value && autoComplete.push(data[i].value);
    }
    $("#departure").autocomplete({
      source: autoComplete,
      minLength: 2,
      autoFocus: true,
    });
  });
});

$(function getarrival() {
  $.getJSON("https://wadiia-backend.herokuapp.com/arrival", function (data) {
    let autoComplete = [];
    for (var i = 0, len = data.length; i < len; i++) {
      data[i].value && autoComplete.push(data[i].value);
    }
    $("#arrival").autocomplete({
      source: autoComplete,
      minLength: 2,
      autoFocus: true,
    });
  });
});

$(function () {
  $("#departure-date").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    yearRange:
      new Date().getFullYear().toString() +
      ":" +
      new Date().getFullYear().toString(),
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
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    yearRange:
      new Date().getFullYear().toString() +
      ":" +
      new Date().getFullYear().toString(),
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

var trip = "Round-Trip";

$(function () {
  $('input:radio[name="radio-button"]').change(function () {
    if ($(this).val() == "One-Way") {
      document.getElementById("arrival-div").classList.add("wad-desktop-oneway-arr");
      var third_row_input = document.getElementsByClassName("wad-third-row-input");
      for(var i = 0; i < third_row_input.length; i++)
      {
          third_row_input[i].classList.add('wad-desktop-oneway-dep');
          console.log(third_row_input[i].className);
      }
      trip = "One-Way";
    } else if ($(this).val() == "Round-Trip") {
      document.getElementById("arrival-div").classList.remove("wad-desktop-oneway-arr");
      var third_row_input = document.getElementsByClassName("wad-third-row-input");
      for(var i = 0; i < third_row_input.length; i++)
      {
          third_row_input[i].classList.remove('wad-desktop-oneway-dep');
          console.log(third_row_input[i].className);
      }
      trip = "Round-Trip";
    } else {
      document.getElementById("arrival-div").classList.remove("wad-desktop-oneway-arr");
      var third_row_input = document.getElementsByClassName("wad-third-row-input");
      for(var i = 0; i < third_row_input.length; i++)
      {
          third_row_input[i].classList.remove('wad-desktop-oneway-dep');
          console.log(third_row_input[i].className);
      }
      trip = "Multi-Trip";
    }
  });
});

// Mobile Button Functionality

$("#onewaybutton").click(function () {
  document.getElementById("arrival-div").classList.add("wad-mob-oneway-arr");
  document.getElementById("onewaybutton").classList.add("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.remove("wad-button-clicked");
  document.getElementById("multicitybutton").classList.remove("wad-button-clicked");
  trip = "One-Way";
  console.log(trip);
});

$("#roundtripbutton").click(function () {
  document.getElementById("arrival-div").classList.remove("wad-mob-oneway-arr");
  document.getElementById("onewaybutton").classList.remove("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.add("wad-button-clicked");
  document.getElementById("multicitybutton").classList.remove("wad-button-clicked");
  trip = "Round-Trip";
});

$("#multicitybutton").click(function () {
  document.getElementById("arrival-div").classList.remove("wad-mob-oneway-arr");
  document.getElementById("onewaybutton").classList.remove("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.remove("wad-button-clicked");
  document.getElementById("multicitybutton").classList.add("wad-button-clicked");
  trip = "Multi-Trip";
});


// Redirecting URL

function redirectURL() {
  var departure = document.getElementById("departure").value;
  var arrival = document.getElementById("arrival").value;
  var fromdate = document.getElementById("departure-date").value;
  var todate = document.getElementById("arrival-date").value;
  var traveller = document.getElementById("travellers").value;
  var journeyclass = document.getElementById("class").value;

  window.open(
    "../../flights/" +
      "?trip=" +
      trip +
      "&sourceCity=" +
      departure +
      "&destinationCity=" +
      arrival +
      "&fromDate=" +
      fromdate +
      "&toDate=" +
      todate +
      "&travellers=" +
      traveller +
      "&class=" +
      journeyclass
  );

  return false;
}