// variables
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const pass1 = document.querySelector("#password1");
const pass2 = document.querySelector("#password2");

const terms = document.querySelector("#remember");

const submitBtn = document.querySelector("#registerBtn");
// Reset previus errors
fname.style.border = "1px solid #ecedf1";
lname.style.border = "1px solid #ecedf1";
email.style.border = "1px solid #ecedf1";
pass1.style.border = "1px solid #ecedf1";
pass2.style.border = "1px solid #ecedf1";
terms.parentElement.style.color = "#393b3b";
const errors = [];

submitBtn.addEventListener("click", async () => {
  const isFirstNameValid = fname.value !== "" && fname.value.length > 2;
  const isLastNameValid = lname.value !== "" && lname.value.length > 2;
  const isEmailValid = emailRegExp.test(email.value);
  const isPassword1Valid = pass1.value.length >= 8;
  const isPassword2Valid = pass2.value.length >= 8;

  if (!isFirstNameValid) {
    fname.style.border = "1px solid red";
    errors.push("First name is required.");
  }
  if (!isLastNameValid) {
    lname.style.border = "1px solid red";
    errors.push("Last name is required.");
  }
  if (!isEmailValid) {
    email.style.border = "1px solid red";
    errors.push("Email addres is required.");
  }
  if (!isPassword1Valid || !isPassword2Valid || pass1.value !== pass2.value) {
    pass1.style.border = "1px solid red";
    pass2.style.border = "1px solid red";
    errors.push("Passwords do not match.");
  }
  if (!terms.checked) {
    terms.parentElement.style.color = "red";
    errors.push("You must agree to the terms and conditions.");
  }

  const formData = {
    first_name: fname.value,
    last_name: lname.value,
    email: email.value,
    password: pass1.value,
  };
  console.log(formData);

  const formOk = `<p>Accound created. You can now log in.</p>`;
  const formError = `
  <p>Errors</p>
  <ul>
    ${errors.map((er) => `<li>${er}</li>`).join("")}  
  </ul>
  `;

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPassword1Valid &&
    isPassword2Valid &&
    terms.checked
  ) {
    fetch(baseURL + ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 201) {
          showToast(formOk, false);
        }
        if (res.status === 400) {
          showToast("<p>Email is taken</p>", true);
        }
      })
      .catch((err) => showToast(formError, true));
  } else {
    showToast(formError, true);
  }
});
