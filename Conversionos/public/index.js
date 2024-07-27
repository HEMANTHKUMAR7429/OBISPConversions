let listQuantities;
let optionQuantity;
let inputTop;
let inputBottom;
let optionTop;
let optionBottom;
let quantity;
let defQuantityId = 'length';
let quantities = [{
        name: 'Length',
        id: 'length',
        defUnitIndex: 1,
        units: [
            ["Kilometer", 1000],
            ["Meter", 1],
            ["Centimeter", 0.01],
            ["Millimeter", 0.001],
            ["Micrometer", 1e-6],
            ["Nanometer", 1e-9],
            ["Picometer", 1e-12],
            ["Mile", 1609.344],
            ["Nautical mile", 1852],
            ["Yard", 0.9144],
            ["Feet", 0.3048],
            ["Inch", 0.0254]
        ]
    },
    {
        name: 'Mass',
        id: 'mass',
        defUnitIndex: 0,
        units: [
            ["Kilogram", 1],
            ["Gram", 1e-3],
            ["Milligram", 1e-6],
            ["Nanogram", 1e-12],
            ["Ton", 1000],
            ["Quintal", 100],
            ["Pound", 0.45359237]
        ]
    },
    {
        name: 'Time',
        id: 'time',
        defUnitIndex: 7,
        units: [
            
            ["Century", 3153600000],
            ["Decade", 315360000],
            ["Year (365 days)", 31536000],
            ["Month (30 days)", 2628000],
            ["Week", 604800],
            ["Day", 86400],
            ["Hour", 3600],
            ["Minute", 60],
            ["Second", 1],
            ["Millisecond", 1e-3],
           
            
        ]
    },
    {
        name: 'Temperature',
        id: 'temperature',
        defUnitIndex: 0,
        units: [
            ["Celsius", 'value + 273.15', 'value - 273.15'],
            ["Fahrenheit", '5/9 * (value + 459.67)', '9/5 * value - 459.67'],
            ["Kelvin", 1],
            ["Rankine", '5/9 * value', '9/5 * value'],
            ["Reaumur", '5/4 * value + 273.15', '4/5 * (value - 273.15)']
        ]
    },
    {
        name: 'Angle',
        id: 'angle',
        defUnitIndex: 0,
        units: [
            ["Degree", 'value/360', 'value*360'],
            ["Radian", 'value / (2 * Math.PI)', 'value * 2 * Math.PI'],
            ["Revolution", 1],
            ["Quadrant", 0.25],
            ["Minutes", 'value/(360*60)', 'value * (360*60)'],
            ["Seconds", 'value/(360*3600)', 'value * (360*3600)']
        ]
    },
    {
        name: 'Area',
        id: 'area',
        defUnitIndex: 1,
        units: [
            ["Square Kilometer", 1e6],
            ["Square Meter", 1],
            ["Square Centimeter", 1e-4],
            ["Square Millimeter", 1e-6],
            ["Hectare", 1e4],
            ["Square Mile", 2589988.110336],
            ["Square Yard", 0.83612736],
            ["Square Feet", 0.09290304],
            ["Square Inch", 0.00064516]
        ]
    },
    {
        name: 'Volume',
        id: 'volume',
        defUnitIndex: 5,
        units: [
            ["Cubic kilometer", 1e12],
            ["Cubic meter kubik", 1e3],
            ["Cubic decimete kubik", 1],
            ["Cubic milimeter kubik", 1e-6],
            ["Kiloliter", 1e3],
            ["Liter", 1],
            ["Milliliter", 1e-3],
            ["Gallon", 3.785411784],
          
        ]
    },
    {
        name: 'Digital Storage',
        id: 'digital-storage',
        defUnitIndex: 1,
        units: [
            ["Bits", 0.125],
            ["Bytes", 1],
            ["Kilobits", 128],
            ["Kilobytes", 1024],
            ["Megabits", 131072],
            ["Megabytes", 1048576],
            ["Gigabits", 134217728],
            ["Gigabytes", 1073741824],
            ["Terabits", 137438953472],
            ["Terabytes", 1099511627776],
            ["Petabits", 140737488355328],
            ["Petabytes", 1125899906842624],
           
        ]
    },
]

