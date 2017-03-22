/**
 * Created by joel on 3/17/17.
 */

// =====================================================================
    // Daterange controls for Dropoff / Pickup inputs //
// =====================================================================

var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

var checkin = $('#dropoffDate').datepicker({
    onRender: function (date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
    }
    checkin.hide();
    $('#pickupDate')[0].focus();
}).data('datepicker');
var checkout = $('#pickupDate').datepicker({
    onRender: function (date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
    checkout.hide();
}).data('datepicker');


// =====================================================================
    // Show date range inputs if Boarding is checked //
// =====================================================================

$('#service-boarding').on('change', function () {
    if ($(this).is(':checked')) {
        $("#drop-pick").slideDown(500);
        // $("#pickupForm").slideDown();
        // $("#dropoffForm").removeClass('hide');
        // $("#pickupForm").removeClass('hide');
    }
    else {
        $("#drop-pick").slideUp(500);
        // $("#pickupForm").slideUp();
        // $("#dropoffForm").addClass('hide');
        // $("#pickupForm").addClass('hide');
    }
});

// =====================================================================
    // Sidebar Toggle //
// =====================================================================

$("#menu-toggle").click(function (e) {
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
        /** @type {!HTMLInputElement} */(document.getElementById('client-addr1')),
        {types: ['geocode']});

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

    // clear all address input fields
    addy1.val(' ');
    addy2.val(' ');
    city.val(' ');
    state.val(' ');
    zip.val(' ');

    // assign autoompleted address components to the input fields
    for (var i = 0; i < place.address_components.length; i++) {
        var component = place.address_components[i],
            componentType = component.types[0];

        if (componentType === 'street_number') {
            addy1.val(component.short_name);
        }
        else if (componentType === 'route') {
            addy1.val(addy1.val() + ' ' + component.long_name);
        }
        else if (componentType === 'locality') {
            city.val(component.long_name);
        }
        else if (componentType === 'administrative_area_level_1') {
            state.val(component.short_name);
        }
        else if (componentType === 'postal_code') {
            zip.val(component.short_name);
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
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

// Hide dropoff and pickup date fields on page load
$('#drop-pick').hide();

