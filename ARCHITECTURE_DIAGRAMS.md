# Architecture & Flow Diagrams

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└─────────────────────────────────────────────────────────────┘
        ↑                                  ↑
        │                                  │ SMTP
        │ HTTPS                            │ (Port 587)
        │                                  │
    ┌───────────┐                    ┌──────────────┐
    │ Vercel    │                    │   Gmail      │
    │ Frontend  │◀───────HTTP────────▶  SMTP Server │
    │ (React)   │    (Port 443)      │              │
    └───────────┘                    └──────────────┘
        ↓                                  ↓
        │ HTTPS                          Email
        │ (Port 443)                    (Inbox)
        │
    ┌─────────────────────┐
    │ Local Development   │
    │ http://localhost... │
    └─────────────────────┘
```

---

## 🔄 Request-Response Flow

```
USER INTERACTION:
┌──────────────────────────────────────────────────────────────┐
│ 1. User fills contact form                                   │
│    - Name: "John Doe"                                        │
│    - Email: "john@example.com"                               │
│    - Website: "https://example.com"                          │
│    - Message: "I'd like to discuss a project"               │
│                                                               │
│ 2. User clicks "Get In Touch" button                         │
│    - Button shows "Sending..."                               │
│    - Button is disabled                                      │
│    - Form inputs are disabled                                │
└──────────────────────────────────────────────────────────────┘
                           ↓
FRONTEND VALIDATION:
┌──────────────────────────────────────────────────────────────┐
│ Check required fields:                                        │
│   ✓ name (not empty, 2-100 chars)                            │
│   ✓ email (valid format)                                     │
│   ✓ message (10-5000 chars)                                  │
│   ✓ website (valid URL if provided)                          │
│                                                               │
│ Trim whitespace from all fields                              │
│                                                               │
│ If validation fails → Show error toast → Stop                │
└──────────────────────────────────────────────────────────────┘
                           ↓
AXIOS REQUEST:
┌──────────────────────────────────────────────────────────────┐
│ POST http://localhost:5000/api/contact                       │
│                                                               │
│ Headers: {                                                    │
│   'Content-Type': 'application/json'                         │
│ }                                                             │
│                                                               │
│ Body: {                                                       │
│   name: "John Doe",                                          │
│   email: "john@example.com",                                 │
│   website: "https://example.com",                            │
│   message: "I'd like to discuss a project"                   │
│ }                                                             │
│                                                               │
│ Timeout: 10 seconds                                          │
└──────────────────────────────────────────────────────────────┘
                           ↓
BACKEND RECEIVES REQUEST:
┌──────────────────────────────────────────────────────────────┐
│ 1. CORS Check                                                │
│    - Origin: frontend URL                                    │
│    - Allowed? (check FRONTEND_URL in .env)                   │
│    - If not allowed → CORS error                             │
│                                                               │
│ 2. Parse JSON body                                           │
│    - Extract: name, email, website, message                  │
│    - Trim all values                                         │
│                                                               │
│ 3. Route to /api/contact → contactController                 │
└──────────────────────────────────────────────────────────────┘
                           ↓
BACKEND VALIDATION:
┌──────────────────────────────────────────────────────────────┐
│ ✓ name: 2-100 characters                                     │
│ ✓ email: valid format using email-validator                 │
│ ✓ message: 10-5000 characters                                │
│ ✓ website: valid URL (if provided)                           │
│                                                               │
│ If ANY validation fails:                                     │
│   → Return 400 error with message                            │
│   → Frontend receives error → Show error toast               │
│   → Stop processing                                          │
└──────────────────────────────────────────────────────────────┘
                           ↓
PREPARE EMAIL:
┌──────────────────────────────────────────────────────────────┐
│ Subject: "New Portfolio Contact - John Doe"                  │
│                                                               │
│ From: portfolio-owner@gmail.com (from env EMAIL)             │
│ To: portfolio-owner@gmail.com (same)                         │
│ Reply-To: john@example.com (visitor email)                   │
│                                                               │
│ Body (formatted):                                             │
│ ----------------------------------                           │
│ New Portfolio Contact                                         │
│                                                               │
│ Name: John Doe                                               │
│ Email: john@example.com                                      │
│ Website: https://example.com                                 │
│ Message: I'd like to discuss a project                       │
│ Date & Time: 01/15/2024, 10:30:45 AM                         │
│ ----------------------------------                           │
│                                                               │
│ HTML version (styled) also prepared                          │
└──────────────────────────────────────────────────────────────┘
                           ↓
