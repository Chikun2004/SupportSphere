# SupportSphere Backend Documentation

## Overview
SupportSphere's backend is built with Node.js, Express, and MongoDB, providing a robust API for the support ticket management system. It integrates with Supabase for authentication and real-time features.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- Supabase
- JSON Web Tokens (JWT)

## Project Structure
```
server/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Ticket.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tickets.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── .env
└── package.json
```

## Database Schema

### User Model
```javascript
{
  email: String,
  name: String,
  role: String,
  supabaseId: String,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Ticket Model
```javascript
{
  title: String,
  description: String,
  status: String,
  priority: String,
  category: String,
  createdBy: ObjectId,
  assignedTo: ObjectId,
  messages: [{
    sender: ObjectId,
    content: String,
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes
```
POST /api/auth/register
- Register a new user
- Body: { email, password, name, role }
- Returns: User object with token

POST /api/auth/login
- Login user
- Body: { email, password }
- Returns: User object with token

GET /api/auth/me
- Get current user details
- Requires: Authorization header
- Returns: User object

POST /api/auth/resend-verification
- Resend email verification
- Body: { email }
- Returns: Success message
```

### Ticket Routes
```
GET /api/tickets
- Get all tickets (filtered by user role)
- Query params: status, priority, category
- Returns: Array of tickets

POST /api/tickets
- Create new ticket
- Body: { title, description, priority, category }
- Returns: Created ticket

GET /api/tickets/:id
- Get ticket details
- Returns: Ticket object

PUT /api/tickets/:id
- Update ticket
- Body: { status, priority, assignedTo }
- Returns: Updated ticket

POST /api/tickets/:id/messages
- Add message to ticket
- Body: { content }
- Returns: Updated ticket
```

### User Routes
```
GET /api/users
- Get all users (admin only)
- Returns: Array of users

GET /api/users/:id
- Get user details
- Returns: User object

PUT /api/users/:id
- Update user details
- Body: { name, role }
- Returns: Updated user
```

## WebSocket Events

### Server Events
```
'connection' - Client connected
'disconnect' - Client disconnected
'join_room' - Join ticket room
'leave_room' - Leave ticket room
'message' - New message in ticket
```

### Client Events
```
'message' - Receive new message
'ticket_updated' - Ticket status/details updated
'error' - Error event
```

## Environment Variables
Create a `.env` file in the server directory with:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/supportSphere
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Authentication Flow
1. User registers with email/password
2. Verification email sent via Supabase
3. User verifies email by clicking link
4. User can now login
5. JWT token issued upon login
6. Token used for subsequent API requests

## Error Handling
- Standard error responses
- HTTP status codes
- Detailed error messages
- Validation errors

## Middleware

### Authentication Middleware
- Verifies JWT tokens
- Handles role-based access
- Manages user sessions

### Error Handling Middleware
- Catches and formats errors
- Logs errors
- Sends appropriate responses

## Security Measures
1. Password hashing (via Supabase)
2. JWT authentication
3. Rate limiting
4. CORS configuration
5. Input validation
6. Error sanitization

## Database Operations
- Mongoose models and schemas
- Indexing for performance
- Data validation
- Relationship handling

## WebSocket Implementation
- Real-time updates
- Room-based communication
- Event handling
- Connection management

## Deployment
1. Set environment variables
2. Configure MongoDB connection
3. Setup Supabase project
4. Configure email service
5. Setup SSL/TLS
6. Configure CORS

## Best Practices
1. Use async/await
2. Implement proper error handling
3. Follow RESTful conventions
4. Maintain code documentation
5. Use proper logging
6. Implement security measures
7. Handle edge cases
8. Follow Node.js best practices
