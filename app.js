import {
  workFunction,
  transferToBank,
  loanFunction,
  paybackLoanFunction,
  buyPc,
} from "/work.js";
document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  let currentDropDown;
  if (isDropdownButton) {
    currentDropDown = e.target.closest("[data-dropdown]");
    currentDropDown.classList.toggle("active");
    featuresDiv.innerText = "";
    dropdownPTag.innerText = "choose a laptop: ▼";
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropDown) return;
    dropdown.classList.remove("active");
  });
});

const dropdownElements = document.getElementById("optionsDiv");
const dropdownPTag = document.getElementById("dropDownButton");
const dropDownHider = document.getElementById("dropDown");
const secondArrow = document.getElementsByClassName("secondArrow");
const featuresDiv = document.getElementById("featuresDiv");
const laptopInfoPTag = document.getElementById("laptopInfoPTag");
const laptopTitleHeader = document.getElementById("laptopTitleHeader");
const pricePTag = document.getElementById("pricePTag");
const featuresWritten = document.getElementById("featuresWritten");
const imgContainer = document.getElementById("imgContainer");
const imageUrl = "https://noroff-komputer-store-api.herokuapp.com/computers";
const komputerUrl = "https://noroff-komputer-store-api.herokuapp.com/computers";
fetch(komputerUrl)
  .then((Response) => Response.json())
  .then((ResponseJeson) => {
    for (let i = 0; i < ResponseJeson.length; i++) {
      const komputerType = document.createElement("p");
      komputerType.setAttribute("id", [i]);
      komputerType.innerText = ResponseJeson[i].title;
      dropdownElements.appendChild(komputerType);
      let clickedKomputerType = document.getElementById([i]);
      const laptopSelectionDiv = document.getElementById("laptopSelectionDiv");
      clickedKomputerType.addEventListener("click", (e) => {
        laptopSelectionDiv.classList.remove("hidden");
        for (let j = 0; j < ResponseJeson.length; j++) {
          if (ResponseJeson[j].title === clickedKomputerType.innerText) {
            dropdownPTag.innerText = clickedKomputerType.innerText + "▼";

            dropDownHider.classList.remove("active");
          }
          const typeFactsPtag = document.createElement("p");
          ResponseJeson[i].specs.forEach(function (index) {
            typeFactsPtag.innerText = "-" + ResponseJeson[i].specs[j];
            featuresDiv.appendChild(typeFactsPtag);
            dropDownHider.appendChild(featuresDiv);
            laptopTitleHeader.innerText = ResponseJeson[i].title;
            laptopInfoPTag.innerText = ResponseJeson[i].description;
            pricePTag.innerText = ResponseJeson[i].price + "NOK";
          });
        }
      });
    }
  });
fetch(imageUrl)
  .then((response) => response.json())
  .then((imageBlob) => {
    dropdownElements.addEventListener("click", (e) => {
      console.log(laptopTitleHeader.innerText);
      for (let i = 0; i < imageBlob.length; i++) {
        if (imageBlob[i].title == laptopTitleHeader.innerText) {
          imgContainer.src = `/${imageBlob[i].image}`;
          imgContainer.classList.add("visible");
        }
      }
    });
  });
window.onload = function () {
  const clickedKomputerType = document.getElementById("komputerType");
  console.log(clickedKomputerType);
};

workFunction();
transferToBank();
loanFunction();
paybackLoanFunction();
