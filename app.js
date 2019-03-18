/*
	author edoroskevic
	date 20/06/2018
	description a basic 'loan calculator' app using skeletoncss and plain javascript. this example
				 aims to demonstrate basic DOM manipulation, function creation and event handling.
	license MIT
*/

document.getElementById('loan-form').addEventListener('submit', event => {
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 2000);

	event.preventDefault();	
});

function calculateResults(){
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');

	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal  * x * calculatedInterest)/(x-1);
	
	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

		document.getElementById('results').style.display = 'block';
		document.getElementById('loading').style.display = 'none';
	}
	else{
		showError('Please check your input values');
		document.getElementById('loading').style.display = 'none';
	}
}

function showError(error){
	const errorDiv = document.createElement('div');
	
	errorDiv.className = 'alert alert-danger';
	
	const card = document.querySelector('.card');	
	const heading = document.querySelector('.heading');
	const text = document.createTextNode(error);

	errorDiv.appendChild(text);
	
	card.insertBefore(errorDiv, heading);

	setTimeout(clearError, 3000);
}

/
function clearError(){
	document.querySelector('.alert').remove();
}
