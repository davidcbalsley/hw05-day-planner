// Create rows for the hours of the day and display them
function renderHourlyTimeBlocks () {
    // As a first step, create one new row and display it
    var newRow = $("<row>");
    // newRow.text("Here is a row!"); // debug

    // Create a column for the time
    var newTimeCol = $("<col-md-2>");
    newTimeCol.text("Here is the time!"); // debug

    // Create a column for the appointment description
    var newAppointmentCol = $("<col-md-8>");
    newAppointmentCol.text("Here is the appointment!"); // debug
    
    // Create a column for the save button
    var newSaveCol = $("<col-md-2>");
    newSaveCol.text("Save column!");

    newRow.append(newTimeCol, newAppointmentCol, newSaveCol);
    
    $("#hourly-time-blocks").append(newRow);

}

// On page load --
// - Create the hourly time blocks and display them
// - Load any existing appointments and display them in the time blocks
renderHourlyTimeBlocks();