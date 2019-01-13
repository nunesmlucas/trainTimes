// Initialize Firebase
var config = {
    apiKey: "AIzaSyCNjmK-2sL_wS6hODs7BzMAhXIAcDCC8Ro",
    authDomain: "coderbay-29331.firebaseapp.com",
    databaseURL: "https://coderbay-29331.firebaseio.com",
    projectId: "coderbay-29331",
    storageBucket: "coderbay-29331.appspot.com",
    messagingSenderId: "589311364580"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var first = 0;
var frequency = 0;
var nextTrain = 0;
var minutesAway = 0;

// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Code in the logic for storing and retrieving the most recent train.
    // Don't forget to provide initial data to your Firebase database.
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = moment($("#first-input").val(), "HH:mm");
    frequency = $("#frequency-input").val().trim();
//Test to see the values --- Not grabbing though...
    console.log(trainName);
    console.log(destination);
    console.log(first);
    console.log(frequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + currentTime.format("hh:mm"));

    // Difference between the times
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // Code for the push
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        first: first,
        frequency: frequency,
        nextTrain: nextTrain,
        minutesAway: tMinutesTillTrain
    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of childSnapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first);
    console.log(childSnapshot.val().frequency);

    var fNextTrainn = moment(childSnapshot.val().nextTrain).format("hh:mm");

    $("<tbody>").append(
        "<tr><td> " + childSnapshot.val().trainName +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        " </td><td > " + fNextTrainn +
        " </td><td > " + moment(childSnapshot.val().tMinutesTillTrain).format("HH:mm") +
        " </td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

