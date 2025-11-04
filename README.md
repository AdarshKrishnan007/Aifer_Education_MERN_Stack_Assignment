# 📝 Task Manager App (MERN Stack)

A simple and secure **Task Manager App** built with the **MERN stack** that allows users to register, log in, and manage their daily tasks privately.

---

## Features

-  **User Authentication** using JWT & bcrypt  
-  Add,  Edit,  Delete,  Mark tasks as completed  
-  Filter & Search (All / Completed / Pending)  
-  Completed percentage progress bar  
-  Responsive and clean UI  

---

##  Tech Stack

 Frontend - React, Axios, React Router 
 Backend - Node.js, Express 
 Database - MongoDB (Mongoose) 
 Auth - JWT, bcrypt 
 Env Config - dotenv 

---

##  Setup Instructions

###  Clone the Repository
    
    git clone https://github.com/AdarshKrishnan007/Aifer_Education_MERN_Stack_Assignment.git
    cd Aifer_Education_MERN_Stack_Assignment

###  Backend Setup
    
    cd backend
    npm install

    Create a .env file inside the server folder:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000

    Run the backend:
    npm start or npm run dev

Your backend runs on http://localhost:5000

###  Frontend Setup
    
      cd frontend
      npm install

      Create a .env file inside the client folder:
      REACT_APP_API_URL=http://localhost:5000/api

      Run the frontend:
      npm start
      
Your frontend runs on http://localhost:3000

###  Author
  
  Adarshkrishnan P
    
  Email: adarshkrishnanpalayil@gmail.com
    
  GitHub: https://github.com/AdarshKrishnan007
    
  LinkedIn: https://www.linkedin.com/in/adarshkrishnanp/






