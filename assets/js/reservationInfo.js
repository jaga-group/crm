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
// ParsleyJS Validation //
// =====================================================================

    $(function () {
        $('#res-info').parsley().on('field:validated', function() {
            var ok = $('.parsley-error').length === 0;
            $('.bs-callout-info').toggleClass('hidden', !ok);
            $('.bs-callout-warning').toggleClass('hidden', ok);
        })
            .on('form:submit', function() {
                // alert('this fucking sucks!!!');


// =====================================================================
    // Reservation Functions //
// =====================================================================

    // $("#rsvp").on("click", function(event) {
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

        if (clientPetType === true) {
            $('#client-pet-type').val();
        }

        var service,
            dropOffDate,
            pickUpDate;

        var serviceBoarding = $('#service-boarding').is(':checked');
        if (serviceBoarding === true) {
            service = 'Boarding';
            $('#service-boarding').val();
            dropOffDate = $('#dropoffDate').val();
            pickUpDate = $('#pickupDate').val();
        }
        ;

        var serviceGrooming = $('#service-grooming').is(':checked');
        if (serviceGrooming === true) {
            service = 'Grooming';
            $('#service-grooming').val();
        }
        ;

        var serviceDayCare = $('#service-daycare').is(':checked');
        if (serviceDayCare === true) {
            service = 'Day Care';
            $('#service-daycare').val();
        }
        ;

        var serviceTraining = $('#service-training').is(':checked');
        if (serviceTraining === true) {
            service = 'Training';
            $('#service-training').val();
        }
        ;


        var clientInfo = {
            clientFirst: clientFirst,
            clientLast: clientLast,
            clientEmail: clientEmail,
            clientPhone: clientPhone,
            clientAddr1: clientAddr1,
            clientAddr2: clientAddr2,
            clientCity: clientCity,
            clientState: clientState,
            clientZip: clientZip,
            petName: petName,
            clientPetType: clientPetType,
            service: service,
            dropOffDate: dropOffDate,
            pickUpDate: pickUpDate
        };

        database.ref('/client').push(clientInfo);

        // clears res form after user presses submit //
        $('#res-form').empty();
        $('<div id="thanks">').appendTo('#res-form');
        $('#thanks').html("Hi " + clientInfo.clientFirst + "! " + clientInfo.petName + " is scheduled for " + clientInfo.service + ". One of our team members will contact you soon!");
        // adds log out button
        $('<button id="log-out">').appendTo('#res-form').text("Log Out");
        // on click of #log-out, user is signed out of firebase
        $('#log-out').on('click', function (event) {
            event.preventDefault(event);
            $('#res-form').html("You have logged out.");
            firebase.auth().signOut();
        }); // end #log-out click function

        return false; // Don't submit form for this demo
    });
            });

// =====================================================================
        // Adding Event to Google Calendar //
