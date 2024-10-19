const navbarToggler = () => {
  const hamburger = document.querySelector(".hamburger_button");
  const closeBtn = document.querySelector(".nav_close_button");
  const navbar = document.querySelector(".lower_navbar");

  hamburger.addEventListener("click", () => {
    navbar.classList.add("mobile_nav_view");
  });

  closeBtn.addEventListener("click", () => {
    navbar.classList.remove("mobile_nav_view");
  });
};

const displayDate = () => {
  const date = new Date();
  const element = document.getElementById("nav_date_day");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  element.innerText = `${days[date.getDay()]} ${
    months[date.getMonth()]
  },${date.getDate()}/${date.getFullYear()}`;
};

document.addEventListener("DOMContentLoaded", navbarToggler);
document.addEventListener("DOMContentLoaded", displayDate);
