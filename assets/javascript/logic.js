var config = {
    apiKey: "AIzaSyCrWL1JaBSjbXPvyIUL_hmiriFyLhjYYs8",
    authDomain: "trainscheduler-a6988.firebaseapp.com",
    databaseURL: "https://trainscheduler-a6988.firebaseio.com",
    storageBucket: "trainscheduler-a6988.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainFirst = $("#first-train-input").val().trim(); // NEED TO ADD moment info here
var trainFrequency = parseInt($("#frequency-input").val());

// Creates local "temporary" object for holding train data
var trainData = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
    // Will need to add a variable for minutes away!!!
};

// Upload train data to the database
database.ref().push(trainData);

// Logs everything to the console
console.log(trainData.name);
console.log(trainData.destination);
console.log(trainData.first);
console.log(trainData.frequency);
//Need to add one for minutes away!

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");
//Need to add one for minutes away!

});

// Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
    // Need to add something for minutes left

    // // Console Log Train Info
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainFirst);
    // console.log(trainFrequency);
    // // Need to add something for minutes left

// ===========================MOMENT JS====================
// Creating a variable for the train frequency input
// $.isNumeric($("#frequency-input").val().trim());
// var tFrequency = $("#frequency-input").val();
// var parseFrequency = parseInt(tFrequency, 10);
// console.log(parseFrequency);

//Form validation

// Variable for Current Time 
var currentTime = moment();

// This protects against a negative number!
var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(firstTimeConverted, "minutes"); 
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFrequency;
console.log("REMAINING TIME: " + tRemainder);

// Minutes Until The Next Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// =========================================================





// Add each train's data into the table
// *** Reason trainFirst appears under frequency is because it is listed third here and train frequency 4th 
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" +
    trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain
    + "</td></tr>");

});
