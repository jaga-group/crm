var clientInfo;
$(document).ready(function () {

    database = firebase.database();


// =====================================================================
    // ParsleyJS Validation //
// =====================================================================

    $(function () {
        $('#res-info').parsley().on('field:validated', function () {
            var ok = $('.parsley-error').length === 0;
            $('.bs-callout-info').toggleClass('hidden', !ok);
            $('.bs-callout-warning').toggleClass('hidden', ok);
        })
            .on('form:submit', function () {



                // =====================================================================
                // Reservation Functions //
                // =====================================================================


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


                clientInfo = {
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
                    note: " "
                };

                if (dropOffDate) {
                    clientInfo.dropOffDate = dropOffDate;
                }

                if (pickUpDate) {
                    clientInfo.pickUpDate = pickUpDate;
                }

                database.ref('/client').push(clientInfo);
                console.log('db.ref ' + clientInfo.clientFirst);

                // handleClientLoad();


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


                function initMap() {
                    // google maps directions api //
                    if (navigator.geolocation) { //Checks if browser supports geolocation
                        navigator.geolocation.getCurrentPosition(function (position) {                                                              //This gets the
                            var latitude = position.coords.latitude;                    //users current
                            var longitude = position.coords.longitude;                 //location
                            var coords = new google.maps.LatLng(latitude, longitude); //Creates variable for map coordinates
                            var directionsService = new google.maps.DirectionsService();
                            var directionsDisplay = new google.maps.DirectionsRenderer();
                            var mapOptions = //Sets map options
                                {
                                    zoom: 15,  //Sets zoom level (0-21)
                                    center: coords, //zoom in on users location
                                    mapTypeControl: true, //allows you to select map type eg. map or satellite
                                    navigationControlOptions: {
                                        style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
                                    },
                                    mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
                                };
                            map = new google.maps.Map(/*creates Map variable*/ document.getElementById("map"), mapOptions /*Creates a new map using the passed optional parameters in the mapOptions parameter.*/);
                            directionsDisplay.setMap(map);
                            directionsDisplay.setPanel(document.getElementById('panel'));
                            var latLong = {lat: 28.455022, lng: -81.438414};
                            var request = {
                                origin: coords,
                                destination: latLong,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };

                            directionsService.route(request, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                }
                            });
                        });
                    }
                };


//===================CLOSING PARSLEY STUFF==============================
                return false; // Don't submit form for this demo
            });
    }); // end parsley validation wrapper for all functions linked to rsvp button click

    var ref = db.ref("dinosaurs");
    ref.orderByChild("dimensions/height").on("child_added", function(snapshot) {
        console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
    });

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
    var clientInfo = {};

    $("#customer-view").on("click", function (event) {
        event.preventDefault(event);
        console.log("customer view click");
        $("#dashboard-content").empty();
        $('#dashboard-content').append('<table id="table" class="display" width="100%"></table>');


        database.ref('/client').orderByChild('/clientFirst').on("child_added", function (childSnapshot) {
            console.log("snapshot: " + JSON.stringify(childSnapshot.val()));


            firstName = (childSnapshot.val().clientFirst);
            lastName = (childSnapshot.val().clientLast);
            email = (childSnapshot.val().clientEmail);
            phone = (childSnapshot.val().clientPhone);
            addr1 = (childSnapshot.val().clientAddr1);
            addr2 = (childSnapshot.val().clientAddr2);
            city = (childSnapshot.val().clientCity);
            state = (childSnapshot.val().clientState);
            zip = (childSnapshot.val().clientZip);
            petName = (childSnapshot.val().petName);
            notes = (childSnapshot.val().notes);
            if (notes == null) {
                notes: "No Notes Yet!";
            }


            // clientInfo =
            // {
            //     firstName: (childSnapshot.val().clientFirst),
            //     lastName: (childSnapshot.val().clientLast),
            //     email: (childSnapshot.val().clientEmail),
            //     phone: (childSnapshot.val().clientPhone),
            //     addr1: (childSnapshot.val().clientAddr1),
            //     addr2: (childSnapshot.val().clientAddr2),
            //     city: (childSnapshot.val().clientCity),
            //     state: (childSnapshot.val().clientState),
            //     zip: (childSnapshot.val().clientZip),
            //     petName: (childSnapshot.val().petName)
            //     // notes: (childSnapshot.val().notes)
            //     // if (notes == null) {
            //     //     notes: "No Notes Yet!";
            //     // }
            // };
            // Log everything that's coming out of snapshot
            console.log(clientInfo.firstName);
            console.log(clientInfo.lastName);
            console.log(clientInfo.email);
            console.log(clientInfo.phone);
            console.log(clientInfo.addr1);
            console.log(clientInfo.addr2);
            console.log(clientInfo.city);
            console.log(clientInfo.state);
            console.log(clientInfo.zip);
            console.log(clientInfo.petName);
            // console.log(notes);


            $("#table").append(
                "<tr><td>" + firstName + " " + lastName +
                "</td><td>" + email +
                "</td><td>" + phone +
                "</td><td>" + addr1 +
                "</td><td>" + addr2 +
                "</td><td>" + city +
                "</td><td>" + state +
                "</td><td>" + zip +
                "</td><td>" + petName +
                "</td><td>" + notes +
                "</td></td>");


            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);

        });// end of dataRef //

        $('#table').DataTable({
            data: clientInfo,
            columns: [
                {title: "Client Name"},
                {title: "Email"},
                {title: "Phone"},
                {title: "Address"},
                {title: "Address ext"},
                {title: "City"},
                {title: "State"},
                {title: "Zip Code"},
                {title: "Pet Name"},
                {title: "Notes"}
            ]
        }); // end render DataTable


    }); // end of #customer view on click //


    $('td').on('click', function () {
        console.log(this);
    });


// =====================================================================
    // Dashboard Functions - Snapshot View //
// =====================================================================

    $('#snapshot-view').on('click', function (event) {
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
