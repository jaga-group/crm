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


  }); // end of on click function //

}); // end of document ready // 


