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
  initializeTheme();
  initializeDownloadButton();
});

// Theme management
function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    updateThemeIcon(themeIcon, true);
  }

  // Theme toggle event listener
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");

    // Save theme preference
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update icon
    updateThemeIcon(themeIcon, isDark);

    // Update chart colors for theme
    updateChartTheme(isDark);
  });
}

function updateThemeIcon(icon, isDark) {
  if (isDark) {
    // Sun icon for light mode option
    icon.innerHTML =
      '<circle cx="8" cy="8" r="5"/><path d="M8 0v2M8 14v2M2.343 2.343l1.414 1.414M12.243 12.243l1.414 1.414M0 8h2M14 8h2M2.343 13.657l1.414-1.414M12.243 3.757l1.414-1.414"/>';
    icon.setAttribute("class", "bi bi-sun-fill");
  } else {
    // Moon icon for dark mode option
    icon.innerHTML =
      '<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>';
    icon.setAttribute("class", "bi bi-moon-stars-fill");
  }
}

function updateChartTheme(isDark) {
  if (financeChart) {
    const gridColor = isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const textColor = isDark ? "#f8f9fa" : "#666";

    financeChart.options.scales.y.grid.color = gridColor;
    financeChart.options.scales.x.grid.color = gridColor;
    financeChart.options.scales.y.ticks.color = textColor;
    financeChart.options.scales.x.ticks.color = textColor;
    financeChart.options.plugins.legend.labels.color = textColor;

    financeChart.update();
  }
}

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

// Initialize download button
function initializeDownloadButton() {
  const downloadBtn = document.getElementById("downloadChart");

  downloadBtn.addEventListener("click", function () {
    downloadChartAsPNG();
  });
}

// Download chart as PNG
function downloadChartAsPNG() {
  if (financeChart) {
    // Get the canvas element
    const canvas = document.getElementById("financeChart");

    // Convert canvas to PNG data URL
    const url = canvas.toDataURL("image/png");

    // Create a temporary link element
    const link = document.createElement("a");
    link.download = "bucks2bar-chart.png";
    link.href = url;

    // Trigger download
    link.click();
  }
}
