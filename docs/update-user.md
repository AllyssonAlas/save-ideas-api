# Sign Up

> ## Data
* name: string
* email: string
* password: string
* accessToken: string

> ## Case of success
1. Receive and validate the data
2. Verify if token is valid
3. Verify if user email is valid
4. Update an user with the received data

> ## Case of failure
1. Invalid data received
2. Email received exists on database already
