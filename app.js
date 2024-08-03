const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const reverse = document.querySelector("i");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }
  console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  console.log(data);
  convertTo = toCurr.value.toLowerCase();
  convertFrom = fromCurr.value.toLowerCase();
  let rate = data[convertFrom][convertTo];
  console.log(rate);
  let finalAmount = rate * amtVal;
  console.log(finalAmount);
  // const URL2 = `${BASE_URL}/${toCurr.value.toLowerCase()}.json`;
  // response = await fetch(URL2);
  // console.log(response);
  // let data2 = await response.json();
  // console.log(data2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  let src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = src;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

reverse.addEventListener("click", () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
});
