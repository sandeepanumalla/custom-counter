const submitButton = document.querySelector("button");
const inputcontainer = document.querySelector("#input-container");
const countDownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

const countdownEl = document.querySelector("#countdown");
const countdownElTitle = document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.querySelector("#complete");
const completeElInfo = document.querySelector("#complete-info");
const completeBtn = document.getElementById("complete-button");

let coundownTitle = "";
let coundowmDate = "";
let counterTime = Date();

let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;
let countdownActive;
let savedCountdown = "";

const today = new Date().toISOString().split("T")[0];
console.log(today);
dateEl.setAttribute("min", today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = counterTime - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputcontainer.hidden = true;
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      console.log(countdownTitle, countdownDate);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = `${coundownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
    //Populate Countdown
  }, second);
}

countDownForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  counterTime = new Date(countdownDate).getTime();
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  if (countdownDate === "") {
    alert("Please select a date for the countdown");
  } else {
    updateDOM();
  }
});

function restorePrevious() {
  if (localStorage.getItem("countdown")) {
    inputcontainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    console.log(savedCountdown);
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    counterTime = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset() {
  countdownEl.hidden = true;
  inputcontainer.hidden = false;
  clearInterval(countdownActive);

  localStorage.removeItem("countdown");
  coundownTitle = ``;
  coundowmDate = ``;
  completeEl.hidden = true;
}
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePrevious();
