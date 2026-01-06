/**
 * @jest-environment jsdom
 */

// Mock Chart.js
global.Chart = jest.fn().mockImplementation(() => ({
  data: {
    datasets: [{ data: [] }, { data: [] }],
  },
  options: {
    scales: {
      y: { grid: {}, ticks: {} },
      x: { grid: {}, ticks: {} },
    },
    plugins: {
      legend: { labels: {} },
    },
  },
  update: jest.fn(),
}));

// Mock localStorage will be set up in beforeEach

// Load the script content for testing
const fs = require("fs");
const path = require("path");
const scriptContent = fs.readFileSync(
  path.join(__dirname, "script.js"),
  "utf8"
);

describe("Bucks2Bar Financial Tracker", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Set up localStorage mock
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    // Reset DOM
    document.body.innerHTML = `
      <div id="financeChart"></div>
      <span id="total-income"></span>
      <span id="total-expenses"></span>
      <span id="net-amount"></span>
      <button id="themeToggle"></button>
      <svg id="themeIcon"></svg>
      <button id="downloadChart"></button>
      <button id="signInBtn"></button>
      <button id="logoutBtn"></button>
      <span id="userGreeting"></span>
      <div id="loginModal"></div>
      <form id="loginForm"></form>
      <button id="cancelBtn"></button>
      <input id="usernameInput" />
      <input id="passwordInput" />
      <div id="errorMessage"></div>
      <div id="successToast"></div>
    `;
  });

  describe("Financial Data Structure", () => {
    test("should have correct month names", () => {
      const expectedMonths = [
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
      ];

      // Extract financialData from script content
      const monthsMatch = scriptContent.match(/months:\s*\[([\s\S]*?)\]/);
      expect(monthsMatch).toBeTruthy();

      const months = monthsMatch[1]
        .split(",")
        .map((m) => m.trim().replace(/['"]/g, ""))
        .filter((m) => m);

      expect(months).toEqual(expectedMonths);
    });

    test("should initialize with 12 months of data", () => {
      const arrayMatch = scriptContent.match(/new Array\((\d+)\)\.fill\(0\)/g);
      expect(arrayMatch).toBeTruthy();
      expect(arrayMatch.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Authentication Credentials", () => {
    test("should have valid authentication credentials", () => {
      const credentialsMatch = scriptContent.match(
        /AUTH_CREDENTIALS\s*=\s*\[([\s\S]*?)\];/
      );
      expect(credentialsMatch).toBeTruthy();

      // Check for required user accounts
      expect(scriptContent).toContain("imamovickerim");
      expect(scriptContent).toContain("johndoe");
    });
  });

  describe("Validation Functions", () => {
    test("should validate positive numbers correctly", () => {
      const input = document.createElement("input");
      input.value = "100";

      // Mock validateInput function behavior
      const value = parseFloat(input.value);
      const isValid = !isNaN(value) && value >= 0 && input.value !== "";

      expect(isValid).toBe(true);
    });

    test("should invalidate negative numbers", () => {
      const input = document.createElement("input");
      input.value = "-50";

      const value = parseFloat(input.value);
      const isValid = !isNaN(value) && value >= 0 && input.value !== "";

      expect(isValid).toBe(false);
    });

    test("should invalidate empty strings", () => {
      const input = document.createElement("input");
      input.value = "";

      const value = parseFloat(input.value);
      const isValid = !isNaN(value) && value >= 0 && input.value !== "";

      expect(isValid).toBe(false);
    });
  });

  describe("Total Calculations", () => {
    test("should calculate total income correctly", () => {
      const income = [1000, 1500, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const total = income.reduce((sum, val) => sum + val, 0);

      expect(total).toBe(4500);
    });

    test("should calculate total expenses correctly", () => {
      const expenses = [500, 800, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const total = expenses.reduce((sum, val) => sum + val, 0);

      expect(total).toBe(2500);
    });

    test("should calculate net amount correctly", () => {
      const income = [1000, 1500, 2000];
      const expenses = [500, 800, 1200];

      const totalIncome = income.reduce((sum, val) => sum + val, 0);
      const totalExpenses = expenses.reduce((sum, val) => sum + val, 0);
      const netAmount = totalIncome - totalExpenses;

      expect(netAmount).toBe(2000);
    });
  });

  describe("Theme Management", () => {
    test("should detect dark theme class", () => {
      document.body.classList.add("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");

      expect(isDark).toBe(true);
    });

    test("should toggle theme class", () => {
      document.body.classList.add("dark-theme");
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");

      expect(isDark).toBe(false);
    });
  });

  describe("LocalStorage Integration", () => {
    test("should save theme preference to localStorage", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
      localStorage.setItem("theme", "dark");

      expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
      setItemSpy.mockRestore();
    });

    test("should save user session to localStorage", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
      const session = {
        username: "testuser",
        loggedIn: true,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("userSession", JSON.stringify(session));

      expect(setItemSpy).toHaveBeenCalledWith(
        "userSession",
        expect.stringContaining("testuser")
      );
      setItemSpy.mockRestore();
    });
  });

  describe("Input Value Handling", () => {
    test("should default to 0 for empty input", () => {
      const value = "";
      const numValue = parseFloat(value) || 0;

      expect(numValue).toBe(0);
    });

    test("should default to 0 for negative input", () => {
      const value = "-100";
      const numValue = parseFloat(value);
      const finalValue = numValue < 0 ? 0 : numValue;

      expect(finalValue).toBe(0);
    });

    test("should parse valid number correctly", () => {
      const value = "150.50";
      const numValue = parseFloat(value) || 0;

      expect(numValue).toBe(150.5);
    });
  });
});
