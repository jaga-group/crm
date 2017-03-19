$(document).ready(function(){ 

 // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB24kr0uOAMqt674qN_1z7fIe8TR_1Ac84",
        authDomain: "jagaproject-2740a.firebaseapp.com",
        databaseURL: "https://jagaproject-2740a.firebaseio.com",
        storageBucket: "jagaproject-2740a.appspot.com",
        messagingSenderId: "801684809525"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

// =====================================================================
    // Reservation Functions //
// =====================================================================

 $("#rsvp").on("click", function(event) {
 // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();

        var clientFirst = $("#client-first").val().trim();
        var clientLast = $("#client-last").val().trim();
        var clientEmail = $("#client-email").val().trim();
        var clientPhone = $("#client-phone").val().trim();
        var clientAddr1 = $("#client-addr1").val().trim();
        var clientAddr2 = $("#client-addr2").val().trim();
        var clientCity = $("#client-city").val().trim();
        var clientState = $("#client-state").val().trim();
        var clientZip = $("#client-zip").val().trim();
        var petName = $("#pet-name").val().trim();
        var clientPetType = $("#client-pet-type").is(':checked');
        
    			 if(clientPetType === true){
        		    $('#client-pet-type').val();
                }    	
        	
        var serviceBoarding = $('#service-boarding').is(':checked');

                if(serviceBoarding === true){
    	
        		    $('#service-boarding').val();
        		    $('#dropoffdate').val();
        		    $('#pickupForm').val();
                }
        		
        
 
        var serviceGrooming = $('#service-grooming').is(':checked');
        
                if(serviceBoarding === true){
                    $('#service-grooming').val(); 
                }
        
        
        var serviceDayCare = $('#service-daycare').is(':checked');

    			if(serviceDayCare === true){
                    $('#service-daycare').val(); 
                }
        	
        var serviceTraining = $('#service-training').is(':checked');
        
                if(serviceDayCare === true){
        		    $('#service-training').val();
                }           
        		



var clientInfo = {
    clientFirst: clientFirst,
    clientLast: clientLast,
    clientPhone: clientPhone,
    clientAddr1: clientAddr1,
    clientAddr2: clientAddr2,
    clientCity:clientCity,
    clientState: clientState,
    clientZip: clientZip,
    petName: petName,
    clientPetType: clientPetType
}

database.ref('/client').push(clientInfo);
  }); // end of #rsvp on click function //


database.ref().on("child_added", function(childSnapshot) {

      var firstName = (childSnapshot.val().clientFirst);
      var lastName = (childSnapshot.val().clientLast);
      var email = (childSnapshot.val().clientEmail);
      var phone = (childSnapshot.val().clientPhone);
      var addr1 =(childSnapshot.val().clientAddr1);
      var addr2 = (childSnapshot.val().clientAddr2);
      var city = (childSnapshot.val().clientCity);
      var state = (childSnapshot.val().clientState);
      var zip = (childSnapshot.val().clientZip);
      var petName = (childSnapshot.val().clientpetName);



      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().clientFirst);
      console.log(childSnapshot.val().clientLast);
      console.log(childSnapshot.val().clientEmail);
      console.log(childSnapshot.val().clientPhone);
      console.log(childSnapshot.val().clientAddr1);
      console.log(childSnapshot.val().clientAddr2);
      console.log(childSnapshot.val().clientCity);
      console.log(childSnapshot.val().clientState);
      console.log(childSnapshot.val().clientZip);
      console.log(childSnapshot.val().clientpetName);




    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

});// end of dataRef // 

   


 


 // clears res form after user presses submit //
     $('#res-form').empty();
     $('<div id="thanks">').appendTo('#res-form');
     $('#thanks').html("Hi " + clientInfo.clientFirst + "! " + clientInfo.petName + " is scheduled for ...  One of our team members will contact you soon!");
     // adds log out button
     $('<button id="log-out">').appendTo('#res-form').text("Log Out");
     // on click of #log-out, user is signed out of firebase
     $('#log-out').on('click', function(event) {
         event.preventDefault(event);
         $('#res-form').html("You have logged out.");
         firebase.auth().signOut();
     });


  }); // end of #rsvp on click function //





// =====================================================================
    // Dashboard Functions //
// =====================================================================


$("#customer-view").on("click", function(event) {
    event.preventDefault(event);
    console.log("customer view click");
        $(".dashboard-content").empty();
        // full list of items to the well
      $(".dashboard-content").append("<div class='well'><span id='member-info'> " + firstName + lastName +
        " </span><span id='email'> " + email +
        " </span><span id='phone'> " + phone +
        " </span><span id='address1'> " + addr1 +
        " </span><span id='address2'> " + addr2 +
        " </span><span id='city'> " + city +
        " </span><span id='state'> " + state +
        " </span><span id='zip'> " + zip +
        " </span><span id='petName'> " + petName + " </span></div>");


  

});// end of #customer view on click //



}); // end of document ready // 


