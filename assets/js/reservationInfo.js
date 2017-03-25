var clientInfoArray = [];
var addressArray = [];
var addressArray2 = [];
var userAddress = [];
var mainData = [];

$(document).ready(function() {

    database = firebase.database();

    getData();
    console.log(mainData);


    // =====================================================================
    // Parsley Form Validation //
    // =====================================================================

    $(function() {
        $('#res-info').parsley().on('field:validated', function() {
                var ok = $('.parsley-error').length === 0;
            })
            .on('form:submit', function() {


                // =====================================================================
                // Reservation Functions //
                // =====================================================================

                // Preventing the buttons default behavior when clicked (which is submitting a form)
                event.preventDefault();
                // Grabbing input on res info page // 
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
                };

                var serviceGrooming = $('#service-grooming').is(':checked');
                if (serviceGrooming === true) {
                    service = 'Grooming';
                    $('#service-grooming').val();
                };

                var serviceDayCare = $('#service-daycare').is(':checked');
                if (serviceDayCare === true) {
                    service = 'Day Care';
                    $('#service-daycare').val();
                };

                var serviceTraining = $('#service-training').is(':checked');
                if (serviceTraining === true) {
                    service = 'Training';
                    $('#service-training').val();
                };


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
                $('#thanks').html("Hi " + clientFirst + "! " + petName + " is scheduled for " + service + ". One of our team members will contact you soon!");
               
                    firebase.auth().signOut();
           
                    

//===================CLOSING PARSLEY STUFF==============================
                return false; // Don't submit form for this demo

            });
    });


    // =====================================================================
    // Dashboard Functions - Customer View //
    // =====================================================================

    var clientInfo,
        firstName,
        lastName,
        fullName,
        email,
        phone,
        addr1,
        addr2,
        city,
        state,
        zip,
        petName;


    $(".customer-view").on("click", function(event) {
        event.preventDefault(event);
        console.log("customer view click");
        $("#dashboard-content").empty();
        $('#dashboard-content').append('<table id="table" class="display" width="100%"></table>')
            .addClass('white');


        $('#table').DataTable({
            data: clientInfoArray,
            columns: [{
                    title: "Client Name"
                },
                {
                    title: "Email"
                },
                {
                    title: "Phone"
                },
                {
                    title: "Address"
                },
                {
                    title: "Address ext"
                },
                {
                    title: "City"
                },
                {
                    title: "State"
                },
                {
                    title: "Zip Code"
                },
                {
                    title: "Pet Name"
                }
                // {title: "Notes"}
            ]
        }); // end render DataTable


    }); // end of #customer view on click //

    // =====================================================================
    // Dashboard Functions - Maps View //
    // =====================================================================
    // Google Maps on click function // 
    $('.maps-view').on('click', function(event) {
        event.preventDefault(event);
        console.log('maps view click');
        $('#dashboard-content').empty();
        $('#dashboard-content').append('<div class="row"><div class="col-md-7"><div id="map"></div><div class="col-md-4" id="dir-div"></div></div></div>').addClass('white');
        $('#dir-div').append('<div id="directions">');
        $('#directions').append('<table id="directionsTable">');

        // Sets center point for maps // 
        var map;
        var latLong = {
            lat: 28.455022,
            lng: -81.438414
        };
        var elevator;
        var myOptions = {
            zoom: 10,
            center: latLong,
            mapTypeId: 'terrain'
        };
        map = new google.maps.Map($('#map')[0], myOptions);

        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'Google Maps'
        });

        for (var x = 0; x < addressArray.length; x++) {
            console.log("hey");


            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressArray[x] + '&sensor=false', null, function (data) {



                console.log(data);
                var p = data.results[0].geometry.location
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map
                    
                }); /*End Google maps marker */

            }); // End getJSON // 

        } // End of for loop // 


        $('#directionsTable').DataTable({
            data: addressArray2,
            columns: [{
                title: "Client Name"
                },
                {
                    title: "Address"
                },
                {
                    title: "Address ext"
                },
                {
                    title: "City"
                },
                {
                    title: "State"
                },
                {
                    title: "Zip Code"
                }]
        }); // end render DataTable

    }); // End of Maps on click 



    // =====================================================================
    // Dashboard Functions - Snapshot View //
    // =====================================================================

    $('.snapshot-view').on('click', function(event) {
        event.preventDefault(event);
        console.log('snapshot view click');
        $('#dashboard-content').empty();
        $('#dashboard-content').append('<div id="calendar">').addClass('white');
        $('#calendar').fullCalendar({
            googleCalendarApiKey: 'AIzaSyAn4byZIT2w3D6KYLFGPw6XNTDZQjbGrXQ',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: {
                googleCalendarId: '422sm5uub9lo8o7el0cvpogmkc@group.calendar.google.com',
                eventColor: '#378006'
            },
            defaultView: 'agendaDay',
            eventRender: function (event, element) {
                if (event.description == "S") {	// Sunday Play & Train
                    element.css('background-color', '#3BF7C9');
                } else if (event.description == "B") {	// Boarding
                    element.css('background-color', '#E80C7A');
                } else if (event.description == "P") {	// Puppy Training
                    element.css('background-color', '#21C9FF');
                } else if (event.description == "D") {	// Day Care
                    element.css('background-color', '#57E040');
                } else if (event.description == "I") {	// Intermediate Training
                    element.css('background-color', '#E8B51F');
                } else if (event.description == "G") {	// Grooming
                    element.css('background-color', '#2E4FE8');
                } else if (event.description == "A") {	// Administrative
                    element.css('background-color', '#E82C0C');
                } else if (event.description == "F") {	// First Time Boarding Workshop
                    element.css('background-color', '#E8E45B');
                } else if (event.description == "T") {	// Private Training
                    element.css('background-color', '#57E040');
                } else {
                    element.css('background-color', '#B194F5');
                }
            }
        });

    }); // end of #snapshot-view on click


    function getData() {


        database.ref('/client').orderByChild('/clientFirst').on("child_added", function(childSnapshot) {
                // console.log("snapshot: " + JSON.stringify(childSnapshot.val()));

                addr1 = childSnapshot.val().clientAddr1;
                addr2 = childSnapshot.val().clientAddr2;
                city = childSnapshot.val().clientCity;
                state = childSnapshot.val().clientState;
                zip = childSnapshot.val().clientZip;
                firstName = childSnapshot.val().clientFirst;
                lastName = childSnapshot.val().clientLast;
                fullName = firstName + " " + lastName;
                email = childSnapshot.val().clientEmail;
                phone = childSnapshot.val().clientPhone;
                petName = childSnapshot.val().petName;
                clientInfo = [fullName, email, phone, addr1, addr2, city, state, zip, petName];
                userAddress = [addr1, addr2, city, state, zip];
                userAddress2 = [fullName, addr1, addr2, city, state, zip];
                clientInfoArray.push(clientInfo);
                addressArray.push(userAddress);
                addressArray2.push(userAddress2);
                var data = {
                    clientInfoArray: clientInfoArray,
                    addressArray: addressArray,
                    addressArray2: addressArray2
                };


                // Log everything that's coming out of snapshot
                mainData.push(data);



            }), // end on child added function


            // Handle the errors
            function(errorObject) {
                console.log("Errors handled: " + errorObject.code);

            }; // end of dataRef //


    } // end of getData // 


}); // end of document ready //