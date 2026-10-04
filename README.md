# QA Playwright Real World Automation Framework

A real-world QA automation framework built using **Playwright**, **JavaScript**, and **API testing**.  
The project also supports running the complete test suite inside **Docker**.

## 🛠️ Technology Stack

- Playwright
- JavaScript
- Node.js
- REST API Testing
- Playwright APIRequest
- Docker
- Git & GitHub
- Page Object Model
- API Helper Classes

## 📁 Project Structure

```text
qa-playwright-realworld/
│
├── .auth/
│   └── Authentication state files
│
├── api-tests/
│   ├── users.spec.js
│   ├── UserApi.js
│   └── BookingApi.js
│
├── auth/
│   └── Authentication tests
│
├── pages/
│   └── Page Object Model classes
│
├── test-data/
│   └── Test data
│
├── tests/
│   └── UI test cases
│
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
