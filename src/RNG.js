/*---------------------------------------------/
/         Random Number Generator             /
/--------------------------------------------*/

let minNumber;
let maxNumber;
let rangeOfNumbers;
let generatedNumber = 0;
let numberList = [];
let clearedFlag = true;
let numberInArray = false;

let numberRangeStart = document.getElementById('numberRangeStart');
let numberRangeEnd = document.getElementById('numberRangeEnd');
let numbersGenerated = document.getElementById('generatedNumberBox');
let numberMessage = document.getElementById('message');
let generateButton = document.getElementById('generateButton');
let resetButton = document.getElementById('resetButton');
let clearButton = document.getElementById('clearButton');
let sortCheckbox = document.getElementById('sortCheckbox');

function generateNumber() {

    minNumber = parseInt(numberRangeStart.value);
    maxNumber = parseInt(numberRangeEnd.value);
    rangeOfNumbers = (maxNumber - minNumber) + 1;

	if (minNumber >= maxNumber) {
		message.innerHTML =
			'Please make the minimum number smaller than the maximum number.';
	} else {
		if (Array.isArray(numberList) && !numberList.length) {
            generatedNumber = newRandomNumber(minNumber, maxNumber);
            numberRangeStart.disabled = true;
            numberRangeEnd.disabled = true;
            sortCheckbox.disabled = true;
			numberList.push(generatedNumber);
			numberMessage.innerHTML =
				'The first number is ' + generatedNumber + '!';
			numbersGenerated.value = generatedNumber;
		} else {
			do {
				generatedNumber = newRandomNumber(minNumber, maxNumber);
			} while (numberList.includes(generatedNumber) && numberList.length < rangeOfNumbers);
			numberList.push(generatedNumber);
			if (sortCheckbox.checked) {
				numberList.sort(function(a, b) {
					return a - b;
				});
			}
			numberMessage.innerHTML =
				'The next number is ' + generatedNumber + '!';
			numbersGenerated.value = numberList.join(', ');
		}

		if (numberList.length == rangeOfNumbers) {
            generateButton.disabled = true;
			numberMessage.innerHTML +=
				'</p><p>All ' +
				rangeOfNumbers +
				' numbers have been pulled!</p>' +
				'<p>Press the Reset button to start again.</p>';
		}
	}
}

function newRandomNumber(min, max) {
	return parseInt(
		Math.floor(Math.random() * (max - min + 1) + min)
	);
}

function resetGenerator() {
    reset();
}

function clearSelections() {
    reset();
    numberRangeStart.value = 1;
	numberRangeEnd.value = 10;
}

function reset() {
    numberRangeStart.disabled = false;
	numberRangeEnd.disabled = false;
	generateButton.disabled = false;
    sortCheckbox.disabled = false;
    numbersGenerated.value = '';
    numberMessage.innerHTML = '';
    numberList = [];
	clearedFlag = true;
	numberInArray = false;
}

function helpText() {
	document.getElementById('helpText').setAttribute('style', 'display: block');
}

function closeHelp() {
	return document
		.getElementById('helpText')
		.setAttribute('style', 'display: none');
}

generateButton.onclick = generateNumber;
resetButton.onclick = resetGenerator;
clearButton.onclick = clearSelections;
document.getElementById('helpButton').onclick = helpText;
document.getElementById('closeHelp').onclick = closeHelp;
