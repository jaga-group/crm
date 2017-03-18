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

/*Global Variables
==============================================================*/
var email = '';
var password = '';
const auth = firebase.auth();

/*Functions
==============================================================*/
function newUser(){
	$('#sign-up').on('click',function(event){
		event.preventDefault(event);
		//Get users email
		email = $('#user-name').val();
		password = $('#user-pw').val();

		//Clears input box
		$('#user-name').val('');
		$('#user-pw').val('');
		//Testing
		console.log('User email: ' + email);
		console.log('User password: ' + password);


			//Creates a user in the database
        auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
			  	var errorMessage = error.message;
			  	console.log(errorCode + errorMessage);
		});
	});

};  // end newUser()

function existingUser(){
		$('#sign-in').on('click',function(event){
            event.preventDefault(event);
			//Get users email
			email = $('#user-name').val();
			password = $('#user-pw').val();
			
			//Clears input box
			$('#user-name').val('');
			$('#user-pw').val('');
			//Testing
			console.log('User email: ' + email);
			console.log('User password: ' + password);

			// signs user in to app
			auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  console.log('Not a user');
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + errorMessage);
			});

		});


}; // end existingUser();

function logOut(){
	$('#log-out').on('click', function(event){
		event.preventDefault(event);
		auth.signOut();
	})
}

// listens for user log in or log out
	// LOAD LOOP - should put this INSIDE newUser() and existingUser() ???
	auth.onAuthStateChanged(function(firebaseUser){
		// if user exists
        if(firebaseUser) {
            console.log(firebaseUser);
            // redirect to reservationinfo.html
            window.location = 'reservationinfo.html';
        } else {
            $('#log-out').addClass('hide');
        }
    });




/*Main
==============================================================*/
existingUser();
newUser();
logOut();


}); // End of Document Ready // 
