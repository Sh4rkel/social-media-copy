const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");

const remember = document.querySelector("#remember");

loginBtn.addEventListener("click", async () => {
  const isEmailValid = emailRegExp.test(email.value);
  const isEmailFilled = email.value !== "";
  const isPasswordFilled = password.value !== "";
  const isPasswordValid = password.value.length > 7;
  email.style.border = "1px solid #ecedf1";
  password.style.border = "1px solid #ecedf1";

  const errors = [];

  if (!isEmailFilled) {
    errors.push("Email address is required.");
    email.style.border = "1px solid red";
  }

  if (!isPasswordFilled) {
    errors.push("Password is required.");
    password.style.border = "1px solid red";
  }

  if (!isEmailValid) {
    errors.push("Invalid email address.");
    email.style.border = "1px solid red";
  }

  if (!isPasswordValid) {
    errors.push("Password must be at least 8 characters.");
    password.style.border = "1px solid red";
  }

  if (
    !isEmailFilled ||
    !isPasswordFilled ||
    !isEmailValid ||
    !isPasswordValid
  ) {
    const message = `
        <p>Check your form</p>
        <ul>
        ${errors.map((er) => `<li>${er}</li>`)}
        </ul>
      `;
    showToast(message, true);
    return;
  }

  const request = await fetch(baseURL + ENDPOINTS.LOGIN, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  const response = await request.json();

  if (request.status !== 200) {
    return showToast(`<p>${response.message}</p>`, true);
  }

  const tokenEpiration = currentTime + 3600;
  const expires = remember.checked ? 2000000000 : tokenEpiration;

  localStorage.setItem("token", response.token);
  localStorage.setItem("expires", expires);
  window.location.href = "newsfeed.html";
});
