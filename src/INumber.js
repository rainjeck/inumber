/**
 * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
 * Repository: https://github.com/rainjeck/inumber
 * License: MIT, see file 'LICENSE'
 */
'use strict';

export default class INumber {

  constructor(id, params) {

    if (!id) {
      console.error("INumber: Element not set");
      return;
    }

    const el = document.querySelector(id);
    const input = el.querySelector("input");

    this.el = el;
    this.input = input;

    this.locale = params.locale || navigator.language || "en-US";

    this.decreaseText = (params && params.decreaseText) ? params.decreaseText : '-';
    this.increaseText = (params && params.increaseText) ? params.increaseText : '+';

    this.float = (params && params.float && typeof params.float === 'boolean') ? params.float : false;

    this.className = 'inumber';

    if (params && this.checkParam('inputPosition', params.inputPosition)) {
      this.inputPosition = params.inputPosition;
    } else {
      this.inputPosition = 'between';
    }

    const min = input.getAttribute("min");
    const max = input.getAttribute("max");
    const step = input.getAttribute("step");

    this.value = (input.value) ? parseFloat(input.value) : 0;

    this.formatValue = (input.value) ? this.formatNumber(input.value) : 0;

    this.min = (min) ? Math.abs(min) : 0;
    this.max = (max) ? Math.abs(max) : 0;
    this.step = (step) ? Math.abs(step) : 1;

    if (this.float) {
      this.step = parseFloat(this.step);
      this.decimals = (params && params.decimals) ? parseInt(params.decimals) : 1;
    } else {
      this.step = Math.ceil(this.step);
      this.value = parseInt(this.value);
    }

    this.setValue( this.value );

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

    input.onkeyup = (e) => {
      this.keyup(e);

      if (params && typeof params.change === "function") {
        params.change(this.value, this.formatValue, this.el, id);
      }
    };
  }

  render() {

    this.el.classList.add(this.className);
    this.input.classList.add(`${this.className}-input`);

    const btnDecrease = document.createElement("button");
    const btnIncrease = document.createElement("button");

    btnDecrease.setAttribute("type", "button");
    btnDecrease.setAttribute("class", `${this.className}-button decrease`);

    btnIncrease.setAttribute("type", "button");
    btnIncrease.setAttribute("class", `${this.className}-button increase`);

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

    return {decrease: btnDecrease, increase: btnIncrease};
  }

  checkParam(param, value) {
    if (param == 'inputPosition') {

      const position = ['left', 'between', 'right'];

      if (position.indexOf(value) >= 0) {
        return true;
      }

      return false;
    }
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

    if (this.min >= 0 && value < this.min) {
      value = this.min;
    }

    if (this.max != 0 && value > this.max) {
      value = this.max;
    }

    if (value == "") {
      value = 0;
    }

    if (this.float) {
      this.value = +parseFloat(value).toFixed(this.decimals);
      this.formatValue = this.formatNumber(value);
    } else {
      this.value = parseInt(value);
      this.formatValue = this.formatNumber(value);
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

  keyup(e) {
    const key = parseInt(e.which);

    if (key != 8 && key != 0 && (key < 48 || key > 57) && (key < 96 || key > 105)) {
      return;
    }

    this.setValue(e.currentTarget.value);
  }
}
