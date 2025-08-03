# 🧠 MERN Task Distribution Dashboard

A full-stack MERN app for admins to upload a CSV of tasks and automatically distribute them among 5 agents.

## 🚀 Features

- 🔐 Admin login with JWT authentication
- 👤 Agent creation and listing
- 📤 CSV upload for tasks
- ⚙️ Auto-distribution of tasks to 5 agents
- 📋 View distributed tasks in a dashboard

## 🛠 Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens (JWT)
- **File Upload:** Multer

## 📁 Project Structure
project-root/
│
├── admin/ # React frontend
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── .env # Environment variables
├── server.js # Entry point
└── README.md

## 🔧 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Rathod-1122/Agents-Task-Distribution
   cd Agents-Task-Distribution

2. **Install backend dependencies:**
   npm install

3. **Start Server:**
   node server.js

4. **Build Front End And Start:**
   cd admin
   npm install
   Start the front end with this command : npm start
   



