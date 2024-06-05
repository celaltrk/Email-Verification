# Email Verification API

## Description

This project implements an email verification system using Nest.js. It provides endpoints to register users, send verification emails, and verify user emails.

## Usage

To use this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/celaltrk/email-verification
```

2. Navigate to the project directory:

```bash
cd email-verification
```

3. Install dependencies:

```bash
npm install 
```

4. Set up environment variables:

Create a `.env` file in the root directory of the project and add the following variables:

```
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_PASS=your-gmail-password
```

Replace `your-gmail-address@gmail.com` and `your-gmail-password` with your Gmail address and password. Ensure that you have allowed less secure apps access in your Gmail settings or use Gmail app passwords if you have two-step verification enabled.

5. Run the application:

```bash
npm run start
```

6. Use the API endpoints to register users and verify their emails.

### API Endpoints

- **POST /user/register**:
  - Registers a new user.
  - Request body: `{ "username": "example", "email": "user@example.com" }`
  - Response: `User registration successful. Verification email sent to user@example.com`

- **GET /user/verify-email/{username}/{verificationToken}**:
  - Verifies the user's email.
  - URL parameters: `{ username, verificationToken }`
  - Response: `Email successfully verified` or `Invalid verification token`

- **GET /user/check-verification/{username}**:
  - Checks if the user's email is verified.
  - URL parameters: `{ username }`
  - Response: `User is verified` or `User is not verified`

### Testing

You can test the API endpoints using tools like cURL or Postman. Here are example cURL commands:

```bash
# Register a new user
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{"username": "example", "email": "user@example.com"}'

# Verify the user's email
curl http://localhost:3000/user/verify-email/example/someGeneratedToken

# Check verification status
curl http://localhost:3000/user/check-verification/example
```

Ensure to replace `someGeneratedToken` with the actual token received in the verification email.

## Credits

This project was built with [Nest.js](https://nestjs.com/).

The code was mainly created using ChatGPT language model.