var config = {
    apiKey: "AIzaSyCrWL1JaBSjbXPvyIUL_hmiriFyLhjYYs8",
    authDomain: "trainscheduler-a6988.firebaseapp.com",
    databaseURL: "https://trainscheduler-a6988.firebaseio.com",
    projectId: "trainscheduler-a6988",
    storageBucket: "trainscheduler-a6988.appspot.com",
    messagingSenderId: "261117632750"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
})

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainFirst = $("#first-train-input").val().trim(); // NEED TO ADD moment info here
var trainFrequency = $("#frequency-input").val().trim();

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