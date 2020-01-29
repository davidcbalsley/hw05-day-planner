$(document).ready(function() {

// Time slots -- in 24-hour format
var timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

var appointments = [];

// Store appointment in local storage
function putAppointmentInLocalStorage() {
    var timeSlot;               // The time slot associated with the button that the user clicked
    var saveButtonDiv;          // The div that is the parent to the button
    var textAreaDiv;            // The div that is the immediate previous sibling to the 
                                // save button div -- i.e., the div for the appointment description
    var correspondingTextArea;  // Text area for the appointment description
    var appointmentDescription; // The text that the user entered for the appointment description                 

    // Get the timeslot from the button
    timeSlot = $(this).attr("data-timeslot");

    // Find the text area with a matching time slot
    // First, find the parent div for the save button
    saveButtonDiv = $(this).parent();
    
    // Next, get the div for the appointment description text area
    textAreaDiv = saveButtonDiv.prev();
    
    // Lastly, get the text area itself
    correspondingTextArea = textAreaDiv.children().first();

    // Get the text that the user entered for the appointment description
    appointmentDescription = correspondingTextArea.val();

    // Store the appointment description in local storage; use the timeslot as a label
    // Create appointment object from appointment
    var appointment = {
        time: timeSlot,
        description: appointmentDescription.trim()
    };

    // Check whether time slot is already in appointments array
    if (appointments && (appointments.length > 0)) {
        // Look for the current time label in the appointments array
        // If it's found, return the index into the array for the corresponding object
        var indexForNewAppointment = appointments.findIndex(function(item) {
            return item.time === timeSlot;
        });

        // If there already is an entry in local storage for the given time slot
        if (indexForNewAppointment >= 0) {
            var newAppointments = [];  // New temporary array, to hold some values from appointments array

            // Copy the elements from appointments that precede the found object into the temporary array
            for (var i = 0; i < indexForNewAppointment; i++) {
                newAppointments.push(appointments[i]);
            }

            // Copy the elements from appointments that follow the found object into the temporary array
            for (var j = indexForNewAppointment + 1; j < appointments.length; j++) {
                newAppointments.push(appointments[j]);
            }

            // Point appointments to our new temporary array, if it exists, or to an empty array
            if (newAppointments && (newAppointments.length > 0)) {
                appointments = newAppointments;
            } else {
                appointments = [];
            }

            localStorage.removeItem("appointments");
        }
    }

    if (appointment.description.length > 0) {
        appointments.push(appointment);
    }

    // Store the appointment in local storage
    localStorage.setItem("appointments", JSON.stringify(appointments)); 
}

// Adding click event listeners to all elements with a class of "btn-save" -- all of the save buttons
$(document).on("click", ".btn-save", putAppointmentInLocalStorage);

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
    
    // Create a column and text area for the appointment description
    var newAppointmentCol = $("<div>");
    newAppointmentCol.attr("class", "col-8 description d-flex " + pastPresentFuture);
    var newTextArea = $("<textarea>");
    newTextArea.attr("class", "form-control " + pastPresentFuture);
    newTextArea.attr("data-timeslot", inputTime12Hour);
    newAppointmentCol.append(newTextArea);
    
    // If the appointment is in local storage, populate the text area with the description
    if (appointments && (appointments.length > 0)) {
        // Look for the current time label in the appointments array
        // If it's found, return the index into the array for the corresponding object
        var indexForCurrentTime = appointments.findIndex(function(item) {
            return item.time === inputTime12Hour;
        });

        // If the current label was found in the appointments array, get the description
        // from the oject and update the text area with it
        if (indexForCurrentTime >= 0) {
            newTextArea.text(appointments[indexForCurrentTime].description);
        }
    }

    // Create a column for the save button
    var newSaveCol = $("<div>");
    newSaveCol.attr("class", "col-1 saveBtn d-flex");

    // Create a new save button
    var newSaveBtn = $("<button>");
    newSaveBtn.attr("class", "btn btn-block btn-save");
    newSaveBtn.attr("type", "button");
    newSaveBtn.attr("data-timeslot", inputTime12Hour);

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
    newRow.append(newLeftBufferCol, newTimeCol, newAppointmentCol, newSaveCol, newRightBufferCol);
    
    // Append the row 
    $("#hourly-time-blocks").append(newRow);
}

// Get a 12-hour format for hour, including AM and PM, for a 24-hour hour
function getTwelveHourFromTwentyFourHour(twentyFourHourInput) {
    var twelveHourFormat = "";  // The hour of the day, in 12-hour format

    if ((Number.isInteger(twentyFourHourInput) &&
        (twentyFourHourInput >= 0) &&
        (twentyFourHourInput <= 23))) {
        if (twentyFourHourInput === 0) {  // Midnight
            twelveHourFormat = "12AM";
        } else if (twentyFourHourInput <= 11) {  // Morning
            twelveHourFormat = twentyFourHourInput + "AM";
        } else if (twentyFourHourInput === 12) {  // Noon
            twelveHourFormat = "12PM";
        } else { // Afternoon and evening 
            twelveHourFormat = (twentyFourHourInput - 12) + "PM"; 
        }
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

// - Create the hourly time blocks and display them
// - Load any existing appointments and display them in the time blocks
// - Get the current date and display it
function init() { 
    var storedAppointments = [];  // Array to hold appointments in local storage

    // Get stored appointments from local storage
    storedAppointments = JSON.parse(localStorage.getItem("appointments"));

    // If appointments were retrieved from localStorage, update the appointments array to it
    if (storedAppointments !== null) {
       appointments = storedAppointments;
    }

    // Create the hourly time blocks and display them
    renderAllHourlyTimeBlocks();

    // Get the current date and display it -- in format day, month digits
    $("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM') + ' ' + moment().format('Do'));
}

// On page load --
init();

// to do:
// - Fix background turning white when typing in text aread
// - Use consts for past, present, future class names
});