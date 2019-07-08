window.onload = function(){
// CALCULATOR
let input = document.querySelector('input'),
    btns = document.querySelectorAll('button'),
    operations = ['sqrt','%','/','*','-','+'],
    float = '.', assign = '=', operator = false, secondNumber = '', total, acc = '';
	input.value = '';

let res = {
	'sqrt': function(a){
			let result = Math.sqrt(a).toString();
			return result.length > 13 ? result.slice(0,13) : result;
	},
	'%': function (a, b){return a % b},
	'/': function (a, b){return a / b},
	'*': function (a, b){return a * b},
	'-': function (a, b){return a - b},
	'+': function (a, b){return (a * 100 + b * 100) / 100},
};

for(let i = 0; i < btns.length; i++){

	btns[i].addEventListener('click', function() {
		if (this.value == 'CE') {
			if(acc.length > 4){
				acc = '';
				input.value = acc;
			} 
			else {
				acc = acc.slice(0,-1);
				input.value = acc;
			}
			operator = false, secondNumber = '';
		}
		else if (!operator && acc && this.value == assign){
			input.value = acc;
		}
		else if (operations.includes(this.value)){
			operator = this.value;
			if(operator && this.value == 'sqrt'){
				if (!acc) {
					input.value = acc;
					operator = false;
				}
				else if(+acc < 0){
					input.value = 'Invalid';
					acc = '';
				} else {
					total = res[operator](+acc);
					acc = total.toString();
					input.value = acc;
				}
			} 
			else if(operator !== '-' && !acc){
				input.value = acc;
				operator = false;
			}
			else if (operator == '-' && !acc) {
				acc = operator;
				input.value = acc;
				operator = false;
			}
		}
		else if (operator && this.value !== assign){
			if (this.value == float && secondNumber.includes(float)){
				secondNumber = secondNumber;
			}
			else if (this.value == float && !secondNumber){
				secondNumber = '';
			} 
	  		else {
				secondNumber += this.value;
				input.value = secondNumber;
			}
		}
		else if (this.value == assign){
			total = res[operator](+acc, +secondNumber);
			acc = total.toString();
			input.value = acc;
			secondNumber = '';
			operator = false;
		}
		else {
			if(this.value == float && acc.includes(float)){
				acc = acc;
		    }
		    else if(this.value == float && !acc){
		    	acc = '';
		    }
			else {
				acc += this.value;
				input.value += this.value;
			}			
		}
	});	
}

// CSS STYLES
let sidebar = document.querySelector('.sidebar');
let title = document.querySelector('.title');
let main = document.querySelector('main');

	title.addEventListener('click' , function(){
		this.classList.toggle('title-active');
		sidebar.classList.toggle('sidebar-active');
		main.classList.toggle('main-active');
	});
};