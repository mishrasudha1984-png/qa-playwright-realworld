const { test, expect } = require('@playwright/test');
const { UserApi } = require('./UserApi');

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