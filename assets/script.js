// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function calendar() {
  var hourPm = 1;
  for (var hourId = 9; hourId <= 17; hourId++) {
    var timeBlock = $("#hour-" + hourId);

    var hour = $("<div>", {
      class: "col-2 col-md-1 hour text-center py-3",
    });

    var textarea = $("<textarea>", {
      class: "col-8 col-md-10 description",
      rows: "3",
    });

    var saveButton = $("<button>", {
      class: "btn saveBtn col-2 col-md-1",
      ariaLabel: "save",
    });

    var buttonStatus = $("<i>", {
      class: "fas fa-save",
      ariaHidden: "true",
    });

    timeBlock.append(hour, textarea, saveButton);
    saveButton.append(buttonStatus);

    var buttons = $(".saveBtn");

    if (hourId < 12) {
      hour.text(hourId + "AM");
    } else if (hourId === 12) {
      hour.text(hourId + "PM");
    } else {
      hour.text(hourPm + "PM");
      hourPm++;
    }

    // Adding and removing classes for time changes
    var currentHour = Number(dayjs().format("H"));

    if (hourId < currentHour) {
      timeBlock.addClass("past");
      timeBlock.removeClass("present future");
    } else if (hourId === currentHour) {
      timeBlock.addClass("present");
      timeBlock.removeClass("past future");
    } else {
      timeBlock.addClass("future");
      timeBlock.removeClass("past present");
    }
  }

  buttons.on("click", function (event) {
    event.preventDefault();
    var textArea = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, textArea);
  });

  // Local storage.
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  function colorBox() {
    // Allows colors to change
    var currentHour = Number(dayjs().format("H"));
    var pastHour = currentHour - 1;
    var hourId;
    hourId = $("#hour-" + pastHour);
    hourId.addClass("past");
    hourId.removeClass("present");

    hourId = $("#hour-" + currentHour);
    hourId.addClass("present");
    hourId.removeClass("future");
  }

  setInterval(colorBox, 1000);

  setInterval(function () {
    $("#currentDay").text(dayjs().format("dddd, MMMM Do, YYYY"));
    $("#currentTime").text(dayjs().format("hh:mm A"));
  }, 1000);
});
