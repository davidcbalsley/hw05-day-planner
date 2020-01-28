// Time slots
var timeSlots = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

// Create a time slot and display it
function renderOneHourlyTimeBlock (inputTime) {
    // As a first step, create one new row and display it
    var newRow = $("<div>");
    newRow.attr("class", "row")
    
    // Create a blank buffer column for the left
    var newLeftBufferCol = $("<div>");
    newLeftBufferCol.attr("class", "col-1");

    // Create a column for the time
    var newTimeCol = $("<div>");
    newTimeCol.attr("class", "col-1 hour");

    var newTimeLabel = $("<label>");
    newTimeLabel.text(inputTime);
    newTimeCol.append(newTimeLabel);
    
    // Create a column for the appointment description
    var newAppointmentCol = $("<div>");
    newAppointmentCol.attr("class", "col-8 description d-flex");
    var newAppointmentFormGroup = $("<div>"); 
    newAppointmentFormGroup.attr("class", "form-group");
    var newTextArea = $("<textarea>");
    newTextArea.attr("class", "form-control");
    newAppointmentCol.append(newTextArea);
    
    // Create a column for the save button
    var newSaveCol = $("<div>");
    newSaveCol.attr("class", "col-1 saveBtn d-flex");

    // Create a new save button
    var newSaveBtn = $("<button>");
    newSaveBtn.attr("class", "btn btn-block");

    // Add the lock icon to the button
    var newButtonLabel = $("<span>");
    newButtonLabel.attr("class", "fa fa-lock");
    newButtonLabel.attr("style", "color:#d3d3d3");
    newSaveBtn.append(newButtonLabel);

    newSaveCol.append(newSaveBtn);

    // Create a blank buffer column for the right
    var newRightBufferCol = $("<div>");
    newRightBufferCol.attr("class", "col-1");

    // Append the time, description, and save button to the row
    newRow.append(newLeftBufferCol, newTimeCol, newAppointmentCol, newSaveCol);
    
    // Append the row 
    $("#hourly-time-blocks").append(newRow);
}

// Create all of the time slots and display them
function renderAllHourlyTimeBlocks() {
    // Create a row for each entry in timeSlots
    for (slot in timeSlots) {
        renderOneHourlyTimeBlock(timeSlots[slot]);
    }
}

// 
function initializeScreen() {
    // Create the hourly time blocks and display them
    renderAllHourlyTimeBlocks();
}
// On page load --
// - Create the hourly time blocks and display them
// - Load any existing appointments and display them in the time blocks
// renderAllHourlyTimeBlocks();
initializeScreen();