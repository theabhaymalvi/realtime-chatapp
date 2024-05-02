# INSTALLATION GUIDE:

Prerequisites:
Node.js and npm (or yarn): Ensure you have the latest stable version of Node.js installed. 
You can download it from the official website https://nodejs.org/en. This will also install npm, the Node Package Manager. 
If you prefer, you can use yarn as an alternative package manager.

### Installation Steps:

1. Clone the Repository:
Open a terminal or command prompt and navigate to the directory where you want to clone the project.

Use the git clone command followed by the URL of the GitHub repository:
```git clone https://github.com/theabhaymalvi/realtime-chatapp.git```

2. Install Dependencies:

Navigate into the cloned project directory:
`cd realtime-chatapp`

- Run the following command to install all the project's dependencies from the package.json file:
`npm install`

3. Environment Variables (Optional):

If your project relies on environment variables (e.g., API keys, database credentials), create a .env file in the project's root directory.
Define your environment variables within the .env file, one per line, in the format VARIABLE_NAME=value.

4. Start Backend Server
`node index.js`

- Now, Server starts listening on PORT as initialized in environment variables.

## API Routes

This guide outlines the API routes available in your chat application, enabling seamless communication between users and the server.

### User Routes (users.js):

1. POST /api/user/register

Purpose: Registers a new user
Request Body: Expects an object containing user information (e.g., username, email, password).
Response: Upon successful registration, sends a response object with user details (excluding sensitive data like password) and a success message. In case of errors (e.g., username already exists), sends an error response with appropriate details.

2. POST /api/user/login

Purpose: Logs in an existing user
Request Body: Expects an object containing user credentials (e.g., email, password).
Response: If login is successful, sends a response object with user details (excluding password) and an authentication token. If login fails (e.g., invalid credentials), sends an error response with appropriate details.

3. GET /api/user/ 

Purpose: Retrieves all users (protected route, requires authentication)
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends an array of user objects (excluding sensitive data) upon successful retrieval. In case of errors (e.g., invalid token), sends an error response with appropriate details.

4.PUT /api/user/ 

Purpose: Updates the user's online status (protected route, requires authentication)
Request Body: Expects an object containing the updated status (e.g., available or busy).
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends a success message upon successful update. In case of errors (e.g., invalid token), sends an error response with appropriate details.

### Chat Routes (chats.js):

1. POST /api/chat/

Purpose: Enables a user to access a specific one to one chat (protected route, requires authentication)
Request Body: Expects an object containing the chat ID (chatId).
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends the chat object (including relevant details) upon successful access. In case of errors (e.g., invalid token or chat ID), sends an error response with appropriate details.

2. GET /api/chat/

Purpose: Retrieves all chats for the authenticated user (protected route, requires authentication)
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends an array of chat objects upon successful retrieval. In case of errors (e.g., invalid token), sends an error response with appropriate details.

3. POST /api/chat/group

Purpose: Creates a new group chat (protected route, requires authentication)
Request Body: Expects an object containing group details (e.g., groupName, member IDs).
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends the newly created group chat object upon successful creation. In case of errors (e.g., invalid token or missing details), sends an error response with appropriate details.

4. PUT /api/chat/renamegroup

Purpose: Renames an existing group chat (protected route, requires authentication)
Request Body: Expects an object containing the chat ID (chatId) and the new group name (newName).
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends the updated group chat object upon successful renaming. In case of errors (e.g., invalid token, chat ID, or missing details), sends an error response with appropriate details.

5. PUT /api/chat/groupadd

Purpose: Adds a user to an existing group chat (protected route, requires authentication)
Request Body: Expects an object containing the chat ID (chatId) and the user ID to be added (userId).
Request Headers: Requires a valid authentication token in the authorization header.
Response: Sends the updated group chat object with the added user upon successful addition. In case of errors (e.g., invalid token, chat ID, user ID, or permission issues), sends an error response with appropriate details.

6. PUT /api/chat/groupremove

Purpose: Removes a user from an existing group chat (protected route, requires authentication)
Request Body: Expects an object containing the chat ID (chatId) and the user ID to be removed

### Messages Routes (messages.js):

1. GET /api/message/:chatId

Purpose: Retrieves all messages for a specific chat
Authentication: Requires a valid authentication token via the verifyUser middleware (protected route).
Request Parameters:
chatId: The unique identifier of the chat for which messages are requested.
Response:
Upon successful retrieval, sends an array of message objects containing details like sender, recipient, timestamp, and message content (excluding sensitive data if applicable).
In case of errors (e.g., invalid token, invalid chat ID, or permission issues), sends an error response with appropriate details.

2. POST /api/message/

Purpose: Sends a new message to a chat
Authentication: Requires a valid authentication token via the verifyUser middleware (protected route).
Request Body: Expects an object containing message details:
chatId: The unique identifier of the chat to which the message is sent.
content: The actual message content (text, image, or other supported format).
(Optional) recipientId: The user ID of the specific recipient within the chat (if applicable).
Response:
Upon successful message creation, sends the newly created message object with details like sender, recipient, timestamp, and message ID.
In case of errors (e.g., invalid token, missing details, or permission issues), sends an error response with appropriate details.
