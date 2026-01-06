# GitHub Copilot Agent Instructions

## Project Overview

This is a **Udemy course repository** demonstrating GitHub Copilot capabilities through two educational projects:
- **ghcopilot/** - Basic HTML/JS examples for learning Copilot inline suggestions
- **bucks2bar/** - Full-featured income/expense tracker with Chart.js visualization

Original reference: [tomphill/newbucks2bar](https://github.com/tomphill/newbucks2bar)

## Architecture & Structure

### Project Layout
```
/ghcopilot/         # Lesson 1: Simple DOM manipulation basics
/bucks2bar/         # Lesson 2: Complete Bootstrap 5 + Chart.js app
documentation.txt   # Step-by-step course instructions
README.md          # Course overview and project links
```

### Technology Stack
- **bucks2bar**: Pure vanilla JS + Bootstrap 5.3.2 + Chart.js 4.4.1 (CDN-based)
- **Testing**: Jest 29.7.0 with jsdom environment for DOM testing
- **ghcopilot**: Vanilla HTML/JS only (no testing setup)
- Package manager: npm (for test dependencies only)
- No build step required for application code

## Key Patterns & Conventions

### Data Management (bucks2bar)
- Financial data stored in single `financialData` object with parallel arrays for months, income, expenses
- All state lives in memory - no persistence layer (educational demo)
- Chart instance stored globally as `financeChart` for theme updates

### Theme Implementation
- Dark theme toggled via `.dark-theme` class on `<body>`
- Theme preference persisted in `localStorage` with key `"theme"`
- Chart colors dynamically updated via `updateChartTheme()` when theme switches
- See [bucks2bar/styles.css](../bucks2bar/styles.css) for theme-specific selectors

### Form Input Handling
- Bootstrap validation classes (`.is-valid`, `.is-invalid`) applied on input
- Inputs default to `"0"` on blur if empty or negative
- Updates trigger: input validation → data update → totals recalculation → chart refresh

### Chart.js Integration
- Bar chart with income (green) and expenses (red) datasets
- Currency formatting via `Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})`
- Download functionality uses canvas `.toBlob()` + temporary anchor element

### Authentication System
- Login modal with username/password validation
- Credentials stored in `AUTH_CREDENTIALS` array (demo purposes only)
- User session persisted in `localStorage` with key `"userSession"`
- Default users: `imamovickerim` and `johndoe` (password: `123456`)
- Login state shows/hides sign-in button and user greeting
- Logout clears session and resets UI state

### Testing Infrastructure
- Jest configured with jsdom environment for DOM testing
- Test file: `script.test.js` with comprehensive test coverage
- Mocked dependencies: Chart.js, localStorage
- Test categories: data structure, authentication, validation, calculations, theme, localStorage
- Run with `npm test` or `npm run test:coverage`

## Development Workflow

### Running Projects
1. Open project folder in terminal: `cd bucks2bar` or `cd ghcopilot`
2. Launch with Live Server extension or open `index.html` directly in browser
3. **No build step required** - all dependencies loaded via CDN

### Testing Changes
- Edit HTML/CSS/JS files directly
- Refresh browser to see changes (or use Live Server auto-reload)
- Check browser console for validation/debugging output

### Running Tests
1. Navigate to bucks2bar: `cd bucks2bar`
2. Install dependencies (first time only): `npm install`
3. Run tests: `npm test`
4. Run with coverage: `npm run test:coverage`
5. Watch mode for development: `npm run test:watch`

### Course-Specific Workflow
- Follow instructions in [../documentation.txt](../documentation.txt) for step-by-step guidance
- Use GitHub Desktop for branching (e.g., `bucks2bar` branch for lesson 2)
- Generate commit messages with Copilot before merging to main

## Common Tasks

### Adding Features to bucks2bar
- Data-related changes: Update `financialData` object and event listeners
- UI changes: Modify Bootstrap classes in HTML, custom styles in `styles.css`
- Chart modifications: Update `initializeChart()` configuration object
- Theme support: Add dark theme styles using `body.dark-theme` selector prefix

### Extending Functionality
When adding new features (per course lesson 8-9):
1. Add HTML elements with Bootstrap classes for consistent styling
2. Create initialization function (e.g., `initializeDownloadButton()`)
3. Call from `DOMContentLoaded` event listener
4. Ensure theme compatibility by testing both light/dark modes

## Project Conventions

- **Application dependencies**: All external libraries via CDN only
- **Test dependencies**: Jest and related packages installed via npm (devDependencies)
- **Single-file scripts**: All JS logic in one `script.js` per project
- **Bootstrap components**: Use Bootstrap 5 classes extensively, minimal custom CSS
- **Month indexing**: Arrays use 0-based indexing for 12 months (Jan=0, Dec=11)
- **Currency display**: Always format with `Intl.NumberFormat` for consistency
- **Authentication**: Demo credentials hardcoded in AUTH_CREDENTIALS array (educational purposes)
- **Testing**: Comprehensive Jest test suite for all major functionality
- **Code coverage**: Aim for high coverage on core business logic
