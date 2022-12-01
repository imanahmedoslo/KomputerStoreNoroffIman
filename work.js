const workButton = document.getElementById("clickToWorkButton");
let payBalance = document.getElementById("payBalance");
const transferToBankButoon = document.getElementById("transferToBankButoon");
const payBackLoanButton = document.getElementById("payBackLoanButton");
let bankBalance = document.getElementById("bankBalance");
const getALoanButton = document.getElementById("getALoanButton");
const remainingDebtDiv = document.getElementById("remainingDebt");
const debtDiv = document.getElementById("debtDiv");
const laptopSelectionDiv = document.getElementById("laptopSelectionDiv");
const boughtPcs = document.getElementById("boughtPcs");
const laptopTitleHeader = document.getElementById("laptopTitleHeader");
const laptopPricetag = document.getElementById("pricePTag");
const buyPcButton = document.getElementById("buyBotton");

var counter = 0;
var ownedMoney = 0;
var debtAmount = 0;
console.log(typeof debtAmount);
console.log(typeof ownedMoney);
let tenPercent = 0;
let isInDebt = false;
let wage = payBalance.innerText;
function workFunction() {
  workButton.addEventListener("click", (e) => {
    counter = counter + 100;
    payBalance.innerText = counter;
  });
}

function transferToBank() {
  transferToBankButoon.addEventListener("click", (e) => {
    console.log(typeof counter);
    console.log(ownedMoney);
    if (isInDebt == false) {
      ownedMoney = ownedMoney + counter;
      counter = 0;
      payBalance.innerText = counter;
      console.log(typeof ownedMoney);
      console.log(typeof counter);
      bankBalance.innerText = ownedMoney;
      return;
    } else if (isInDebt == true) {
      tenPercent = counter * 0.1;
      if (debtAmount <= tenPercent) {
        debtAmount = 0;
        tenPercent = tenPercent - debtAmount;
        ownedMoney = ownedMoney + (counter - tenPercent);
        bankBalance.innerText = ownedMoney;
        remainingDebtDiv.innerText = debtAmount;
        counter = 0;
        payBalance.innerText = counter;
        isInDebt = false;
        debtDiv.classList.remove("show");
        payBackLoanButton.classList.remove("show");
        return;
      } else {
        debtAmount = debtAmount - tenPercent;
        ownedMoney = ownedMoney + (counter - tenPercent);
        bankBalance.innerText = ownedMoney;
        remainingDebtDiv.innerText = debtAmount;
        counter = 0;
        payBalance.innerText = counter;
        return;
      }
      return;
    }
  });
}

let writtenAmount = 0;
let loansCounter = 0;
let pcBought = false;

function loanFunction() {
  getALoanButton.addEventListener("click", (e) => {
    counter = parseInt(payBalance.innerText);
    debtAmount = parseInt(remainingDebtDiv.innerText);
    ownedMoney = parseInt(bankBalance.innerText);
    console.log(debtAmount);
    if (isInDebt == true) {
      console.log(debtAmount);
      let pleasePayBack = alert("please pay back first!");
      return;
    } else if (loansCounter == !0 && pcBought == false && debtAmount === 0) {
      let buyPcFirst = alert("please buy pc first!");
      return;
    } else if ((loansCounter == !0 && pcBought == true) || loansCounter == 0) {
      let writtenAmount = parseInt(
        prompt(
          "please enter desired loan amount. it can not be higher than twice your bankbalance.",
          "write here:"
        )
      );
      if (writtenAmount > ownedMoney * 2) {
        let notEnoughMoney = alert("thats more than double your bankbalance.");
        return;
      } else if (writtenAmount <= ownedMoney * 2) {
        debtDiv.classList.add("show");
        payBackLoanButton.classList.add("show");
        ownedMoney = ownedMoney + writtenAmount;
        bankBalance.innerText = ownedMoney;
        debtAmount = debtAmount + writtenAmount;
        remainingDebtDiv.innerText = debtAmount;
        loansCounter = 1;
        isInDebt = true;
        pcBought = false;
        return;
      }
      return;
    }
  });
}
function paybackLoanFunction() {
  payBackLoanButton.addEventListener("click", (e) => {
    if (debtAmount > counter) {
      remainingDebtDiv.innerText = debtAmount - counter;
      counter = 0;
      payBalance.innerText = counter;
      return;
    } else if (debtAmount <= counter) {
      console.log("I was triggered1");
      ownedMoney = ownedMoney + (counter - debtAmount);
      debtAmount = 0;
      remainingDebtDiv.innerText = debtAmount;
      bankBalance.innerText = ownedMoney;
      counter = 0;
      payBalance.innerText = counter;
      isInDebt = false;
      debtDiv.classList.remove("show");
      payBackLoanButton.classList.remove("show");
      return;
    }
  });
}
let a = 0;
const purchasedPcArray = [{}];
const buyPc = buyPcButton.addEventListener("click", (e) => {
  let pcPrice = parseInt(
    laptopPricetag.innerText.slice(0, laptopPricetag.innerText.length - 3)
  );
  if (pcPrice > ownedMoney) {
    alert(
      `you dont have enough money, you neew to earn ${
        pcPrice - ownedMoney
      } more to buy this pc`
    );
  } else {
    for (let i = 0; i < purchasedPcArray.length; i++) {
      if (
        purchasedPcArray.includes(`${laptopTitleHeader.innerText}`) == false ||
        purchasedPcArray[i].title == !laptopTitleHeader.innerText
      ) {
        purchasedPcArray.push(`${laptopTitleHeader.innerText}`);
        purchasedPcArray.push({
          title: `${laptopTitleHeader.innerText}`,
          boughtAmount: 1,
        });
        console.log(purchasedPcArray);
        const newPurchase = document.createElement("p");
        newPurchase.setAttribute("id", laptopTitleHeader.innerText);
        newPurchase.innerText = `you have purchased a ${laptopTitleHeader.innerText}`;
        boughtPcs.appendChild(newPurchase);
        ownedMoney = ownedMoney - pcPrice;
        bankBalance.innerText = ownedMoney;
        pcBought = true;
        a = a + 1;
        return;
      } else {
        if (laptopTitleHeader.innerText == purchasedPcArray[i].title) {
          let repeatedpurchase = document.getElementById(
            `${laptopTitleHeader.innerText}`
          );
          purchasedPcArray[i].boughtAmount =
            purchasedPcArray[i].boughtAmount + 1;
          repeatedpurchase.innerText = `you have purchased ${purchasedPcArray[i].boughtAmount} pieces of ${laptopTitleHeader.innerText}`;
          console.log(repeatedpurchase);
          boughtPcs.appendChild(repeatedpurchase);
          ownedMoney = ownedMoney - pcPrice;
          bankBalance.innerText = ownedMoney;
          pcBought = true;

          return;
        }
      }
    }
  }
});

export {
  workFunction,
  transferToBank,
  loanFunction,
  paybackLoanFunction,
  buyPc,
};
