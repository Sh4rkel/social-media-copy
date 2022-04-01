const toast = document.querySelector("#toast");

function showToast(htmlContent, isError) {
  toast.classList.remove("error");
  toast.innerHTML = "";

  toast.classList.add("open");
  toast.innerHTML = htmlContent;
  if (isError) {
    toast.classList.add("error");
  }
  setTimeout(() => {
    toast.classList.remove("open");
  }, 5000);
  setTimeout(() => {
    toast.classList.remove("error");
    toast.innerHTML = "";
  }, 5600);
}