// =====================================================================
        var calendarId = '801684809525-2vmlj173668rqofkkc1bpmnoahuais2h.apps.googleusercontent.com';
        var apiKey = 'AIzaSyAn4byZIT2w3D6KYLFGPw6XNTDZQjbGrXQ';
        var scopes = 'https://www.googleapis.com/auth/calendar';
        var cDropOffDate = clientInfo.dropOffDate;
        var convertedDropOffDate = moment(cDropOffDate).format('YYYY-MM-DD');
        var finalDropOffDate = convertedDropOffDate + "T10:00:00.000-07:00";
        var cPickUpDate = clientInfo.pickUpDate;
        var convertedPickUpDate = moment(cPickUpDate).format('YYYY-MM-DD');
        var finalPickUpDate = convertedPickUpDate + "T10:00:00.000-07:00";


        function handleClientLoad() {
            gapi.client.setApiKey(apiKey);
            window.setTimeout(checkAuth, 1);
            checkAuth();
        }

        function checkAuth() {
            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
                handleAuthResult);
        }

        function handleAuthResult(authResult) {
            var authorizeButton = document.getElementById('rsvp');
            if (authResult) {
                authorizeButton.style.visibility = 'hidden';
                makeApiCall();
            } else {
                authorizeButton.style.visibility = '';
                authorizeButton.onclick = handleAuthClick;
            }
        }

        function handleAuthClick(event) {
            gapi.auth.authorize(
                {client_id: clientId, scope: scopes, immediate: false},
                handleAuthResult);
            return false;
        }

        //
        // var resource = {
        //     "summary": "Boarding",
        //     "location": "V.I.Pets Resort",
        //     "start": {
        //         "dateTime": finalDropOffDate
        //     },
        //     "end": {
        //         "dateTime": finalPickUpDate
        //     }
        // };
        // var request = gapi.client.calendar.events.insert({
        //     'calendarId': calendarId,
        //     'resource': resource
        // });
        // request.execute(function(resp) {
        //     console.log(resp);
        // });

        var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?sendNotifications=false&access_token=' + apiKey;
        var data = {
            end: {dateTime: finalDropOffDate}
            , start: {dateTime: finalPickUpDate}
            , summary: "New Calendar Event from API"
        };

        var ajax = $.ajax({
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data),
            method: 'POST',
        }).done(function (response) {
            console.log('ajax call success' + response);
        }).fail(function (jqHXR, textStatus) {
                console.log("addEvent(): ajax failed = " + jqHXR.responseText);
                console.log(jqHXR);
            });



    }); // end of #rsvp on click function //





// =====================================================================
    // Dashboard Functions - Customer View //
// =====================================================================

        var firstName,
            lastName,
            email,
            phone,
            addr1,
            addr2,
            city,
            state,
            zip,
            petName;

    $("#customer-view").on("click", function(event) {
        event.preventDefault(event);
        console.log("customer view click");
        $("#dashboard-content").empty();


        database.ref('/client').on("child_added", function(childSnapshot) {
            console.log("snapshot: " + JSON.stringify(childSnapshot.val()));

            firstName = (childSnapshot.val().clientFirst);
            lastName = (childSnapshot.val().clientLast);
            email = (childSnapshot.val().clientEmail);
            phone = (childSnapshot.val().clientPhone);
            addr1 =(childSnapshot.val().clientAddr1);
            addr2 = (childSnapshot.val().clientAddr2);
            city = (childSnapshot.val().clientCity);
            state = (childSnapshot.val().clientState);
            zip = (childSnapshot.val().clientZip);
            petName = (childSnapshot.val().petName);

            // Log everything that's coming out of snapshot
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(phone);
            console.log(addr1);
            console.log(addr2);
            console.log(city);
            console.log(state);
            console.log(zip);
            console.log(petName);


        // full list of items to the well
        $("#dashboard-content").append("<div class='well'><span id='member-info'> " + firstName + lastName + "<br>" +
            " </span><span id='email'> " + email + "<br>" +
            " </span><span id='phone'> " + phone + "<br>" +
            " </span><span id='address1'> " + addr1 + "<br>" +
            " </span><span id='address2'> " + addr2 + "<br>" +
            " </span><span id='city'> " + city + "<br>" +
            " </span><span id='state'> " + state + "<br>" +
            " </span><span id='zip'> " + zip + "<br>" +
            " </span><span id='petName'> " + petName + " </span></div>");

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);

        });// end of dataRef //



    }); // end of #customer view on click //


// =====================================================================
    // Dashboard Functions - Snapshot View //
// =====================================================================

    $('#snapshot-view').on('click', function(event) {
        event.preventDefault(event);
        console.log('snapshot view click');
        $('#dashboard-content').empty();
        $('#dashboard-content').append('<div id="calendar">');
        $('#calendar').fullCalendar({
            googleCalendarApiKey: 'AIzaSyAn4byZIT2w3D6KYLFGPw6XNTDZQjbGrXQ',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: {
                googleCalendarId: '422sm5uub9lo8o7el0cvpogmkc@group.calendar.google.com'
            }
        });



    }); // end of #snapshot-view on click

}); // end of document ready //
