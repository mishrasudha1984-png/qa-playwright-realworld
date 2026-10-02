class UserApi {

    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

    async getUser(userId) {
        return await this.request.get(
            `${this.baseUrl}/users/${userId}`
        );
    }

    async createUser(userData) {
        return await this.request.post(
            `${this.baseUrl}/users`,
            {
                data: userData
            }
        );
    }

    async updateUser(userId, userData) {
        return await this.request.put(
            `${this.baseUrl}/users/${userId}`,
            {
                data: userData
            }
        );
    }

    async deleteUser(userId) {
        return await this.request.delete(
            `${this.baseUrl}/users/${userId}`
        );
    }
}

module.exports = { UserApi };