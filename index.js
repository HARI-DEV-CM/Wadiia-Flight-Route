const departure = document.getElementById("departure");
const departure_mob = document.getElementById("departure-mob");
const arrival = document.getElementById("arrival");
const arrival_mob = document.getElementById("arrival-mob");
const faqsContainer = document.querySelector("#faqContainer");
let faqsTitle = document.querySelector("#faqHeading");


$(function getdeparture() {
  $.getJSON("https://wadiia-backend.herokuapp.com/departure", function (data) {
    let autoComplete = [];
    for (var i = 0, len = data.length; i < len; i++) {
      data[i].value && autoComplete.push(data[i].value);
    }
    $("#departure, #departure-mob").autocomplete({
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
    $("#arrival, #arrival-mob").autocomplete({
      source: autoComplete,
      minLength: 2,
      autoFocus: true,
    });
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

  faqsTitle.innerHTML = `Frequently Asked Questions - ${body.data.airline_name} flights from ${body.data.source} to ${body.data.destination}`
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
// getcms();

//MOBILE
const getcmsmob = async (data) => {
  console.log(data, "cms");
  const response = await fetch("https://wadiia-backend.herokuapp.com/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      departure: departure_mob.value,
      arrival: arrival_mob.value,
    }),
  });

  const body = await response.json();
  console.log({ body });
  const faqs = JSON.parse(body.data.faq_object);

  faqsTitle.innerHTML = `Frequently Asked Questions - ${body.data.airline_name} flights from ${body.data.source} to ${body.data.destination}`
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


$(function () {
  $("#departure-date, #departure-date-mob").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    yearRange:
      new Date().getFullYear().toString() +
      ":" +
      new Date().getFullYear().toString(),
    onClose: function (selectedDate) {
      $("#arrival-date, #arrival-date-mob").datepicker(
        "option",
        "minDate",
        selectedDate,
        new Date()
      );
    },
  });
  $("#arrival-date, #arrival-date-mob").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    yearRange:
      new Date().getFullYear().toString() +
      ":" +
      new Date().getFullYear().toString(),
    onClose: function (selectedDate) {
      $("#departure-date, #departure-date-mob").datepicker(
        "option",
        "maxDate",
        selectedDate
      );
    },
  });
});

// Redirecting URL

function redirectURL() {
  var val = document.getElementById("class").value;
  var opts = document.getElementById("journeyclass").childNodes;
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      var trip = document.querySelector(
        'input[name="radio-button"]:checked'
      ).value;
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
  }
}

function redirectMobURL() {
  var trip = document.getElementById("hiddenbutton").value;
  var departure = document.getElementById("departure-mob").value;
  var arrival = document.getElementById("arrival-mob").value;
  var fromdate = document.getElementById("departure-date-mob").value;
  var todate = document.getElementById("arrival-date-mob").value;
  var traveller = document.getElementById("travellers-mob").value;
  var journeyclass = document.getElementById("class-mob").value;

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

$(function () {
  $('input:radio[name="radio-button"]').change(function () {
    if ($(this).val() == "One-Way") {
      document.getElementById("arrival-icon").style.display = "none";
      document.getElementById("arrival-date").style.display = "none";
      document.getElementById("departure-date").style.width = "300px";
    } else if ($(this).val() == "Round-Trip") {
      document.getElementById("departure-date").style.width = "116px";
      document.getElementById("arrival-date").style.display = "inline-block";
      document.getElementById("arrival-icon").style.display = "inline-block";
    } else {
      document.getElementById("departure-date").style.width = "116px";
      document.getElementById("arrival-date").style.display = "inline-block";
      document.getElementById("arrival-icon").style.display = "inline-block";
    }
  });
});

// Mobile Button Functionality

$("#onewaybutton").click(function () {
  $("#hiddenbutton").val("One-Way");
  document.getElementById("arrival-icon-mob").style.display = "none";
  document.getElementById("arrival-date-mob").style.display = "none";
  document.getElementById("onewaybutton").classList.add("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.remove("wad-button-clicked");
  document.getElementById("multicitybutton").classList.remove("wad-button-clicked");
});

$("#roundtripbutton").click(function () {
  $("#hiddenbutton").val("Round-Trip");
  document.getElementById("arrival-date-mob").style.display = "inline-block";
  document.getElementById("arrival-icon-mob").style.display = "inline-block";
  document.getElementById("onewaybutton").classList.remove("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.add("wad-button-clicked");
  document.getElementById("multicitybutton").classList.remove("wad-button-clicked");
});

$("#multicitybutton").click(function () {
  $("#hiddenbutton").val("Multi-Trip");
  document.getElementById("arrival-date-mob").style.display = "inline-block";
  document.getElementById("arrival-icon-mob").style.display = "inline-block";
  document.getElementById("onewaybutton").classList.remove("wad-button-clicked");
  document.getElementById("roundtripbutton").classList.remove("wad-button-clicked");
  document.getElementById("multicitybutton").classList.add("wad-button-clicked");
});