SEND EMAIL VIA NODEMAILER:
┌──────────────────────────────────────────────────────────────┐
│ Connect to Gmail SMTP:                                        │
│   - Service: "gmail"                                         │
│   - User: EMAIL (from .env)                                  │
│   - Pass: APP_PASSWORD (from .env)                           │
│                                                               │
│ Send email with nodemailer.sendMail()                        │
│                                                               │
│ If error:                                                     │
│   - Log error to console                                     │
│   - Check error type (auth, connection, etc)                 │
│   - Return appropriate error message                         │
│                                                               │
│ If success:                                                   │
│   - Email sent to Gmail inbox                                │
│   - Return success response                                  │
└──────────────────────────────────────────────────────────────┘
                           ↓
RESPONSE SENT TO FRONTEND:
┌──────────────────────────────────────────────────────────────┐
│ HTTP 200:                                                     │
│ {                                                             │
│   "success": true,                                           │
│   "message": "Message sent successfully!"                    │
│ }                                                             │
│                                                               │
│ OR                                                            │
│                                                               │
│ HTTP 400/500:                                                 │
│ {                                                             │
│   "success": false,                                          │
│   "message": "Error description"                             │
│ }                                                             │
└──────────────────────────────────────────────────────────────┘
                           ↓
FRONTEND HANDLES RESPONSE:
┌──────────────────────────────────────────────────────────────┐
│ Stop loading state (button: "Get In Touch")                  │
│ Enable form inputs                                            │
│                                                               │
│ If success:                                                   │
│   → Show green success toast                                  │
│   → "Message sent successfully!"                             │
│   → Reset form (clear all inputs)                            │
│   → Toast auto-hides after 3 seconds                         │
│                                                               │
│ If error:                                                     │
│   → Show red error toast                                      │
│   → Display error message from server                        │
│   → Toast auto-hides after 3 seconds                         │
│   → Form data NOT cleared (user can edit)                    │
└──────────────────────────────────────────────────────────────┘
                           ↓
USER SEES RESULT
```

---

## 📱 Component Hierarchy

```
App.jsx
│
├── Home.jsx
│   └── Contact.jsx (Updated)
│       ├── State:
│       │   ├── formData (name, email, website, message)
│       │   ├── isLoading (boolean)
│       │   └── toast (message, type, visibility)
│       │
│       ├── Handlers:
│       │   ├── handleInputChange()
│       │   ├── handleSubmit()
│       │   ├── showToast()
│       │   ├── hideToast()
│       │   └── resetForm()
│       │
│       ├── JSX:
│       │   ├── <form> (with onSubmit)
│       │   ├── <input> (name)
│       │   ├── <input> (email)
│       │   ├── <input> (website)
│       │   ├── <textarea> (message)
│       │   ├── <button> (Get In Touch)
│       │   ├── Social Links
│       │   └── <Toast /> (notifications)
│       │
│       └── API Call:
│           └── axios.post(API_URL, formData)
│
└── Toast.jsx (New)
    ├── Props:
    │   ├── message
    │   ├── type ('success', 'error', 'info')
    │   ├── isVisible
    │   └── onClose
    │
    ├── Behavior:
    │   ├── Auto-dismiss after 3 seconds
    │   ├── Smooth animations
    │   └── Color-coded by type
    │
    └── Rendered at: Fixed position (top-right)
