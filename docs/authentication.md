# Authentication

> ## Data
* email: string
* password: string

> ## Case of success
1. Receive and validate the data
2. Verify if credentials are valid
3. Add an access token to user in database
4. Return user data with the access token generated

> ## Case of failure
1. Invalid data received
2. Invalid credentials received
