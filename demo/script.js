document.addEventListener("DOMContentLoaded", function() {
  var elem = document.querySelector("#inumber");
  var inumber = new INumber.default(elem, {
    className: 'number',
    change: function(value, formatValue, el, id) {
      console.log("value", value, "formatValue", formatValue);
    }
  });

  var inumberFloat = new INumber.default("#inumber-float", {
    float: true,
    decimals: 2,
    change: function(value, formatValue, el, id) {
      console.log("value", value, "formatValue", formatValue);
    }
  });

  document.body.addEventListener('click', function(e) {
    if ( !e.target.closest('.js-set-btn') ) return;

    var btn = e.target.closest('.js-set-btn');

    if ( btn.id == 'setValue' ) {
      inumber.setValue(2);
    }

    if ( btn.id == 'setMin' ) {
      inumber.setMin(10);
    }

    if ( btn.id == 'setMax' ) {
      inumber.setMax(15);
    }

    if ( btn.id == 'setStep' ) {
      inumber.setStep(2);
    }

    if ( btn.id == 'setValueFloat' ) {
      inumberFloat.setValue(0.5);
    }

    if ( btn.id == 'setMinFloat' ) {
      inumberFloat.setMin(1.2);
    }

    if ( btn.id == 'setMaxFloat' ) {
      inumberFloat.setMax(1.5);
    }
  });
});
