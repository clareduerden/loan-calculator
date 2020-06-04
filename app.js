// get input elements from UI
const amount = document.getElementById("amount");
const interest = document.getElementById("interest");
const years = document.getElementById("years");

// get output elements from UI
const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");
const totalInterest = document.getElementById("total-interest");

// Get results and loading elements from IU
const results = document.getElementById("results");
const loading = document.getElementById("loading");

// Get submit and reset buttons from UI
const submitBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#reset");

// Load event listener for a click on the reset btn
resetBtn.addEventListener("click", clearForm);

// Load event listener for Submit button click
submitBtn.addEventListener("click", function (e) {
  // Check if any of the field are empty before calculating 
  if (amount.value === '' || interest.value === '' || years.value === '') {
    showError("Please ensure you have input all 3 values");
  }
  else {
    // Display the loading GIF and calculate after 2 seconds
    loading.style.display = "block";
    setTimeout(calculateLoan, 2000);
  }
  // Precent default behaviour of submit input type
  e.preventDefault();
});

// FUNCTIONS ARE BELOW

function calculateLoan() {
  // turn figures into decimnal to give the loan principal etc
  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  // Check the amounts on the console
  console.log(principal);
  console.log(calcInterest);
  console.log(calcPayments);

  // Compute the monthly payments
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principal * x * calcInterest) / (x - 1);

  // check if monthly payment is finite before outputting the results
  if (isFinite(monthly)) {
    results.style.display = "block";
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = ((monthly * calcPayments) - principal).toFixed(2);
  }
  else {
    showError("There is an error. Please check your numbers");
  }
  // Hide the loading GIF
  loading.style.display = "none";
}


function showError(error) {
  // Create div and add classes
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";

  // create error message add to div
  const errorText = document.createTextNode(error);
  errorDiv.appendChild(errorText);

  // Show error at bottom of loan-form
  const loanForm = document.getElementById("loan-form");
  loanForm.appendChild(errorDiv);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}


function clearError() {
  document.querySelector(".alert").remove();
}


function clearForm(e) {
  // Hide any showing results or loading gifs
  results.style.display = "none";
  loading.style.display = "none";

  // reset all the input amounts to nothing
  amount.value = '';
  interest.value = '';
  years.value = '';

  e.preventDefault();
}