var gam = gam || {};
gam.common = gam.common || {};
gam.common.popupProvider = function ($, options) {
    var defaults = {
        trigger: null,
        popup: null,
        overlay: ".popup-overlay",
        closeTrigger: null
    }
      , r = function () {
          this.trigger = $(this.opts.trigger);
          this.popup = $(this.opts.popup);
          this.overlay = $(this.opts.overlay);
          this.calculateDimensions = function () {
              var options = ($(window).width() - this.popup.outerWidth()) / 2
                , i = ($(window).height() - this.popup.outerHeight()) / 2;
              this.popup.css({
                  left: options,
                  top: i
              })
          }
      }
      , u = function () {
          this.show = function () {
              var i, options;
              this.calculateDimensions();
              i = this.popup;
              options = this.opts.afterShow && typeof this.opts.afterShow == "function" ? this.opts.afterShow : null;
              this.overlay.fadeIn(500, function () {
                  $(this).is(":visible") && !$(this).is(":animated") && (i.fadeIn(300),
                  options && options())
              })
          }
          ;
          this.hide = function () {
              var options = this.opts.afterClose && typeof this.opts.afterClose == "function" ? this.opts.afterClose : null
                , $ = this.popup;
              $.stop().hide();
              this.overlay.fadeOut(300, function () {
                  $.is(":visible") && $.hide();
                  options && options()
              })
          }
      }
      , f = function () {
          if (this.trigger)
              this.trigger.on("click", {
                  context: this
              }, function ($) {
                  $.preventDefault();
                  $.data.context.show()
              });
          if (this.overlay)
              this.overlay.on("click", {
                  context: this
              }, function ($) {
                  $.preventDefault();
                  $.stopPropagation();
                  $.data.context.hide()
              });
          if (this.popup)
              this.popup.find(this.opts.closeTrigger).on("click", {
                  context: this
              }, function ($) {
                  $.preventDefault();
                  $.stopPropagation();
                  $.data.context.hide()
              });
          $(window).resize({
              context: this
          }, function ($) {
              $.data.context.calculateDimensions()
          })
      }
      , e = function () {
          this.opts = $.extend(!0, defaults, options);
          r.call(this);
          this.popup && (u.call(this),
          f.call(this))
      };
    e.call(this)
}
;