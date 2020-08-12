'use strict';

export default class INumber {

  constructor(id, opts) {

    if (!id) {
      console.error("INumber: Element not set");
      return;
    }

    let params = opts || {};

    let el;

    if (typeof id === 'object') {
      el = id;
    }

    if (typeof id === 'string') {
      el = document.querySelector(id);
    }

    this.el = el;
    this.input = el.querySelector("input");

    this.locale = params.locale || navigator.language || "en-US";

    this.decreaseText = params.decreaseText || '-';
    this.increaseText = params.increaseText || '+';

    this.float = params.float || false;

    this.className = 'inumber';

    this.inputPosition = params.inputPosition || "between";

    this.value = this.input.value || 0;

    this.formatValue = parseInt(this.input.value) || 0;

    this.min = ( this.input.hasAttribute("min") ) ? Math.abs(this.input.min) : 0;
    this.max = ( this.input.hasAttribute("max") ) ? Math.abs(this.input.max) : 0;
    this.step = ( this.input.hasAttribute("step") ) ? Math.abs(this.input.step) : 1;

    if (this.float) {

      this.value = parseFloat(this.input.value) || 0;
      this.step = parseFloat(this.step);
      this.decimals = parseInt(params.decimals) || 1;
      this.formatValue = this.formatNumber(this.value) || 0;

    } else {

      this.step = Math.ceil(this.step);
      this.value = parseInt(this.value);
      this.formatValue = this.formatNumber(this.value);

    }

    this.setValue(this.value);

    const controls = this.render();

    this.decreaseBtn = controls.decrease;
    this.increaseBtn = controls.increase;

    if (params && typeof params.init === "function") {
      params.init(this);
    }

    controls.decrease.onclick = () => {
      this.decrease();

      if (params && typeof params.change === "function") {
        params.change(this.value, this.formatValue, this.el, id);
      }
    }

    controls.increase.onclick = () => {
      this.increase();

      if (params && typeof params.change === "function") {
        params.change(this.value, this.formatValue, this.el, id);
      }
    }

    this.input.onblur = (e) => {
      this.change(e);

      if (params && typeof params.change === "function") {
        params.change(this.value, this.formatValue, this.el, id);
      }
    }
  }

  render() {

    this.el.classList.add(this.className);
    this.input.classList.add(`${this.className}-input`);

    const btnDecrease = document.createElement("button");
    const btnIncrease = document.createElement("button");

    btnDecrease.setAttribute("type", "button");
    btnDecrease.setAttribute("class", `${this.className}-button is-decrease`);

    btnIncrease.setAttribute("type", "button");
    btnIncrease.setAttribute("class", `${this.className}-button is-increase`);

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

  formatNumber(value) {
    const decimals = this.decimals;

    let numberFormat = new Intl.NumberFormat(this.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    const formatted = numberFormat.format(parseFloat(value));

    return formatted;
  }

  setValue(value) {

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

    if (this.float) {

      this.value = +parseFloat(value).toFixed(this.decimals);
      this.formatValue = this.formatNumber(value);

    } else {

      this.value = parseInt(value);
      this.formatValue = this.formatNumber(this.value);

    }

    this.input.value = this.formatValue;
  }

  decrease() {
    const value = this.value - this.step;
    this.setValue(value);
  }

  increase() {
    const value = this.value + this.step;
    this.setValue(value);
  }

  change(e) {

    let value = e.currentTarget.value;

    value = value.replace(/[a-zA-Zа-яА-Я]/g, "");
    value = value.replace(/[\s*]/g, "");
    value = value.replace(/[,*]/g, ".");

    this.setValue(value);
  }

  setMin( minValue ) {
    this.min = Math.abs( minValue );

    if ( this.value < this.min ) {
      this.setValue( this.min );
    }
  }

  setMax( maxValue ) {
    this.max = Math.abs( maxValue );

    if ( this.value > this.max ) {
      this.setValue( this.max );
    }
  }

  setStep( step ) {
    this.step = Math.abs( step );

    if (this.float) {
      this.step = parseFloat(this.step);
    } else {
      this.step = Math.ceil(this.step);
    }
  }
}
