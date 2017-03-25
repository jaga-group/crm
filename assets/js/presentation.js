$(document).ready(function () {


var team = $('#team-card'),
    future = $('#future-card'),
    tech = $('#tech-card'),
    pl = $('#presentation-landing'),
    pt = $('#presentation-team'),
    pf = $('#presentation-future'),
    ph = $('#presentation-tech'),
    home = $('#home'),
    ca = $('#content-area');


    team.on('click', function () {
        pl.slideUp();
        ca.empty();
        setTimeout( function(){ pt.fadeIn(); }, 400)
    });

    future.on('click', function () {
        pl.slideUp();
        ca.empty();
        setTimeout( function(){ pf.fadeIn(); }, 400)
    });

    tech.on('click', function () {
        pl.slideUp();
        ca.empty();
        setTimeout( function(){ ph.fadeIn(); }, 400)
    });

    pt.on('click', function () {
        pt.slideUp();
        pf.slideUp();
        ph.slideUp();
        ca.empty();
        setTimeout( function(){ pl.slideDown(); }, 500)
    });

    pf.on('click', function () {
        pt.slideUp();
        pf.slideUp();
        ph.slideUp();
        ca.empty();
        setTimeout( function(){ pl.slideDown(); }, 500)
    });

    ph.on('click', function () {
        pt.slideUp();
        pf.slideUp();
        ph.slideUp();
        ca.empty();
        setTimeout( function(){ pl.slideDown(); }, 500)
    });

    pt.hide();
    pf.hide();
    ph.hide();



});