function validateForm() {
  const form = document.getElementById("feedback_form");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const successMessage = document.getElementById("success-message");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();

    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("input-error");
    } else {
      emailError.textContent = "";
      emailInput.classList.remove("input-error");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("input-error");
      return;
    }

    emailError.textContent = "";
    emailInput.classList.remove("input-error");

    successMessage.textContent = "Message sent successfully!";
    successMessage.classList.add("visible");

    setTimeout(() => {
      successMessage.classList.remove("visible");
    }, 5000);

    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  validateForm();
});
