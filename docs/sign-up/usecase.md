# Sign Up

> ## Data
* name: string
* email: string
* password: string
* accessToken: string

> ## Case of success
1. Receive and validate the data
2. Verify is email is already taken
3. Create an user with the received data
4. Create a access token with a valid expiration date
5. Return the generated token

> ## Case of failure
1. Invalid data received
2. Email received exists on database already
