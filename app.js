// Listen for click event on submit btn
const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", calculateLoan);



function calculateLoan(e) {

  // get input elements on UI
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  // get output elements on UI
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // turn the amount into a decimnal to give the loan principal
  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  console.log(principal);
  console.log(calcInterest);
  console.log(calcPayments);

  // Compute the monthly payments
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principal * x * calcInterest) / (x - 1);

  // check if monthly payment is finite before outputting the results
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = ((monthly * calcPayments) - principal).toFixed(2);
  }
  else {
    showError("Please check your numbers");
  }

  e.preventDefault();
}

// Show error
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

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}