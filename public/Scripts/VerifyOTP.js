//Global Data

const userData = {
  email: localStorage.getItem("userEmail"),
  otp: 0,
};

/* Backend-Frontend Connectivity Logics */

const verifyOTPFormSubmission = () => {
  const OTPForm = document.getElementById("otp_form");

  OTPForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const OTP = parseInt(document.getElementById("otp").value);
    userData.otp = OTP;
    verifyOTPMethod(userData);
  });
};

const verifyOTPMethod = async (dataVariables) => {
  try {
    const query = `
    mutation VerifyUser($email : String! , $otp : Int!){
     verifyUser(email : $email , otp : $otp)
  }
`;

    console.log(dataVariables)
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables : dataVariables,
      }),
    });

    const { data, errors } = await response.json();

    if (data && data.verifyUser) {
      localStorage.removeItem("userEmail");
      alert("Verify Successfully");
      document.location.href = "Login.html";
    } else {
      const message = errors[0]?.message || "OTP Verification Failed";
      alert(message);
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", verifyOTPFormSubmission);

/* Frontend Events and other Logics */
const maskEmail = (email) => {
  const [username, domain] = email.split("@");
  const maskLen = username.length / 2;

  let maskedUsername =
    username.slice(0, maskLen) + "*".repeat(username.length - maskLen);

  return `${maskedUsername}@${domain}`;
};

const otpDesc = document.getElementById("otp_desc");
otpDesc.innerText = `Please enter the 6-digit OTP we sent on email - ${maskEmail(
  userData?.email
)}`;
