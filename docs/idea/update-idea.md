# Update Idea

> ## Data
* title: string
* description: string
* features:
  - name: string
  - description: string;
  - finished: boolean;

> ## Case of success
1. Receive and validate the data
2. Verify if user is authenticated
3. Verify if idea exists
4. Update an idea with data received

> ## Case of failure
1. Invalid data received
2. Unauthenticated user
3. Idea does not exist