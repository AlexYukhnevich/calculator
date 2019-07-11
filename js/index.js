const calc = document.querySelector('.buttons');
const input = document.querySelector('.value');

class Calculator {
	constructor() {
		this.x = '';
		this.y = '';
		this.acc = '';
		this.operator = false;
		this.operatorValue = null;
		this.float = '.';
		this.assign = '=';
		this.assignBool = false;
		this.reset = 'ce';
		this.radical = 'sqrt';
		this.emptyValue = '';
	}

	sqrt() {
		if (+this.x === 0 || input.value === '0') {
			return this.ce(0);
		}
		else if (this.x < 0 && !this.y) {
			return this.ce('Invalid');
		} else {
			if (this.operatorValue && this.operatorValue !== this.radical) {
				this.acc = this[this.operatorValue]();
				this.x = this.acc;
				this.y = '';
				if (this.x < 0) {
					return this.ce('Invalid');
				}
			} 
			this.operatorValue = null;
			this.x = Math.sqrt(this.x);
			this.acc = this.x;
			const result = +(this.x).toFixed(10);
			return result;	
		}
	}

	ce(value) {
		this.x = '';
		this.y = '';
		this.acc = '';
		this.operator = false;
		this.assignBool = false;
		this.operatorValue = null;
		return value;
	} 

	'%'() {return +(+this.x % +this.y).toFixed(10)}

	'/'() {return +this.y === 0 ? this.ce('Invalid') : +this.x / +this.y}

	'*'() {return +(+this.x * +this.y).toFixed(10)}

	'+'() {return +(+this.x + +this.y).toFixed(10)}

	'-'() {return +(+this.x - +this.y).toFixed(10)}
}

const calculator = new Calculator();

calc.addEventListener('click', function(e) {
	let number = '';
	let value = e.target.getAttribute('data-value');
	const digit = e.target.classList.contains('num');
	const operator = e.target.classList.contains('operator');
	if (digit) {
		number = value;		
		if (input.value.length === 1 && input.value === "0" && value === "0") {
			input.value = input.value;
		} 
		else if (calculator.assignBool && calculator.x || calculator.operatorValue === calculator.radical) {
			calculator.x = number;
			input.value = number;
			calculator.y = "";
			calculator.assignBool = false;
		}
		else if (!calculator.operator) {
			calculator.x += number;
			input.value = calculator.x;
		} else if (calculator.operator) {
			calculator.y += number;
			input.value = calculator.y;
		}
	}
	else if (value === '-' && calculator.x === calculator.emptyValue) {
		calculator.x = '-';
		input.value = calculator.x;
	}
	else if (value === calculator.reset) {
		input.value = calculator.ce(0);
	}
	else if (value === calculator.radical) {
		input.value = calculator.sqrt();
		value = null;
	}
	else if (operator && !calculator.operator) {
		calculator.operator = true;
		calculator.operatorValue = value;
		calculator.assignBool = false;
		if (calculator.x.length > 0 && calculator.x.indexOf(calculator.float) === calculator.x.length - 1){
			calculator.x = calculator.x.slice(0, -1);
		} 
		if (calculator.y.length > 0 && calculator.y.indexOf(calculator.float) === calculator.y.length - 1 ) {
			calculator.y = calculator.y.slice(0, -1);
		}
	}
	else if (value === calculator.float) {
		calculator.x = calculator.x.toString();
		calculator.y = calculator.y.toString();
		if (calculator.x === calculator.emptyValue && input.value === '0') {
			calculator.x = input.value;
		}
		if (calculator.y === calculator.emptyValue && calculator.x === calculator.emptyValue && input.value === '0') {
			calculator.y = input.value;
		}
		if (calculator.assignBool) {
			calculator.x = '0' + calculator.float;
			input.value = calculator.x;
			calculator.assignBool = false;
		}
		else if (calculator.operatorValue && !calculator.y && calculator.x) {
			calculator.y = '0' + calculator.float;
			input.value = calculator.y;
		}
		else if (calculator.x !== calculator.emptyValue && !calculator.x.includes(calculator.float) && !calculator.y) {
			calculator.x += calculator.float;
			input.value = calculator.x;
			
		} 
		else if (calculator.y !== calculator.emptyValue && !calculator.y.includes(calculator.float)) {
			calculator.y += calculator.float;
			input.value = calculator.y;
		}			
	} 
	if (value === calculator.assign || operator) {
		if (calculator.x === calculator.emptyValue && calculator.y) {
			calculator.acc = calculator.y;
			calculator.x = calculator.acc;
			calculator.y = '';
		}
		else if (calculator.operatorValue && calculator.x && calculator.y) {			
			calculator.acc = calculator[calculator.operatorValue]();
			if (calculator.acc === 'Invalid') {
				input.value = calculator.acc;
				calculator.acc = '';
			} else {
				input.value = calculator.acc;
				calculator.x = input.value;
				calculator.y = '';
			}
		}
		if (operator) {
			calculator.operatorValue = value;
		} 
		else if (!operator) {
			calculator.operator = false;
			calculator.operatorValue = null;
			calculator.assignBool = true;
		}
	}	
	number = '';
});


