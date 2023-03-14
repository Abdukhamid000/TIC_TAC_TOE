const sideBtns = document.querySelectorAll("#side-btn");

sideBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
      e.target.classList.add("bg");

      
      btn.classList.remove("bg");
  })
);
