# Backend API Documentation

## 📋 API Overview

The backend provides a single endpoint to send contact form emails via Gmail SMTP.

---

## 🔌 API Endpoint

### POST /api/contact

Send a contact form submission and receive an email.

**Base URL:** `http://localhost:5000` (local) or `https://your-backend-url` (production)

**Endpoint:** `/api/contact`

**Method:** `POST`

**Content-Type:** `application/json`

---

## 📨 Request

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "website": "https://example.com",
  "message": "I would like to discuss a design project with you."
}
```

### Parameters

| Parameter | Type | Required | Validation |
|-----------|------|----------|-----------|
| name | string | Yes | 2-100 characters |
| email | string | Yes | Valid email format |
| website | string | No | Valid URL format |
| message | string | Yes | 10-5000 characters |

### Example with cURL

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "website": "https://example.com",
    "message": "This is a test message with enough characters to pass validation"
  }'
```

### Example with Axios (Frontend)

```javascript
import axios from 'axios';

const response = await axios.post(
  'http://localhost:5000/api/contact',
  {
    name: 'John Doe',
    email: 'john@example.com',
    website: 'https://example.com',
    message: 'This is a test message with enough characters to pass validation'
  },
  {
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000
  }
);
```

---

## 📤 Response

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Name must be between 2 and 100 characters."
}
```

### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Failed to send message. Please try again later or contact via email directly."
}
```

---

## ✅ Validation Details

### Name Validation

```javascript
// Requirements:
// - Required (must not be empty after trim)
// - Minimum: 2 characters
// - Maximum: 100 characters

// Valid:
"John Doe"        ✓
"A"                ✗ (too short)
"Lorem ipsum dolor sit amet consectetur adipiscing elit..."  ✗ (too long)
```

### Email Validation

```javascript
// Requirements:
// - Required
// - Valid email format (RFC-compliant)
// - Uses: email-validator package

// Valid:
"john@example.com"           ✓
"user+tag@domain.co.uk"      ✓
"invalid.email@"             ✗ (invalid format)
"@example.com"               ✗ (missing local part)
```

### Website Validation (Optional)

```javascript
// Requirements:
// - Optional field
// - If provided, must be valid URL
// - Checks: http://, https://, file://, etc.

// Valid:
"https://example.com"        ✓
"http://www.example.com"     ✓
""                           ✓ (empty is ok)
"not-a-url"                  ✗ (invalid URL)
"example.com"                ✗ (missing protocol)
```

### Message Validation

```javascript
// Requirements:
// - Required
// - Minimum: 10 characters
// - Maximum: 5000 characters

// Valid:
"I would like to discuss a project with you"     ✓
"Hi"                                             ✗ (too short)
"A very long message..." (5001+ chars)           ✗ (too long)
```

---

## 🎯 Error Codes & Messages

| Status | Message | Cause |
|--------|---------|-------|
| 400 | Name, email, and message are required fields. | Missing required field |
| 400 | Name must be between 2 and 100 characters. | Name length invalid |
| 400 | Please provide a valid email address. | Email format invalid |
| 400 | Please provide a valid website URL. | Website URL invalid |
| 400 | Message must be between 10 and 5000 characters. | Message length invalid |
| 500 | Email service authentication failed. | Gmail credentials wrong |
| 500 | Failed to send message. Please try again later. | SMTP error |

---

## 📧 Email Format

When a contact form is submitted, the visitor receives an email formatted as:

### Email Subject
```
New Portfolio Contact - John Doe
```

### Email Body (Plain Text)
```
----------------------------------
New Portfolio Contact

Name: John Doe

Email: john@example.com

Website: https://example.com

Message:
I would like to discuss a design project about creating an interactive web experience.

Date & Time: 01/15/2024, 10:30:45 AM
----------------------------------
```

### Email Body (HTML)
```html
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
  <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; border-left: 4px solid #000;">
    <h2 style="margin: 0; color: #000;">New Portfolio Contact</h2>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
    
    <p><strong>Name:</strong> John Doe</p>
    <p><strong>Email:</strong> john@example.com</p>
    <p><strong>Website:</strong> https://example.com</p>
    
    <div style="margin: 20px 0;">
      <strong>Message:</strong>
      <p style="background-color: #f9f9f9; padding: 15px; border-radius: 3px; white-space: pre-wrap;">
        I would like to discuss...
      </p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
    <p style="color: #777; font-size: 12px; margin: 0;">
      <strong>Received:</strong> 01/15/2024, 10:30:45 AM
    </p>
  </div>
</div>
```

