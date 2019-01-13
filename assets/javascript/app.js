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
var name = "";
var destination = "";
var first = 0;
var frequency = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for the push
    dataRef.ref().push({

        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first);
    console.log(childSnapshot.val().frequency);


    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='member-name'> " +
        childSnapshot.val().name +
        " </span><span class='member-destination'> " + childSnapshot.val().destination +
        " </span><span class='member-first'> " + childSnapshot.val().first +
        " </span><span class='member-frequency'> " + childSnapshot.val().frequency +
        " </span></div>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#first-display").text(snapshot.val().first);
    $("#frequency-display").text(snapshot.val().frequency);
});
