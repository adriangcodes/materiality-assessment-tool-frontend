# Materiality Assessment Tool – Frontend

A modern, privacy-respecting B2B SaaS-style web app for conducting dynamic materiality assessments. This frontend is built with React and provides a seamless, registration-free survey experience for business stakeholders.

This project was born from firsthand experience in sustainability consulting, where materiality assessments were often slow, manual, and expensive. This MVP aims to simplify stakeholder engagement with a clean, privacy-respecting survey tool, something I always wished existed in my consulting days.

---

## Overview

The Materiality Assessment Tool enables organizations to gather stakeholder input on key topics via a branded, user-friendly survey. Respondents can participate without registration, ensuring high completion rates and respecting privacy preferences.

---

## Github and Hosting

**Frontend Repository:**  
[https://github.com/adriangcodes/materiality-assessment-tool-frontend](https://github.com/adriangcodes/materiality-assessment-tool-frontend)

**Backend Repository:**  
[https://github.com/adriangcodes/materiality-assessment-tool](https://github.com/adriangcodes/materiality-assessment-tool)

**Backend Hosting (Render):**  
[https://materiality-assessment-tool.onrender.com](https://materiality-assessment-tool.onrender.com)

**Frontend Hosting (Netlify):**
[https://materialityassessmenttool.netlify.app/](https://materialityassessmenttool.netlify.app/)

---

## Features

> This is an MVP, built fast and light. It’s minimal on purpose—designed for ease of use, not feature bloat.
> This frontend connects to a custom-built Node/Express backend (not included here) that handles data persistence and validation.

- **Modern Landing Page:**
  - Clean, white design with logo, REGISTER, and LOGIN buttons in the header.
  - Footer with copyright and social links.
- **Dynamic Survey Flow:**
  - Registration-free: respondents enter details, give consent, and proceed directly to the survey.
  - Respondent details form matches backend schema; region is a country dropdown, stakeholder type is a radio group.
  - Privacy-respecting: if consent is not given, personal fields are anonymized.
- **Survey Questions:**
  - Supports single choice, text, matrix (Likert scale), and ranking questions.
  - Ranking uses dropdowns for top 5 topics, preventing duplicate selections.
  - Matrix questions support custom rating scales.
- **Reusable Components:**
  - `SingleChoiceQuestion`, `TextQuestion`, `MatrixQuestion`, `RankingQuestion`.
- **State Management:**
  - Answers are managed in React state and submitted with respondent ID.
- **Submission & UX:**
  - Thank you message and return home button after submission.
  - Responsive, visually consistent, and accessible design.
- **Validation & Bug Fixes:**
  - Standard email validation (only if consent given).
  - Chrome autofill styling fixes.
  - All form fields and buttons aligned and styled for clarity.

---

## Roadmap Ideas

- Add admin dashboard for survey creation and data export
- Migrate database to PostgreSQL for enhanced analytics
- Explore MicroSaaS vs open-source monetisation models

---

## Tech Stack

This is the frontend of a MERN-based application, built for speed, modularity, and ease of use.

- **Frontend:** React (with React Router), Vite, ESLint
- **Styling:** CSS Modules (`index.css`, `Home.css`, `Survey.css`)
- **Backend Integration:** Connects to a custom Node/Express API (not included in this repo)
- **Routing:** React Router DOM
- **Tooling:** Vite for bundling, ESLint for linting
- **Stack Context:** Part of a broader MERN stack (MongoDB, Express, React, Node.js)

### Core Dependencies

**React (v19.1.0)**
A popular JavaScript library for building user interfaces. Chosen for its declarative, component-based architecture and broad industry adoption.

**React DOM (v19.1.0)**
Provides DOM-specific methods that enable React to interact with the browser DOM. Essential for rendering components in web applications.

**React Router DOM (v7.6.3)**
Declarative routing for React web apps. Used to handle navigation and route-based rendering across the tool’s survey flow.

### Dev Dependencies

**Vite (v7.0.0)**
A modern frontend build tool that offers instant dev server startup and fast HMR (Hot Module Replacement). Used for its speed and developer experience.

**ESLint (v9.29.0)**
A pluggable JavaScript linter. Helps catch errors early and maintain consistent code style.

**@vitejs/plugin-react (v4.5.2)**
Adds React Fast Refresh and JSX support to Vite. Essential for efficient React development within the Vite ecosystem.

**@eslint/js (v9.29.0)**
Provides the base ESLint rules in JavaScript format. Ensures that your ESLint config has access to recommended base rules.

**eslint-plugin-react-hooks (v5.2.0)**
Enforces the rules of Hooks in React to prevent common bugs and misuses of useState, useEffect, etc.

**eslint-plugin-react-refresh (v0.4.20)**
Supports React Fast Refresh in ESLint environments to enable seamless hot reloading during development.

**Globals (v16.2.0)**
Provides a list of global variables as used by different environments. Helps ESLint recognize globals like window, document, etc.

**@types/react (v19.1.8)**
TypeScript definitions for React. Included for editor autocompletion and static type checking when TypeScript is used or supported.

**@types/react-dom (v19.1.6)**
TypeScript definitions for React DOM. Supports better DX in TS-aware environments.

---

## Project Structure

```
materiality-assessment-tool-frontend/
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable UI components: Header, Footer, Logo, and question components
│   │   └── questions/    # SingleChoice, Matrix, Ranking, Text
│   ├── pages/            # Top-level views: Home.jsx, Survey.jsx
│   └── styles/           # CSS files: index.css, Home.css, Survey.css
├── public/               # Static files
├── index.html            # App entry point
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

---

## Getting Started

### Prerequisites:
- Node.js (v18 or higher)
- npm or Yarn

1. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

2. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

3. **Open in browser:**
    Visit [http://localhost:5173](http://localhost:5173)
    Note: Only requests from this port are allowed to access the backend due to CORS settings.

---

## Usage

- **Landing Page:** Enter a survey code to begin. Please use the demo code: 686680ab54f257447c035d97
- **Survey Flow:** Fill in respondent details, give consent, and answer questions.
- **Submission:** Answers are sent to the backend; a thank you message is shown.

---

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/YourFeature)
3. Add your changes (git add .)
4. Commit your changes (git commit -m 'Add YourFeature')
5. Push to the branch (git push origin feature/YourFeature)
6. Open a Pull Request

---

## Team
Project developed by:
Adrian Gidaro
- [GitHub](https://github.com/adriangidaro)
- [LinkedIn](https://www.linkedin.com/in/adriangidaro/)

---

## License

This project is licensed under the MIT License. See [LICENSE](/docs/LICENSE) for details.

---

## Package Licenses
- [react (v19.1.0)](https://github.com/facebook/react/blob/main/LICENSE) – MIT License  
- [react-dom (v19.1.0)](https://github.com/facebook/react/blob/main/LICENSE) – MIT License  
- [react-router-dom (v7.6.3)](https://github.com/remix-run/react-router/blob/main/LICENSE) – MIT License  
- [vite (v7.0.0)](https://github.com/vitejs/vite/blob/main/LICENSE) – MIT License  
- [eslint (v9.29.0)](https://github.com/eslint/eslint/blob/main/LICENSE) – MIT License  
- [@vitejs/plugin-react (v4.5.2)](https://github.com/vitejs/vite-plugin-react/blob/main/LICENSE) – MIT License  
- [@eslint/js (v9.29.0)](https://github.com/eslint/js/blob/main/LICENSE) – MIT License  
- [eslint-plugin-react-hooks (v5.2.0)](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/LICENSE) – MIT License  
- [eslint-plugin-react-refresh (v0.4.20)](https://github.com/facebook/react/blob/main/packages/react-refresh/LICENSE) – MIT License  
- [globals (v16.2.0)](https://github.com/sindresorhus/globals/blob/main/license) – MIT License  
- [@types/react (v19.1.8)](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE) – MIT License  
- [@types/react-dom (v19.1.6)](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE) – MIT License