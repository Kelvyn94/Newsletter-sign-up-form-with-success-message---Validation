/* ============================================
   DOM REFERENCES
   ============================================ */
const signupCard = document.getElementById("signupCard");
const successCard = document.getElementById("successCard");
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("errorMessage");
const submittedEmailSpan = document.getElementById("submittedEmail");
const dismissBtn = document.getElementById("dismissBtn");

/* ============================================
   VALIDATION FUNCTIONS
   ============================================ */

/**
 * Validates email format using regex
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Shows error state on the email input
 * @param {string} message - The error message to display
 */
function showError(message) {
  emailInput.classList.add("error");
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
  emailInput.setAttribute("aria-invalid", "true");
}

/**
 * Hides error state on the email input
 */
function hideError() {
  emailInput.classList.remove("error");
  errorMessage.classList.remove("show");
  emailInput.removeAttribute("aria-invalid");
}

/* ============================================
   UI UPDATE FUNCTIONS
   ============================================ */

/**
 * Shows the success message with the submitted email
 * @param {string} email - The email to display
 */
function showSuccessMessage(email) {
  submittedEmailSpan.textContent = email;
  signupCard.classList.add("hidden");
  successCard.classList.remove("hidden");

  // Focus management for accessibility
  const successHeading = successCard.querySelector("h2");
  if (successHeading) {
    successHeading.focus();
  }
}

/**
 * Resets the UI back to the signup form
 */
function resetToSignup() {
  successCard.classList.add("hidden");
  signupCard.classList.remove("hidden");
  emailInput.value = "";
  hideError();

  // Return focus to email input
  emailInput.focus();
}

/* ============================================
   EVENT HANDLERS
   ============================================ */

/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  // Validation: Empty field
  if (email === "") {
    showError("Email address is required");
    return;
  }

  // Validation: Invalid format
  if (!isValidEmail(email)) {
    showError("Valid email required");
    return;
  }

  // All validations passed
  hideError();
  showSuccessMessage(email);
}

/**
 * Handles real-time validation on input
 */
function handleEmailInput() {
  // Only validate if there's an error state to clear
  if (emailInput.classList.contains("error")) {
    const email = emailInput.value.trim();
    if (email !== "" && isValidEmail(email)) {
      hideError();
    }
  }
}

/**
 * Handles dismiss button click
 */
function handleDismiss() {
  resetToSignup();
}

/**
 * Handles keyboard interaction for dismiss button
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleDismissKeyPress(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleDismiss();
  }
}

/**
 * Handles Escape key to dismiss success message
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleEscapeKey(event) {
  if (event.key === "Escape" && !successCard.classList.contains("hidden")) {
    handleDismiss();
  }
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
newsletterForm.addEventListener("submit", handleFormSubmit);
emailInput.addEventListener("input", handleEmailInput);
dismissBtn.addEventListener("click", handleDismiss);
dismissBtn.addEventListener("keydown", handleDismissKeyPress);
document.addEventListener("keydown", handleEscapeKey);

/* ============================================
   INITIALIZATION
   ============================================ */
window.addEventListener("load", () => {
  // Set focus to email input on page load
  emailInput.focus();
});
