class BookingApi {

    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://restful-booker.herokuapp.com';
    }

    async createToken(username, password) {
        return await this.request.post(
            `${this.baseUrl}/auth`,
            {
                data: {
                    username: username,
                    password: password
                }
            }
        );
    }

    async getBookingList(token) {
        return await this.request.get(
            `${this.baseUrl}/booking`,
            {
                headers: {
                    'Cookie': `token=${token}`,
                    'Accept': 'application/json'
                }
            }
        );
    }
}

module.exports = { BookingApi };     