function getQuantityById(id) {
    for (let i = 0; i < quantities.length; i++) {
        if (id === quantities[i].id)
            return quantities[i];
    }
}

function onInitPage() {
    listQuantities = document.getElementById('listQuantities');
    optionQuantity = document.getElementById('optionQuantity');
    inputTop = document.getElementById('inputTop');
    inputBottom = document.getElementById('inputBottom');
    optionTop = document.getElementById('optionTop');
    optionBottom = document.getElementById('optionBottom');

    let startQuantity;
    if (!startQuantity) {
        let id = localStorageGetDefault('lastQuantityID', defQuantityId);
        startQuantity = getQuantityById(id);
    }
    if (!startQuantity) {
        startQuantity = getQuantityById(defQuantityId);
    }
    loadQuantity(startQuantity.id);
}

function loadQuantity(quantityId) {
    quantity = getQuantityById(quantityId);
    localStorage.setItem('lastQuantityId', quantityId);

    optionTop.innerHTML = '';
    optionBottom.innerHTML = '';
    let unitOptions = '';
    for (let i = 0; i < quantity.units.length; i++) {
        let title = quantity.units[i][0];
        unitOptions += '<option>' + title + '</option>';
    }
    optionTop.innerHTML = unitOptions;
    optionBottom.innerHTML = unitOptions;

    document.getElementById('quantityTitle').innerHTML = quantity.name + ' Converter';

    loadUnits();

    optionQuantity.value = quantityId;
    let itemId = '';
    for (let i = 0; i < quantities.length; i++) {
        itemId = 'item' + i;
        if (quantities[i].id === quantityId) document.getElementById(itemId).className = 'selected';
        else document.getElementById(itemId).className = '';
    }

    convert();
}

function findUnitIndexByName(name) {
    for (let i = 0; i < quantity.units.length; i++) {
        if (quantity.units[i][0] === name) return i;
    }
    return -1;
}

function loadUnits() {
    optionTop.selectedIndex = findUnitIndexByName(localStorageGetDefault('top: ' + quantity.name, ''));
    if (optionTop.selectedIndex === -1) optionTop.selectedIndex = quantity.defUnitIndex;
    optionBottom.selectedIndex = findUnitIndexByName(localStorageGetDefault('bottom: ' + quantity.name, ''));
    if (optionBottom.selectedIndex === -1) optionBottom.selectedIndex = quantity.defUnitIndex + 1;
}

document.addEventListener("DOMContentLoaded", onInitPage, false);

function localStorageGetDefault(name, defaultValue) {
    let value = localStorage.getItem(name);
    return (value !== null) ? value : defaultValue;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function convertInternal(topUnitIndex, value, bottomUnitIndex, inputResult) {

    let topUnitFactor = quantity.units[topUnitIndex][1];
    let bottomUnitFactor = quantity.units[bottomUnitIndex][1];

    if (isNumber(topUnitFactor)) {
        value = value * topUnitFactor;
    } else {
        value = eval(topUnitFactor);
    }

    if (isNumber(bottomUnitFactor)) {
        value = value / bottomUnitFactor;
    } else {
        value = eval(quantity.units[bottomUnitIndex][2]);
    }

    inputResult.value = value.toFixed(4);
}

function convert() {
    let value = parseFloat(inputTop.value);
    if (isNaN(value)) {
        inputBottom.value = '';
    } else {
        convertInternal(optionTop.selectedIndex, value, optionBottom.selectedIndex, inputBottom)
        localStorage.setItem('input' + quantity.name, value.toString());
    }
}

function convertBack() {
    let value = parseFloat(inputBottom.value);

    if (isNaN(value)) {
        inputTop.value = '';
    } else {
        let topUnitIndex = optionBottom.selectedIndex;
        let bottomUnitIndex = optionTop.selectedIndex;

        convertInternal(topUnitIndex, value, bottomUnitIndex, inputTop);
    }
}