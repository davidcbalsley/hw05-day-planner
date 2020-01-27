// Create rows for the hours of the day and display them
function renderHourlyTimeBlocks () {
    // As a first step, create one new row and display it
    // var newRow = $("<row>");
    var newRow = $("<div>");
    newRow.attr("class", "row")
    // newRow.text("Here is a row!"); // debug

    // Create a column for the time
    var newTimeCol = $("<div>");
    newTimeCol.attr("class", "col-md-2");
    // newTimeCol.text("Here is the time!"); // debug
    var newTimePar = $("<p>");
    newTimePar.text("Here is the time!");
    newTimeCol.append(newTimePar);

    // Create a column for the appointment description
    var newAppointmentCol = $("<div>");
    newAppointmentCol.attr("class", "col-md-8");
    // newAppointmentCol.text("Here is the appointment!"); // debug
    var newAppointmentPar = $("<p>");
    newAppointmentPar.text("Here is the appointment!");
    newAppointmentCol.append(newAppointmentPar);
    
    // Create a column for the save button
    var newSaveCol = $("<div>");
    newSaveCol.attr("class", "col-md-2");
    newSaveCol.text("Save column!");

    newRow.append(newTimeCol, newAppointmentCol, newSaveCol);
    
    $("#hourly-time-blocks").append(newRow);

}

// On page load --
// - Create the hourly time blocks and display them
// - Load any existing appointments and display them in the time blocks
renderHourlyTimeBlocks();