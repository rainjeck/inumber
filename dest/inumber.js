(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.INumber = mod.exports;
  }
})(this, function (_exports) {
  /**
   * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
   * Repository: https://github.com/rainjeck/inumber
   * License: MIT, see file 'LICENSE'
   */
  'use strict';

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var INumber =
  /*#__PURE__*/
  function () {
    function INumber(id, params) {
      var _this = this;

      _classCallCheck(this, INumber);

      if (!id) {
        console.error("INumber: Element not set");
        return;
      }

      var el = document.querySelector(id);
      var input = el.querySelector("input");
      this.el = el;
      this.input = input;
      this.locale = params.locale || navigator.language || "en-US";
      this.decreaseText = params.decreaseText || '-';
      this.increaseText = params.increaseText || '+';
      this["float"] = params["float"] || false;
      this.className = 'inumber';
      this.inputPosition = params.inputPosition || "between";
      var min = input.getAttribute("min");
      var max = input.getAttribute("max");
      var step = input.getAttribute("step");
      this.value = input.value || 0;
      this.formatValue = parseInt(input.value) || 0;
      this.min = min ? Math.abs(min) : 0;
      this.max = max ? Math.abs(max) : 0;
      this.step = step ? Math.abs(step) : 1;

      if (this["float"]) {
        this.value = parseFloat(input.value) || 0;
        this.step = parseFloat(this.step);
        this.decimals = parseInt(params.decimals) || 1;
        this.formatValue = this.formatNumber(this.value) || 0;
      } else {
        this.step = Math.ceil(this.step);
        this.value = parseInt(this.value);
        this.formatValue = this.formatNumber(this.value);
      }

      this.setValue(this.value);
      var controls = this.render();
      this.decreaseBtn = controls.decrease;
      this.increaseBtn = controls.increase;

      if (params && typeof params.init === "function") {
        params.init(this);
      }

      controls.decrease.onclick = function () {
        _this.decrease();

        if (params && typeof params.change === "function") {
          params.change(_this.value, _this.formatValue, _this.el, id);
        }
      };

      controls.increase.onclick = function () {
        _this.increase();

        if (params && typeof params.change === "function") {
          params.change(_this.value, _this.formatValue, _this.el, id);
        }
      };

      input.onblur = function (e) {
        _this.change(e);

        if (params && typeof params.change === "function") {
          params.change(_this.value, _this.formatValue, _this.el, id);
        }
      };
    }

    _createClass(INumber, [{
      key: "render",
      value: function render() {
        this.el.classList.add(this.className);
        this.input.classList.add("".concat(this.className, "-input"));
        var btnDecrease = document.createElement("button");
        var btnIncrease = document.createElement("button");
        btnDecrease.setAttribute("type", "button");
        btnDecrease.setAttribute("class", "".concat(this.className, "-button decrease"));
        btnIncrease.setAttribute("type", "button");
        btnIncrease.setAttribute("class", "".concat(this.className, "-button increase"));
        btnDecrease.innerHTML = this.decreaseText;
        btnIncrease.innerHTML = this.increaseText;

        if (this.inputPosition == 'left') {
          this.el.insertBefore(btnIncrease, null);
          this.el.insertBefore(btnDecrease, null);
        }

        if (this.inputPosition == 'right') {
          this.el.insertBefore(btnIncrease, this.el.firstChild);
          this.el.insertBefore(btnDecrease, this.el.firstChild);
        }

        if (this.inputPosition == 'between') {
          this.el.insertBefore(btnDecrease, this.el.firstChild);
          this.el.insertBefore(btnIncrease, null);
        }

        return {
          decrease: btnDecrease,
          increase: btnIncrease
        };
      }
    }, {
      key: "formatNumber",
      value: function formatNumber(value) {
        var decimals = this.decimals;
        var numberFormat = new Intl.NumberFormat(this.locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
        var formatted = numberFormat.format(parseFloat(value));
        return formatted;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        if (typeof value === 'NaN') {
          this.value = value = 0;
        }

        if (value == "") {
          this.value = value = 0;
        }

        if (this.min >= 0 && value < this.min) {
          value = this.min;
        }

        if (this.max != 0 && value > this.max) {
          value = this.max;
        }

        if (this["float"]) {
          this.value = +parseFloat(value).toFixed(this.decimals);
          this.formatValue = this.formatNumber(value);
        } else {
          this.value = parseInt(value);
          this.formatValue = this.formatNumber(this.value);
        }

        this.input.value = this.formatValue;
      }
    }, {
      key: "decrease",
      value: function decrease() {
        var value = this.value - this.step;
        this.setValue(value);
      }
    }, {
      key: "increase",
      value: function increase() {
        var value = this.value + this.step;
        this.setValue(value);
      }
    }, {
      key: "change",
      value: function change(e) {
        var value = e.currentTarget.value;
        value = value.replace(/[a-zA-Zа-яА-Я]/g, "");
        value = value.replace(/[\s*]/g, "");
        value = value.replace(/[,*]/g, ".");
        this.setValue(value);
      }
    }]);

    return INumber;
  }();

  _exports["default"] = INumber;
});
//# sourceMappingURL=../dest/inumber.js.map