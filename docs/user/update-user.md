# Update User

> ## Data
* userId: string;
* name: string;
* email: string;
* newPassword?: string;
* password?: string;

> ## Case of success
1. Receive and validate the data
2. Verify if user is authenticated
3. Verify if user email is available in case of new email
3. Verify if user password is correct in case of new password
4. Update an user with the received data

> ## Case of failure
1. Invalid data received
2. Unauthenticated user
3. Email received exists on database already
3. Password received is wrong
