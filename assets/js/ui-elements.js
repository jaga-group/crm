/**
 * Created by joel on 3/17/17.
 */
// =====================================================================
// Daterange controls for Dropoff / Pickup inputs //
// =====================================================================
// Data Picker Initialization
$('.datepicker').pickadate();

// =====================================================================
// Show date range inputs if Boarding is checked //
// =====================================================================

$('#service-boarding').on('change', function() {
    if ($(this).is(':checked')) {
        $("#drop-board").slideDown(500);
    } else {
        $("#drop-board").slideUp(500);
    }
});

// =====================================================================
// Show option for Mobile Service if Grooming is checked //
// =====================================================================

$('#service-grooming').on('change', function() {
    if ($(this).is(':checked')) {
        $("#drop-groom").slideDown(500);
    } else {
        $("#drop-groom").slideUp(500);
    }
});

// =====================================================================
// Show date range inputs if Mobile is checked //
// =====================================================================

$('#mobile-grooming').on('change', function() {
    if ($(this).is(':checked')) {
        var mobileD = $('#mobileDate');
        mobileD.removeAttr('disabled')
            .removeClass('disabled');
    } else {
        var mobileD = $('#mobileDate');
        mobileD.addClass('disabled');
        mobileD.attr('disabled', 'disabled');

    }
});

// =====================================================================
// Sidebar Toggle //
// =====================================================================

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


// =====================================================================
// Autocomplete Controls //
// =====================================================================

var autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('client-addr1')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log(place);

    // assign variables to address input fields
    var addy1 = $('#client-addr1');
    var addy2 = $('#client-addr2');
    var city = $('#client-city');
    var state = $('#client-state');
    var zip = $('#client-zip');
    var citylabel = $('#city-label');

    // clear all address input fields
    addy1.val(' ');
    addy2.val(' ');
    city.val(' ');
    state.val(' ');
    zip.val(' ');

    // assign autocompleted address components to the input fields
    for (var i = 0; i < place.address_components.length; i++) {
        var component = place.address_components[i],
            componentType = component.types[0];

        if (componentType === 'street_number') {
            addy1.val(component.short_name);
        } else if (componentType === 'route') {
            addy1.val(addy1.val() + ' ' + component.long_name);
            $('#addr1-label').addClass('active');
        } else if (componentType === 'locality') {
            city.val(component.long_name);
            $('#city-label').addClass('active');
        } else if (componentType === 'administrative_area_level_1') {
            state.val(component.short_name);
            $('#state-label').addClass('active');
        } else if (componentType === 'postal_code') {
            zip.val(component.short_name);
            $('#zip-label').addClass('active');
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}


// =====================================================================
// On Page Load //
// =====================================================================

// Hide dropoff and pickup date fields on page load
$('#drop-board').hide();
$('#drop-groom').hide();
$('#drop-mobile').hide();