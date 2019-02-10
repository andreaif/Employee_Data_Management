$(document).ready(function() {
    
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD8wgMkWMbAESzviKZQGUGilX1t4Umg7Lg",
    authDomain: "employee-database-manage-3f568.firebaseapp.com",
    databaseURL: "https://employee-database-manage-3f568.firebaseio.com",
    projectId: "employee-database-manage-3f568",
    storageBucket: "employee-database-manage-3f568.appspot.com",
    messagingSenderId: "779656556336"
  };
  firebase.initializeApp(config);
    
    // a var for database
     var database = firebase.database();
    
    // button to submit the user given info
    $("#submitBtn").on("click", function(event) {
        event.preventDefault(); 
    
        //input values to variables
        var name = $("#name").val().trim();
        var role = $("#role").val().trim();
        var start = moment($("#start").val().trim(), "MM/DD/YYYY").format("X");
        var rate = $("#rate").val().trim();
    

        //new employee info to link with firebase def
        var newEmployee = {
            Ename: name,
            Erole: role,
            Nstart: start,
            Erate: rate
        };
    
        //uploads newEmployee to firebase
        database.ref().push(newEmployee);
        
        //clears elements 
        $("#name").val("");
        $("#role").val("");
        $("#start").val("");
        $("#rate").val("");
    
        return false;
    
    }); 
    
    //adding to current employee table from Add new
    database.ref().on("child_added", function(childSnapshot,prevChildKey) {
    
            //console.log(childSnapshot.val());
            //store in variables
            var name = childSnapshot.val().Ename;
            var role =childSnapshot.val().Erole;
            var start = childSnapshot.val().Nstart;
            var rate = childSnapshot.val().Erate;
    
    console.log(name);
    console.log(role);
    console.log(start);
    console.log(rate);
    
            // Prettify the employee start
  var Newstart = moment.unix(start).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(start, "X"), "months");
  console.log(empMonths);


  // Calculate the total billed rate
  var empBilled = empMonths * rate;
  console.log(empBilled);
            //adding info to main table 
$("#currentTable > tbody").append("<tr><td>" + name + "</td><td>" + role+ "</td><td>" + Newstart + "</td><td>" + empMonths+ "</td><td>" + rate + "</td><td>" + empBilled+ "</td></tr>");
    
    });
    });
    