```

---

## 🗂️ Backend File Structure

```
backend/
│
├── server.js
│   ├── Import modules
│   │   ├── express
│   │   ├── cors
│   │   ├── dotenv
│   │   └── routes
│   │
│   ├── Load environment variables
│   │   └── dotenv.config()
│   │
│   ├── Setup Express app
│   │   ├── Create app instance
│   │   ├── Configure CORS
│   │   ├── Setup middleware
│   │   │   ├── express.json()
│   │   │   └── express.urlencoded()
│   │   └── Setup routes
│   │       ├── /api/contact (POST)
│   │       ├── /api/health (GET)
│   │       └── 404 handler
│   │
│   ├── Error handling middleware
│   │   └── Global error handler
│   │
│   └── Start server
│       └── app.listen(PORT)
│
├── routes/contact.js
│   ├── Import controller
│   ├── Create router
│   └── Route definition
│       └── router.post('/', sendContactEmail)
│
├── controllers/contactController.js
│   │
│   ├── Utilities:
│   │   ├── isValidEmail(email)
│   │   ├── trimFormData(data)
│   │   └── formatEmailBody(data)
│   │
│   ├── Nodemailer Setup:
│   │   └── transporter = createTransport({
│   │       service: 'gmail',
│   │       auth: { user, pass }
│   │   })
│   │
│   ├── Main Handler: sendContactEmail(req, res)
│   │   ├── Receive request data
│   │   ├── Trim whitespace
│   │   ├── Validate all fields
│   │   │   ├── Required fields
│   │   │   ├── Name length
│   │   │   ├── Email format
│   │   │   ├── Website URL
│   │   │   └── Message length
│   │   ├── Format email body
│   │   ├── Send email via Nodemailer
│   │   ├── Handle errors
│   │   │   ├── Validation errors (400)
│   │   │   ├── Auth errors (500)
│   │   │   └── Generic errors (500)
│   │   └── Return JSON response
│   │
│   └── Error Handling
│       ├── Log to console
│       ├── Check error type
│       └── Return appropriate message
│
├── package.json
│   └── Dependencies:
│       ├── express
│       ├── nodemailer
│       ├── cors
│       ├── dotenv
│       └── email-validator
│
├── .env.example
│   ├── EMAIL
│   ├── APP_PASSWORD
│   ├── PORT
│   ├── NODE_ENV
│   └── FRONTEND_URL
│
├── .env (CREATE LOCALLY)
│   └── Actual credentials
│
└── .gitignore
    ├── node_modules/
    ├── .env
    └── logs/
```

---

## 🔐 Security Architecture

```
INPUT SECURITY:
┌─────────────────────────────────────────────────┐
│ Frontend Validation                              │
│ ├─ Email format check                           │
│ ├─ Length validation                            │
│ └─ Trimming whitespace                          │
│ (User feedback, UX improvement)                 │
└─────────────────────────────────────────────────┘
                    ↓
             (Send to backend)
                    ↓
┌─────────────────────────────────────────────────┐
│ Backend Validation (Defense in Depth)           │
│ ├─ CORS check (authorized origin?)              │
│ ├─ JSON parsing (valid JSON?)                   │
│ ├─ Required fields (all present?)               │
│ ├─ Length validation (within limits?)           │
│ ├─ Email-validator library (RFC compliant?)     │
│ └─ URL validation (valid URL format?)           │
│ (Security, prevent abuse)                       │
└─────────────────────────────────────────────────┘

CREDENTIAL SECURITY:
┌─────────────────────────────────────────────────┐
│ Environment Variables                           │
│ ├─ EMAIL (in .env)                             │
│ ├─ APP_PASSWORD (in .env, NOT real password)   │
│ ├─ FRONTEND_URL (in .env, controls CORS)       │
│ └─ Never in code or git                        │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ Gmail App Password (NOT account password)       │
│ ├─ Generated by Google Account                 │
│ ├─ Limited to Mail access only                 │
│ ├─ Can be revoked anytime                      │
│ └─ Safe even if exposed                        │
└─────────────────────────────────────────────────┘

ERROR SECURITY:
┌─────────────────────────────────────────────────┐
│ Error Messages                                  │
│ ├─ Frontend: User-friendly messages            │
│ ├─ Backend: Detailed logs (never to client)    │
│ ├─ Response: Generic error (no system info)    │
│ └─ Example: "Failed to send. Try again later"  │
│   (Not: "SMTP connection refused" or paths)    │
└─────────────────────────────────────────────────┘

CORS SECURITY:
┌─────────────────────────────────────────────────┐
│ CORS Configuration                              │
│ ├─ Whitelist FRONTEND_URL only                 │
│ ├─ Local: http://localhost:5173               │
│ ├─ Prod: https://your-domain.com              │
│ └─ Blocks unauthorized cross-origin requests   │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

```
DEVELOPMENT:
┌─────────────┐         ┌──────────────┐
│ localhost   │        │ localhost    │
│ :5173       │◀─────▶ │ :5000        │
│ (Frontend)  │ HTTP   │ (Backend)    │
└─────────────┘         └──────────────┘
        ▲
        │ http://localhost:5173
        │ Accessible only locally

PRODUCTION:
┌──────────────────┐       ┌──────────────────┐       ┌──────────┐
│ vercel.app       │       │ onrender.com     │       │ Gmail    │
│ (Frontend)       │──────▶│ (Backend)        │──────▶│ SMTP     │
│ HTTPS/CDN        │HTTPS  │ Node.js/Express  │SMTP   │ (Email)  │
└──────────────────┘       └──────────────────┘       └──────────┘
     ▲                           ▲
     │                           │
     └───────────────────────────┘
     VITE_API_URL=https://backend-url
     FRONTEND_URL=https://frontend-url
```

