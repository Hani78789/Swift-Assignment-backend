# Node.js Backend Assignment

A simple Node.js web server with REST APIs using MongoDB for storing user, post, and comment data.

## Setup Instructions

1. **Prerequisites**:
   - Node.js (latest LTS version)
   - MongoDB (running locally on default port 27017)

2. **Install dependencies**:
   ```bash
   npm install


   ## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=node_assignment

# Server Configuration
PORT=3000

# JSONPlaceholder API Base URL
API_BASE_URL=https://jsonplaceholder.typicode.com