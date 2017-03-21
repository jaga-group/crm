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


    var uiConfig = {
        signInSuccessUrl: 'reservationinfo.html',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var providerData = user.providerData;
                user.getToken().then(
                    function(accessToken) {
                    document.getElementById('sign-in-status').textContent = 'Signed in';
                    document.getElementById('sign-in').textContent = 'Sign out';
                    document.getElementById('account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
            console.log(JSON.stringify(user));
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';
            }
        }, function(error) {
            console.log(error);
        });

    }; // end initApp() function

    function adminInitApp() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var providerData = user.providerData;
                user.getToken().then(
                    function(accessToken) {
                        document.getElementById('sign-in-status').textContent = 'Signed in';
                        document.getElementById('sign-in').textContent = 'Sign out';
                        document.getElementById('account-details').textContent = JSON.stringify({
                            displayName: displayName,
                            email: email,
                            emailVerified: emailVerified,
                            photoURL: photoURL,
                            uid: uid,
                            accessToken: accessToken,
                            providerData: providerData
                        }, null, '  ');
                        console.log(JSON.stringify(user));
                    });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';
            }
        }, function(error) {
            console.log(error);
        });
    }; // end adminInitApp() function




    $('#admin').on('click', function(event){
        event.preventDefault(event);
       ui.reset();
        $('#firebaseui-auth-container').empty();
        $('#admin').hide();
        uiConfig = {
            signInSuccessUrl: 'https://www.google.com',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ]
        };

        ui.start('#admin-firebaseui-auth-container', uiConfig);
       adminInitApp();

    });


    window.addEventListener('load', function() {
        initApp()
    });

}); // End of Document Ready //
