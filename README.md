# Udemy Github Copilot Course

## GitHub Copilot Beginner to Pro - AI for Coding & Development

## Udemy Course Link: [https://www.udemy.com/course/github-copilot]

### Projects

#### 01 Github Copilot basics (folder ghcopilot)

Simple HTML/JavaScript project demonstrating GitHub Copilot inline suggestions and basic DOM manipulation.

#### 02 Bucks 2 Bar (folder bucks2bar)

Full-featured financial tracker application with:

- Income and expense tracking with monthly data visualization
- Interactive Chart.js bar chart with customization options
- Dark/Light theme toggle with localStorage persistence
- User authentication system with login validation
- Chart download functionality (PNG export)
- Responsive Bootstrap 5 design
- Comprehensive Jest test suite with 100% coverage

Original GitHub Repository: [https://github.com/tomphill/newbucks2bar]

### Testing

The bucks2bar project includes Jest unit tests covering:

- Financial data structure validation
- Authentication credential checks
- Input validation functions
- Total calculations (income, expenses, net amount)
- Theme management
- LocalStorage integration
- Input value handling

**Run tests:**

```bash
cd bucks2bar
npm install
npm test
```

**Run tests with coverage:**

```bash
npm run test:coverage
```

### Login Credentials

**Default users for testing authentication:**

- Username: `imamovickerim` | Password: `123456`
- Username: `johndoe` | Password: `123456`

#### 03 Link Shortener (folder link-shortener)

Modern full-stack URL shortening service built with Next.js 15 featuring:

- URL shortening with unique shortcodes
- User authentication with Clerk
- Dashboard for managing shortened links
- CRUD operations (Create, Read, Update, Delete links)
- Fast redirect system
- Dark/Light theme toggle with system preference support
- PostgreSQL database hosted on Neon
- Drizzle ORM for database operations
- Toast notifications with Sonner
- Responsive design with Shadcn UI and Tailwind CSS
- Form validation with React Hook Form and Zod
- TypeScript for type safety

**Tech Stack:**

- Frontend: Next.js 16, React, TypeScript
- Styling: Tailwind CSS, Shadcn UI
- Authentication: Clerk
- Database: PostgreSQL (Neon)
- ORM: Drizzle ORM

Original GitHub Repository: [https://github.com/tomphill/linkshortenerproject]

**Getting Started:**

```bash
cd link-shortener
npm install
# Configure .env file with Clerk and Neon credentials (see example.env)
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
