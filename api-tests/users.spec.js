const { test, expect } = require('@playwright/test');
const { UserApi } = require('./UserApi');
const { BookingApi } = require('./BookingApi');


test('Verify GET users API', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
});


test('Verify GET users API returns multiple users', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users'
    );

    expect(response.status()).toBe(200);

    const users = await response.json();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBe(1);
    expect(users[0].name).toBeTruthy();
    expect(users[0].email).toBeTruthy();
});
test('Verify POST users API creates a user', async ({ request }) => {

    const userApi = new UserApi(request);

    const userData = {
        name: 'Sudha Dubey',
        username: 'sudha',
        email: 'sudha@example.com'
    };

    const response = await userApi.createUser(userData);

    expect(response.status()).toBe(201);

    const user = await response.json();

    expect(user.name).toBe('Sudha Dubey');
    expect(user.username).toBe('sudha');
    expect(user.email).toBe('sudha@example.com');
    expect(user.id).toBeTruthy();
});

test('Verify PUT users API updates a user', async ({ request }) => {

    const userApi = new UserApi(request);

    const userData = {
        name: 'Sudha Updated',
        username: 'sudha_updated',
        email: 'sudha.updated@example.com'
    };

    const response = await userApi.updateUser(1, userData);

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(1);
    expect(user.name).toBe('Sudha Updated');
    expect(user.username).toBe('sudha_updated');
    expect(user.email).toBe('sudha.updated@example.com');
});

test('Verify DELETE users API deletes a user', async ({ request }) => {

    const userApi = new UserApi(request);

    const response = await userApi.deleteUser(1);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toEqual({});
});
test('Verify user can be retrieved using API helper', async ({ request }) => {

    const userApi = new UserApi(request);

    const response = await userApi.getUser(1);

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
});
test('Verify API request chaining', async ({ request }) => {

    const userApi = new UserApi(request);

    // Step 1: Get an existing user
    const getResponse = await userApi.getUser(1);

    expect(getResponse.status()).toBe(200);

    const user = await getResponse.json();

    // Capture ID from GET response
    const userId = user.id;

    expect(userId).toBe(1);

    // Step 2: Use captured ID in another API request
    const secondResponse = await userApi.getUser(userId);

    expect(secondResponse.status()).toBe(200);

    const retrievedUser = await secondResponse.json();

    expect(retrievedUser.id).toBe(userId);
});

test('Verify API chaining GET to PUT', async ({ request }) => {

    const userApi = new UserApi(request);

    // Step 1: Get existing user
    const getResponse = await userApi.getUser(1);

    expect(getResponse.status()).toBe(200);

    const user = await getResponse.json();

    // Capture ID
    const userId = user.id;

    expect(userId).toBe(1);

    // Step 2: Update the user using captured ID
    const updateData = {
        name: 'Sudha API Updated',
        username: 'sudha_api',
        email: 'sudha.api@example.com'
    };

    const updateResponse = await userApi.updateUser(
        userId,
        updateData
    );

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.name).toBe('Sudha API Updated');
});

test('Verify API chaining POST to DELETE', async ({ request }) => {

    const userApi = new UserApi(request);

    // Step 1: Create user
    const userData = {
        name: 'Sudha Delete',
        username: 'sudha_delete',
        email: 'sudha.delete@example.com'
    };

    const createResponse = await userApi.createUser(userData);

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    // Capture ID from POST response
    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    // Step 2: Delete using captured ID
    const deleteResponse = await userApi.deleteUser(userId);

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();

    expect(deleteBody).toEqual({});
});

test('Verify API response structure', async ({ request }) => {

    const userApi = new UserApi(request);

    const response = await userApi.getUser(1);

    expect(response.status()).toBe(200);

    const user = await response.json();

    // Validate required fields
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');

    // Validate data types
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.username).toBe('string');
    expect(typeof user.email).toBe('string');

    // Validate actual data
    expect(user.id).toBe(1);
    expect(user.email).toBeTruthy();
});
test('Verify GET users API returns 404 for invalid user', async ({ request }) => {

    const userApi = new UserApi(request);

    const response = await userApi.getUser(9999);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body).toEqual({});
});
//Validate a response header
test('Verify API response headers', async ({ request }) => {

    const userApi = new UserApi(request);

    const response = await userApi.getUser(1);

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');
});

test('Verify API request headers', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1',
        {
            headers: {
                'Accept': 'application/json'
            }
        }
    );

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(1);
});
// Add an Authorization header
test('Verify API request with Authorization header', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1',
        {
            headers: {
                'Authorization': 'Bearer demo-token',
                'Accept': 'application/json'
            }
        }
    );

    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user.id).toBe(1);
});


test('Verify booking API authentication', async ({ request }) => {

    const bookingApi = new BookingApi(request);

    // Step 1: Get token
    const response = await bookingApi.createToken(
        'admin',
        'password123'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    const token = body.token;

    expect(token).toBeTruthy();

    // Step 2: Use token in another API request
    const bookingResponse = await request.get(
        'https://restful-booker.herokuapp.com/booking',
        {
            headers: {
                'Cookie': `token=${token}`,
                'Accept': 'application/json'
            }
        }
    );

    expect(bookingResponse.status()).toBe(200);
});