---

## 📊 Database-less Architecture

```
No Database Needed! ✓

REQUEST FLOW:
┌────────────┐
│ User Form  │
└────────────┘
      ↓
┌─────────────────────┐
│ Validation          │
│ (No DB needed)      │
└─────────────────────┘
      ↓
┌─────────────────────┐
│ Email Format        │
│ (In memory)         │
└─────────────────────┘
      ↓
┌─────────────────────┐
│ Send to Gmail       │
│ (External service)  │
└─────────────────────┘
      ↓
┌─────────────────────┐
│ Email in inbox      │
│ (Gmail storage)     │
└─────────────────────┘

All processing happens in-memory!
Email storage is in Gmail.
No database required.
No server-side storage needed.
```

---

## 🔄 State Management

```
Contact.jsx Component State:

formData = {
  name: "",           ← User input
  email: "",          ← User input
  website: "",        ← User input
  message: ""         ← User input
}
      │
      └─ Updates on input change
         setFormData({ ...prev, [name]: value })

isLoading = false   ← Show/hide loading
      │
      ├─ false (ready to accept submission)
      ├─ true (submitting to backend)
      └─ false (received response)

toast = {
  visible: false      ← Show/hide toast
  message: "",        ← Toast text
  type: "success"     ← "success" | "error" | "info"
}
      │
      ├─ Show on submit
      ├─ Auto-hide after 3 seconds
      └─ Manual hide on close
```

---

## 🧪 Test Scenarios

```
TEST CASE 1: Happy Path
├─ User fills all fields correctly
├─ Click submit
├─ Backend sends email successfully
├─ Frontend shows success toast
└─ Form resets

TEST CASE 2: Validation Error (Frontend)
├─ User enters short message (< 10 chars)
├─ Click submit
├─ Frontend validation catches error
├─ Shows error toast (no backend call)
└─ Form NOT cleared

TEST CASE 3: Validation Error (Backend)
├─ Frontend validation passes
├─ User modifies email to invalid (via DevTools)
├─ Backend validation catches error
├─ Returns 400 error
├─ Frontend shows error toast
└─ Form NOT cleared

TEST CASE 4: Network Error
├─ Frontend submit → No response from backend
├─ Axios timeout after 10 seconds
├─ Frontend catches error
├─ Shows network error toast
└─ Form NOT cleared, can retry

TEST CASE 5: Email Service Error
├─ All validations pass
├─ Nodemailer fails (Gmail auth error)
├─ Backend returns 500 error
├─ Frontend shows error toast
└─ User can retry
```

---

## 📈 Performance Flow

```
FRONTEND RESPONSE TIME:
Input validation          ← 1-10ms (instant)
  ↓
Form disable              ← <1ms
  ↓
HTTP request overhead     ← 50-200ms (network)
  ↓
Wait for backend          ← 500-2000ms (email send)
  ↓
Response processing       ← 10-50ms
  ↓
Toast & form reset        ← 50-100ms
  │
└─ TOTAL: 600-2350ms (typically < 1 second)

BACKEND RESPONSE TIME:
CORS check                ← <1ms
  ↓
JSON parsing              ← <1ms
  ↓
Validation                ← 5-50ms
  ↓
Email formatting          ← 1-5ms
  ↓
Gmail SMTP handshake      ← 100-500ms
  ↓
Email transmission        ← 100-1000ms
  ↓
Response send             ← <1ms
  │
└─ TOTAL: 200-1550ms (typically < 1 second)
```

---

## 🎯 Error Handling Flow

```
ERROR CHAIN:

Frontend Error
├─ validation error → Client-side toast
├─ network error → "Check connection" toast
└─ 4xx/5xx response → Error from server toast

Backend Error (Error Caught in Try-Catch)
├─ Validation error
│  └─ Return 400 with specific message
├─ Gmail auth error
│  └─ Return 500 with auth-specific message
├─ General error
│  └─ Return 500 with generic message
└─ All errors:
   ├─ Logged to console
   ├─ JSON response sent
   └─ User sees user-friendly message

Error Message Examples:
Frontend:
  "Please provide a valid email address."
  "Message must be at least 10 characters"
  "Network error. Please check your connection."

Backend (Logged):
  Error: getaddrinfo ENOTFOUND smtp.gmail.com
  Error: Invalid login credentials
  Details for debugging

But User Sees:
  "Failed to send message. Please try again later."
  (Safe, no system info exposed)
```

---

This diagram set should help visualize how all components work together!
