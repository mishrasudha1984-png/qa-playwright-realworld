const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    //testDir: './tests',
    testDir: '.',

    fullyParallel: true,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
    ['html'],
    ['allure-playwright']
],



    use: {
        baseURL: 'https://www.saucedemo.com',

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        headless: true,
    },

    projects: [

    // Authentication setup
    {
        name: 'setup',
        testDir: './auth',
        testMatch: /.*\.setup\.js/,
    },

    // Login test - NO saved authentication
    {
        name: 'login',
        testMatch: /login\.spec\.js/,
    },

    // Authenticated Chromium tests
    {
        name: 'chromium',
        testIgnore: /login\.spec\.js/,
        use: {
            ...devices['Desktop Chrome'],
            storageState: '.auth/user.json',
        },
        dependencies: ['setup'],
    },
    

    // Authenticated Firefox tests
    {
        name: 'firefox',
        testIgnore: /login\.spec\.js/,
        use: {
            ...devices['Desktop Firefox'],
            storageState: '.auth/user.json',
        },
        dependencies: ['setup'],
    },

    // Authenticated WebKit tests
    {
        name: 'webkit',
        testIgnore: /login\.spec\.js/,
        use: {
            ...devices['Desktop Safari'],
            storageState: '.auth/user.json',
        },
        dependencies: ['setup'],
    },

    // Api tests

{
    name: 'api',
    testDir: './api-tests',
},
],
});