let addBtn = document.querySelector(".add-btn");
let transactionModal = document.querySelector(".modal");
let closeModal = document.querySelector(".close-modal");
let savetrans = document.querySelector(".saveTrans");
let tableCard = document.querySelector(".cardtable-card");
let modalContent = document.querySelector(".modal-content");
let transactionTable = document.querySelector("#transactionTableBody");
let transactionForm = document.querySelector("#transactionForm");
let ctx = document.getElementById("cashFlowChart");
let displayBalance = document.querySelector("#displayBalance")
let displayIncome = document.querySelector("#displayIncome")
let displayExpense = document.querySelector("#displayExpense")
let displayTransaction = document.querySelector("#displayCount")
let resetButton = document.querySelector("#resetDataBtn")
let themeButton = document.querySelector('#themeBtn')
let settingView = document.querySelector("#settings-view")
let setting = document.querySelector("#setting")
let dashboardView = document.querySelector("#dashboard-view")
let dashboard = document.querySelector('#dashboard')
let loginForm = document.querySelector("#loginForm");
let topbarName = document.querySelector("#topbarName");
let logoutBtn = document.querySelector("#logoutBtn");

let transaction = [];

let updateDashboard = () =>{
    let totalIncome = 0
    let totalExpense = 0

    transaction.forEach((transaction) =>{
        if(transaction.type == "income"){
            totalIncome += transaction.amount
        } else{
            totalExpense += transaction.amount
        }
    })

    let currentBalance = totalIncome-totalExpense

    displayBalance.textContent = `${currentBalance}`
    displayIncome.textContent = `${totalIncome}`
    displayExpense.textContent = `${totalExpense}`
    displayTransaction.textContent = transaction.length
}

let resetData = () =>{
    totalExpense = 0
    totalIncome = 0
     currentBalance = 0
    transaction.length = 0

     localStorage.removeItem("transactions");

    displayBalance.textContent = `${currentBalance}`
    displayIncome.textContent = `${totalIncome}`
    displayExpense.textContent = `${totalExpense}`
    displayTransaction.textContent = transaction.length

    cashFlowChart.data.datasets[0].data = [0, 0];
    cashFlowChart.update();
}

const cashFlowChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Cash Flow",
        data: [0, 0],
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function updateChart() {
  let totalIncome = 0;
  let totalExpense = 0;

  transaction.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  cashFlowChart.data.datasets[0].data = [totalIncome, totalExpense];

  cashFlowChart.update();
}

let deleteButton = (id) =>{
  transaction = transaction.filter(item => item.id !== id)

  localStorage.setItem("transactions", JSON.stringify(transaction));

  transactionTable.innerHTML = ""

    transaction.forEach(item => {
        bottomUi(item);
    });

     updateDashboard();

     updateChart();
}

let bottomUi = (item) => {
  transactionTable.innerHTML += `<tr data-id="${item.id}">
            <td>${item.date}</td>
            <td>${item.description}</td>
            <td>${item.category}</td>
            <td>₹${item.amount}</td>
            <td>
                <button>Edit</button>
                <button onClick = "deleteButton(${item.id})">Delete</button>
            </td>
        </tr>`;
};

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);

  let type = event.target[1].value;
  let description = event.target[2].value;
  let txAmount = event.target[3].value;
  let date = event.target[4].value;
  let category = event.target[5].value;

  

  transactionForm.reset();
  transactionModal.style.display = "none";

  let Charttransaction = {
    id:Date.now(),
    type,
    description,
    amount: Number(txAmount),
    date,
    category,
  };

  
  transaction.push(Charttransaction);
  localStorage.setItem("transactions", JSON.stringify(transaction));
  bottomUi(Charttransaction);
  updateChart();
  updateDashboard();
});

closeModal.addEventListener("click", () => {
  transactionModal.style.display = "none";
});

addBtn.addEventListener("click", () => {
  transactionModal.style.display = "flex";
});

resetButton.addEventListener("click", () =>{
    
    alert("Warning ! this will delete all you data")
    resetData()
    
})

function toggleTheme() {
  document.body.classList.toggle("dark-theme")
}

themeButton.addEventListener("click", () =>{
  toggleTheme()
})

function showView(viewId) {

    document.querySelectorAll(".view-section").forEach(view => {
        view.classList.remove("active");
    });

    document.getElementById(viewId).classList.add("active");
}

setting.addEventListener("click", () => {
    showView("settings-view");
});

dashboard.addEventListener("click", () => {
    showView("dashboard-view");
});

// loginForm.addEventListener("submit", (e)=>{

//     e.preventDefault();

//     const username = document.querySelector("#username").value;

//     localStorage.setItem("username", username);

//     localStorage.setItem("loggedIn", true);

//     window.location.href = "index.html";
// });

topbarName.textContent = localStorage.getItem("username");

logoutBtn.addEventListener("click", ()=>{

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");

    window.location.href = "login.html";

});

const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

if (savedTransactions) {

    transaction = savedTransactions;

    transaction.forEach(item => {
        bottomUi(item);
    });

    updateDashboard();
    updateChart();
}