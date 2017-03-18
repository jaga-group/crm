/**
 * Created by joel on 3/17/17.
 */


/* Controls daterange allowable in the dropoff and pickup date pickers
 ==============================================================*/

var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

var checkin = $('#dropoffDate').datepicker({
    onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function(ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
    }
    checkin.hide();
    $('#pickupDate')[0].focus();
}).data('datepicker');
var checkout = $('#pickupDate').datepicker({
    onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function(ev) {
    checkout.hide();
}).data('datepicker');


/* Event listener - if Boarding is checked then show the date ranges
 ==============================================================*/

$('#service-boarding').on('change',function(){
    if( $(this).is(':checked')){
        $("#dropoffForm").removeClass('hide');
        $("#pickupForm").removeClass('hide');
    }
    else{
        $("#dropoffForm").addClass('hide');
        $("#pickupForm").addClass('hide');
    }
});


/* Event listener - if menu-toggle button is clicked then
 ==============================================================*/

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});