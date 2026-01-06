// Financial data storage
const financialData = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  monthKeys: [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  income: new Array(12).fill(0),
  expenses: new Array(12).fill(0),
};

// Chart instance
let financeChart = null;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  initializeChart();
  updateTotals();
});

// Set up event listeners for all inputs
function initializeEventListeners() {
  const incomeInputs = document.querySelectorAll(".income-input");
  const expenseInputs = document.querySelectorAll(".expense-input");

  incomeInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      validateInput(this);
      updateDataFromInput(index, "income", this.value);
    });

    input.addEventListener("blur", function () {
      if (this.value === "" || parseFloat(this.value) < 0) {
        this.value = "0";
        updateDataFromInput(index, "income", "0");
      }
    });
  });

  expenseInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      validateInput(this);
      updateDataFromInput(index, "expenses", this.value);
    });

    input.addEventListener("blur", function () {
      if (this.value === "" || parseFloat(this.value) < 0) {
        this.value = "0";
        updateDataFromInput(index, "expenses", "0");
      }
    });
  });
}

// Validate input field
function validateInput(input) {
  const value = parseFloat(input.value);

  if (input.value === "" || isNaN(value) || value < 0) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

// Update financial data from input
function updateDataFromInput(index, type, value) {
  const numValue = parseFloat(value) || 0;

  if (type === "income") {
    financialData.income[index] = numValue;
  } else {
    financialData.expenses[index] = numValue;
  }

  updateTotals();
  updateChart();
}

// Calculate and update totals
function updateTotals() {
  const totalIncome = financialData.income.reduce((sum, val) => sum + val, 0);
  const totalExpenses = financialData.expenses.reduce(
    (sum, val) => sum + val,
    0
  );
  const netAmount = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expenses").textContent =
    totalExpenses.toFixed(2);

  const netElement = document.getElementById("net-amount");
  netElement.textContent = netAmount.toFixed(2);

  // Update net amount color based on positive/negative
  if (netAmount >= 0) {
    netElement.style.color = "#198754"; // Bootstrap success color
  } else {
    netElement.style.color = "#dc3545"; // Bootstrap danger color
  }
}

// Initialize the chart
function initializeChart() {
  const ctx = document.getElementById("financeChart").getContext("2d");

  financeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: financialData.months,
      datasets: [
        {
          label: "Income",
          data: financialData.income,
          backgroundColor: "rgba(40, 167, 69, 0.8)", // Green
          borderColor: "rgba(40, 167, 69, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: financialData.expenses,
          backgroundColor: "rgba(220, 53, 69, 0.8)", // Red
          borderColor: "rgba(220, 53, 69, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label +=
                "$" +
                context.parsed.y.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              return label;
            },
          },
        },
      },
    },
  });
}

// Update the chart with new data
function updateChart() {
  if (financeChart) {
    financeChart.data.datasets[0].data = financialData.income;
    financeChart.data.datasets[1].data = financialData.expenses;
    financeChart.update();
  }
}
