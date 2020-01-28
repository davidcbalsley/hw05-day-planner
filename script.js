// Time slots -- in 24-hour format
var timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Create a time slot and display it
function renderOneHourlyTimeBlock (inputTime12Hour, pastPresentFuture) {
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
    newTimeLabel.text(inputTime12Hour);
    newTimeCol.append(newTimeLabel);
    
    // Create a column for the appointment description
    var newAppointmentCol = $("<div>");
    newAppointmentCol.attr("class", "col-8 description d-flex " + pastPresentFuture);
    var newAppointmentFormGroup = $("<div>"); 
    newAppointmentFormGroup.attr("class", "form-group");
    var newTextArea = $("<textarea>");
    newTextArea.attr("class", "form-control " + pastPresentFuture);
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

// Get a 12-hour format for hour, including AM and PM, for a 24-hour hour
function getTwelveHourFromTwentyFourHour(twentyFourHourInput) {
    var twelveHourFormat = "";  // A 12-hour formatted hour of the day

    if (twentyFourHourInput === 0) {  // Midnight
        twelveHourFormat = "12AM";
    } else if (twentyFourHourInput <= 11) {  // Morning
        twelveHourFormat = twentyFourHourInput + "AM";
    } else if (twentyFourHourInput === 12) {  // Noon
        twelveHourFormat = "12PM";
    }
    else { // Afternoon and evening 
        twelveHourFormat = (twentyFourHourInput - 12) + "PM"; 
    }

    return twelveHourFormat;
}

// Create all of the time slots and display them
function renderAllHourlyTimeBlocks() {
    var twelveHourLabel = "";   // A 12-hour formatted time label
    var currentHour = 0;        // The current hour of the day, in 24-hour format 

    // Get the current hour of the day in 24-hour format
    currentHour = moment().hour();

    // Create a row for each entry in timeSlots
    for (slot in timeSlots) {
        // Get the 12-hour formatted version of the hour in the time slot
        twelveHourLabel = getTwelveHourFromTwentyFourHour(timeSlots[slot]);

        // Time slot in the past
        if (timeSlots[slot] < currentHour) {
            renderOneHourlyTimeBlock(twelveHourLabel, "past");
        } else if (timeSlots[slot] === currentHour) {  // Time slot is the present
            renderOneHourlyTimeBlock(twelveHourLabel, "present");
        } else { // Time slot is in the future
            renderOneHourlyTimeBlock(twelveHourLabel, "future");
        }
    }
}

// 
function initializeScreen() {
    // Create the hourly time blocks and display them
    renderAllHourlyTimeBlocks();

    // Get the current date and display it -- in format day, month digits
    $("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM') + ' ' + moment().format('Do'));
}

// On page load --
// - Create the hourly time blocks and display them
// - Load any existing appointments and display them in the time blocks
// renderAllHourlyTimeBlocks();
initializeScreen();


// to do:
// - Assign data to text fields and buttons
// - Save appointment description when save button pressed
// - Render appointments, loading from local storage
// - Fix background turning white when typing in text aread
// - Change time slots