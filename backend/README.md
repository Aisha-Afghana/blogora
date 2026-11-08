# Blogora Backend

A RESTful API for managing blog posts, built with Node.js, Express.js, MongoDB, and Mongoose.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

backend/
├── config/
│ └── db.js
├── model/
│ └── Blog.js
├── routes/
│ └── blogRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js

## Installation

1. Clone the repository.
2. Open the backend folder.
3. Install dependencies:

   npm install

4. Create a `.env` file:

   PORT=5000
   MONGO_URI=your_mongodb_connection_string

5. Start the development server:

   npm run dev

## Database Schema

Each blog contains:

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| title       | String | Yes      |
| author      | String | Yes      |
| topic       | String | No       |
| description | String | Yes      |
| content     | String | Yes      |
| image       | String | Yes      |
| email       | String | No       |

The schema also includes createdAt and updatedAt timestamps.

## API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/blogs     | Get all blogs |
| GET    | /api/blogs/:id | Get one blog  |
| POST   | /api/blogs     | Create a blog |
| PUT    | /api/blogs/:id | Update a blog |
| DELETE | /api/blogs/:id | Delete a blog |

## Error Handling

The API handles:

- Invalid MongoDB IDs
- Blogs that do not exist
- Missing required fields
- Database and server errors

## Server

http://localhost:5000
