# Sign Up

> ## Data
* name: string
* email: string
* password: string

> ## Case of success
1. Receive and validate the data
2. Verify if email is already taken
3. Create an user with the received data
4. Return a boolean representing if the user was created or not

> ## Case of failure
1. Invalid data received
2. Email received exists on database already