---

## 🔐 Security Features

### Input Sanitization
- Trim whitespace from all inputs
- Validate format for email and URL
- Length validation to prevent abuse

### Error Handling
- Try-catch blocks for all async operations
- Detailed error logging
- Generic error messages (no system details exposed)
- Proper HTTP status codes

### CORS Protection
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // Only your frontend
  credentials: true,
  methods: ['GET', 'POST'],
};
```

### Environment Variables
- No hardcoded credentials
- Sensitive data in `.env` (git-ignored)
- Different configs for dev/production

---

## 📊 Request/Response Examples

### Example 1: Successful Submission

**Request:**
```bash
POST /api/contact HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "website": "https://alicedesigns.com",
  "message": "I'm interested in collaborating on a web design project. Can we schedule a call?"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

---

### Example 2: Missing Required Field

**Request:**
```bash
POST /api/contact HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Bob",
  "email": "bob@example.com"
  // Missing "message"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Name, email, and message are required fields."
}
```

---

### Example 3: Invalid Email

**Request:**
```bash
POST /api/contact HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Charlie Brown",
  "email": "charlie-at-example",
  "message": "This is my message content"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Please provide a valid email address."
}
```

---

### Example 4: Message Too Short

**Request:**
```bash
POST /api/contact HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Diana",
  "email": "diana@example.com",
  "message": "Short msg"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Message must be between 10 and 5000 characters."
}
```

---

### Example 5: Gmail Authentication Error

**Response (500):**
```json
{
  "success": false,
  "message": "Email service authentication failed. Please check your credentials."
}
```

---

## 🏥 Health Check Endpoint

### GET /api/health

Check if the backend server is running and healthy.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ⚙️ Environment Variables Required

```env
# Gmail Configuration
EMAIL=your-email@gmail.com
APP_PASSWORD=your-16-char-app-password

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

---

## 🔄 Implementation Flow

```
Frontend (React)
    ↓
Axios POST /api/contact
    ↓
Express Server
    ↓
CORS Check
    ↓
Route Handler (/routes/contact.js)
    ↓
Controller (sendContactEmail)
    ↓
Validation
    ├─ Required fields check
    ├─ Field length validation
    ├─ Email format validation
    └─ URL validation
    ↓
Send Email via Nodemailer
    ├─ Connect to Gmail SMTP
    ├─ Prepare email content
    └─ Send email
    ↓
Return Response
    ↓
Frontend Toast Notification
```

---

## 🚀 Performance Considerations

- **Timeout:** 10 seconds (frontend Axios)
- **Max Request Size:** 10MB
- **Email Sending:** Async (non-blocking)
- **Validation:** Client + Server (defense in depth)
- **CORS:** Restricted to frontend URL only

---

## 📝 Code Structure

```
backend/
├── server.js                          # Express app setup
├── routes/
│   └── contact.js                     # POST /api/contact route
├── controllers/
│   └── contactController.js           # Business logic
├── .env                               # Local credentials
├── .env.example                       # Template
├── package.json                       # Dependencies
└── .gitignore                         # Git ignore rules
```

---

## 🧪 Testing the API

### Using Postman

1. Create new POST request
2. URL: `http://localhost:5000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "This is a test message"
}
```
5. Send and check response

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. New Request
3. Method: POST
4. URL: `http://localhost:5000/api/contact`
5. Body: JSON (same as above)
6. Send

---

## 🔍 Debugging

### Enable Server Logging

The server logs all errors to console:

```javascript
console.error('Contact Email Error:', error);
```

### Check Logs

```bash
# Run with visible logs
node server.js

# Or with nodemon
npm run dev
```

### Common Errors in Logs

```
Auth Error: Invalid login credentials
↳ Solution: Check EMAIL and APP_PASSWORD in .env

Error: connect ECONNREFUSED
↳ Solution: Gmail SMTP not responding (rare)

Error: Invalid CORS origin
↳ Solution: Frontend URL not in CORS whitelist
```

---

## 📞 Support & Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Express.js Guide](https://expressjs.com/)
- [Gmail SMTP Setup](https://support.google.com/accounts/answer/185833)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
