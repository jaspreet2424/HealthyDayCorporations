const toggleButton = document.getElementById("toggle_password_button");

toggleButton.addEventListener("click", () => {
  const passwordInput = document.getElementById("login_password_input");
  passwordInput.type = (passwordInput.type === 'password') ? "text" : "password";
});