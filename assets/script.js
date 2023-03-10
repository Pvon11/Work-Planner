var date = dayjs();
var currentTime = dayjs().hour();

$("#currentDay").text(date.format("dddd, MMM D YYYY"));
$(function () {
  $(".saveBtn").on("click", function () {
    var parentInfo = $(this).parent().attr("id");
    var childInfo = $(this).siblings("textarea").val();
    // sets above to localStorage
    localStorage.setItem(parentInfo, childInfo);
  });
  //function to allow colors to change
  $(".time-block").each(function () {
    // generic timeslot
    var timeSlot = $(this);
    // makes slots into array and splits to change color
    var slot = parseInt(timeSlot.attr("id").split("hour")[1]);

    if (slot < currentTime) {
      timeSlot.children("textarea").addClass("past");
    } else if (slot == currentTime) {
      timeSlot.children("textarea").addClass("present");
    } else {
      timeSlot.children("textarea").addClass("future");
    }
  });

  $("#hour9 .description").val(localStorage.getItem("hour9"));
  $("#hour10 .description").val(localStorage.getItem("hour10"));
  $("#hour11 .description").val(localStorage.getItem("hour11"));
  $("#hour12 .description").val(localStorage.getItem("hour12"));
  $("#hour13 .description").val(localStorage.getItem("hour13"));
  $("#hour14 .description").val(localStorage.getItem("hour14"));
  $("#hour15 .description").val(localStorage.getItem("hour15"));
  $("#hour16 .description").val(localStorage.getItem("hour16"));
  $("#hour17 .description").val(localStorage.getItem("hour17"));
});
