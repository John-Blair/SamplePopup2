/// <reference path="popupProvider.js" />
$(function () {

    // popup class identifes popups and css ensures they are initially hidden.
    // popup-trigger class identifies the link used to display the popup
    // within the popup close class is used to display the x icons and cancel class identifes other items that close the popup



    new gam.common.popupProvider(jQuery, {
        popup: ".popup",
        trigger: ".popup-trigger",
        closeTrigger: ".close,.cancel",
        
    });

});