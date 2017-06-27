var gam = gam || {};
gam.common = gam.common || {};
gam.common.popupProvider = function ($, options) {
    var defaults = {
        trigger: null,
        popup: null,
        overlay: ".popup-overlay",
        closeTrigger: null
    }
      , initialise = function () {
          // Identify the jquery objects for the trigger, popup and overlay.
          this.trigger = $(this.opts.trigger);
          this.popup = $(this.opts.popup);
          this.overlay = $(this.opts.overlay);

          // calc the top and left position to centre this popup.
          // This will change when the window is resized.
          this.calculateDimensions = function () {
              var left = ($(window).width() - this.popup.outerWidth()) / 2
                , top = ($(window).height() - this.popup.outerHeight()) / 2;
              this.popup.css({
                  left: left,
                  top: top
              })
          }
      }
      , createMethods = function () {
          //Show the popup
          this.show = function () {
              var $popup, options;
              this.calculateDimensions();
              $popup = this.popup;
              this.overlay.fadeIn(500, function () {
                  $(this).is(":visible") && !$(this).is(":animated") && $popup.fadeIn(300)
              })
          }
          ;
          this.hide = function () {
              var $popup = this.popup;
              // stop any animation and hide the popup
              $popup.stop().hide();
              // hide the overlay.
              this.overlay.fadeOut(300, function () {
                  $popup.is(":visible") && $popup.hide();
              })
          }
      }
      , bindEvents = function () {
          if (this.trigger)

              // When the trigger is clicked, the popup is displayed.
              this.trigger.on("click", {
                  context: this
              }, function ($) {
                  $.preventDefault();
                  $.data.context.show()
              });

          if (this.overlay)
              // When the overlay is clicked, the popup is hidden.
              this.overlay.on("click", {
                  context: this
              }, function (event) {
                  event.preventDefault();
                  event.stopPropagation();
                  event.data.context.hide()
              });


          if (this.popup)
              // When the close x item is clicked on the popup - close the popup.
              this.popup.find(this.opts.closeTrigger).on("click", {
                  context: this
              }, function (event) {
                  event.preventDefault();
                  event.stopPropagation();
                  event.data.context.hide()
              });

          // When the window is resized need to recalulate the central location of the popup.
          $(window).resize({
              context: this
          }, function (event) {
              event.data.context.calculateDimensions()
          })
      }
      , entry = function () {
          // Deep addition of options to defaults - all options now stored in opts.
          this.opts = $.extend(!0, defaults, options);

          // initialise the popup from the opts.
          initialise.call(this);

          // create popup operations show and hide.

          this.popup && (createMethods.call(this),
          bindEvents.call(this))
      };
    entry.call(this)
}
;