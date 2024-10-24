const registerFormSubmission = () => {
  const registerForm = document.getElementById("register_form");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const credentials = document.getElementById("credentials").value;
    const password = document.getElementById("password").value;

    createUserMethod({
      name,
      credentials,
      password,
    });
  });
};

const createUserMethod = async (userData) => {
  try {
    const query = `
        mutation CreateNewUser($name : String! , $email : String! , $password : String!){
          createNewUser(name : $name ,email : $email , password : $password)
        }
      `;

    const variables = {
      name: userData.name,
      email: userData.credentials,
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

    if (data && data.createNewUser) {
      localStorage.setItem("userEmail" , data.createNewUser);
      alert("Register Successfully");
      document.location.href = "VerifyOtp.html"
    } else {
      const message = errors[0]?.message || "Failed to Login User";
      alert(message);
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", registerFormSubmission);
