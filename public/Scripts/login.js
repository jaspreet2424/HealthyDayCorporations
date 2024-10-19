// const toggleButton = document.getElementById("toggle_password_button");
const loginForm = document.getElementById("submission_form");

// toggleButton.addEventListener("click", () => {
//   const passwordInput = document.getElementById("login_password_input");
//   passwordInput.type = passwordInput.type === "password" ? "text" : "password";
// });

const loginFormSubmission = () => {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const credential = document.getElementById("user_credential").value;
    const password = document.getElementById("password").value;

    loginUserMethod({ credential, password });
  });
};

const loginUserMethod = async (userData) => {
  try {
    const query = `
      mutation LoginUser($email : String! , $password : String!){
        loginUser(email : $email , password : $password)
      }
    `;

    const variables = {
      email: userData.credential,
      password: userData.password,
    };

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const { data, errors } = await response.json();

    if (data) {
      document.cookie = `sessionToken = ${data?.loginUser}`;
      alert("Login Successfully");
    } else {
      const message = errors[0]?.message || "Failed to Login User";
      alert(message);
    }
  } catch (error) {
    console.log("Error occured", error.message);
  }
};

document.addEventListener("DOMContentLoaded", loginFormSubmission);
