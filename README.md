
# INUMBER
Simple and easy Input Spinner.

Support:
 - Float numbers
 - Internationalized number formatting

## Files
Include ```inumber.min.css``` and ```inumber.min.js```.

## Layout
```
<div id="inumber">
  <input type="text"/>
</div>
```
Float Input:
```
<div id="inumber-float">
  <input type="text"/>
</div>
```

## Usage
```
var inumber = new INumber.default('#inumber', {options});
```
For float numbers:
```
var inumberFloat = new INumber.default("#inumber-float", {
  float: true,
  decimals: 2
});
```

### Options

- ```decreaseText: '-'``` - decrease button text
- ```increaseText: '+'``` - increase button text
- ```float: false``` - float values
- ```decimals: 0``` - decimals for float values
- ```locale: ''``` - navigator.language as default or [Intl code](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
- ```inputPosition: 'between'``` - input position - 'between', 'left' or 'right'
- ```init: function(instance) {}``` - after init
- ```change: function(value, formatValue, el, id) {}``` - after change

### Methods
```inumber.setValue(2);``` - set value

```inumber.setMin(10);``` - set min

```inumber.setMax(20);``` - set max

```inumber.setStep(2);``` - set step

### Generating layout
```
<div id="inumber" class="inumber">
  <button type="button" class="inumber-button is-decrease">
  <input type="number" class="inumber-input"/>
  <button type="button" class="inumber-button is-increase">
</div>
```
