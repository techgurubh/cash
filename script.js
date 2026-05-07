const startBtn =
document.getElementById("startBtn");

const welcomeScreen =
document.getElementById("welcomeScreen");

const calculatorScreen =
document.getElementById("calculatorScreen");

startBtn.addEventListener("click", () => {

  welcomeScreen.classList.remove("active");

  calculatorScreen.classList.add("active");

});

/* DARK MODE */

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("change", () => {

  if(themeToggle.checked){

    document.body.classList.add("dark");
    document.body.classList.remove("light");

  }else{

    document.body.classList.add("light");
    document.body.classList.remove("dark");

  }

});

/* DATE */

function updateDate(){

  const now = new Date();

  const options = {

    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"

  };

  document.getElementById("dateDay")
  .innerText = now.toLocaleDateString(
    "en-IN",
    options
  );

}

updateDate();

/* NOTES */

const denominations =
[500,200,100,50,20,10];

const noteContainer =
document.getElementById("noteContainer");

denominations.forEach(note => {

  const row =
  document.createElement("div");

  row.className = "note-row";

  row.innerHTML = `

    <h3>₹${note}</h3>

    <input
  type="tel"
  inputmode="numeric"
  pattern="[0-9]*"
  placeholder="0"
  class="qty-input"
  data-note="${note}"
>

    <h3 id="total-${note}">
      ₹0
    </h3>

  `;

  noteContainer.appendChild(row);

});

/* ELEMENTS */

const totalNotesEl =
document.getElementById("totalNotes");

const grandTotalEl =
document.getElementById("grandTotal");

const amountWordsEl =
document.getElementById("amountWords");

const expectedAmountEl =
document.getElementById("expectedAmount");

const differenceAmountEl =
document.getElementById("differenceAmount");

/* CALCULATE */

document.addEventListener(
  "input",
  calculateTotal
);

function calculateTotal(){

  let grandTotal = 0;
  let totalNotes = 0;

  document.querySelectorAll(".qty-input")
  .forEach(input => {

    const note =
    Number(input.dataset.note);

    const qty =
Number(input.value || 0);

    const total = note * qty;

    document.getElementById(
      `total-${note}`
    ).innerText = `₹${total}`;

    grandTotal += total;

    totalNotes += qty;

  });

  totalNotesEl.innerText =
  totalNotes;

  grandTotalEl.innerText =
  grandTotal.toLocaleString();

  amountWordsEl.innerText =
  numberToWords(grandTotal) +
  " Rupees Only";

  checkDifference(grandTotal);

}

/* DIFFERENCE */

expectedAmountEl.addEventListener(
  "input",
  () => {

    const currentTotal =
    Number(
      grandTotalEl.innerText
      .replace(/,/g,"")
    );

    checkDifference(currentTotal);

  }
);

function checkDifference(total){

  const expected =
  Number(expectedAmountEl.value || 0);

  const difference =
  total - expected;

  differenceAmountEl.innerText =
  `₹${difference}`;

}

/* CLEAR */

document.getElementById("clearBtn")
.addEventListener("click", () => {

  document.querySelectorAll(".qty-input")
  .forEach(input => {

    input.value = "";

  });

  expectedAmountEl.value = "";

  calculateTotal();

});

/* NUMBER TO WORDS */

function numberToWords(num){

  if(num === 0) return "Zero";

  const a = [

    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'

  ];

  const b = [

    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'

  ];

  function inWords(n){

    if(n < 20)
      return a[n];

    if(n < 100)

      return b[Math.floor(n / 10)]
      + " " +
      a[n % 10];

    if(n < 1000)

      return a[Math.floor(n / 100)]
      + " Hundred " +
      inWords(n % 100);

    if(n < 100000)

      return inWords(
        Math.floor(n / 1000)
      ) + " Thousand " +
      inWords(n % 1000);

    if(n < 10000000)

      return inWords(
        Math.floor(n / 100000)
      ) + " Lakh " +
      inWords(n % 100000);

    return "";

  }

  return inWords(num);

}

calculateTotal();
