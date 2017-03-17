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
/*Functions
==============================================================*/
function newUser(){
	$('#submit').on('click',function(){
		//Get users email
		email = $('#userEmail').val();
		password = $('#userPassword').val();

		//Clears input box
		$('#userEmail').val('');
		$('#userPassword').val('');
		//Testing
		console.log('User email: ' + email);
		console.log('User password: ' + password);

			//Creates a user in the database
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
			  	var errorMessage = error.message;
		});
	});
}
function existingUser(){
		$('#existingSubmit').on('click',function(){
			//Get users email
			email = $('#existingEmail').val();
			password = $('#existingPassword').val();
			
			//Clears input box
			$('#existingEmail').val('');
			$('#existingPassword').val('');
			//Testing
			console.log('User email: ' + email);
			console.log('User password: ' + password);

			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  alert('Not a user');
			});

		});


}	
/*Main
==============================================================*/
existingUser();
newUser();

}); // End of Document Ready // 
