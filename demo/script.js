document.addEventListener("DOMContentLoaded", function() {
  var elem = document.querySelector("#inumber");
  var inumber = new INumber.default(elem, {
    className: 'number',
    change: function(value, formatValue, el, id) {
      console.log("value", value, "formatValue", formatValue);
    }
  });

  var btn = document.querySelector("#setValue");

  btn.addEventListener("click", function() {
    inumber.setValue(2);
  });

  var inumberFloat = new INumber.default("#inumber-float", {
    float: true,
    decimals: 2,
    change: function(value, formatValue, el, id) {
      console.log("value", value, "formatValue", formatValue);
    }
  });
});
