**MWANGI JOSPHAT KARANJA MERN WK 7 ASSIGNMENT - DEBUGING**

# 🐞 MERN Bug Tracker Application

A comprehensive bug tracking system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring testing and debugging capabilities.

mern-bug-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BugCard/
│   │   │   │   ├── BugCard.jsx
│   │   │   │   ├── BugCard.module.css
│   │   │   │   └── BugCard.test.jsx
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   └── ErrorBoundary.test.jsx
│   │   │   ├── FormField/
│   │   │   │   ├── FormField.jsx
│   │   │   │   └── FormField.test.jsx
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.test.jsx
│   │   │   ├── LoadingSpinner/
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── LoadingSpinner.test.jsx
│   │   │   ├── PriorityFilter/
│   │   │   │   ├── PriorityFilter.jsx
│   │   │   │   └── PriorityFilter.test.jsx
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── SearchBar.test.jsx
│   │   │   └── StatusFilter/
│   │   │       ├── StatusFilter.jsx
│   │   │       └── StatusFilter.test.jsx
│   │   ├── pages/
│   │   │   ├── BugFormPage/
│   │   │   │   ├── BugFormPage.jsx
│   │   │   │   └── BugFormPage.test.jsx
│   │   │   ├── BugListPage/
│   │   │   │   ├── BugListPage.jsx
│   │   │   │   └── BugListPage.test.jsx
│   │   │   └── NotFoundPage/
│   │   │       ├── NotFoundPage.jsx
│   │   │       └── NotFoundPage.test.jsx
│   │   ├── services/
│   │   │   ├── bugService.js
│   │   │   └── bugService.test.js
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   └── index.js
│   ├── public/
│   ├── tests/
│   │   └── setupTests.js
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   ├── bugController.js
│   │   └── bugController.test.js
│   ├── models/
│   │   ├── Bug.js
│   │   └── Bug.test.js
│   ├── routes/
│   │   ├── bugRoutes.js
│   │   └── bugRoutes.test.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── errorHandler.test.js
│   ├── tests/
│   │   ├── fixtures/
│   │   │   └── bugs.js
│   │   └── setup.js
│   ├── app.js
│   ├── server.test.js
│   └── package.json
├── .gitignore
└── myReadMe.MD

**Screenshots**

![One](<Screenshot (111).png>)
[Two](<Screenshot (109).png>)
![Three](<Screenshot (110).png>)


## ✨ Features

- **Create, Read, Update, Delete** bug reports
- **Filter bugs** by status and priority
- **Search bugs** by title or description
- **Responsive design** for all screen sizes
- **Comprehensive error handling** with error boundaries
- **Detailed console logging** for debugging
- **Unit and integration tests** for both backend and frontend

## 🚀 Technologies Used

- **Frontend**: React.js (with Vite), React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Testing**: Jest, Supertest, React Testing Library
- **Styling**: CSS Modules (Internal CSS)
- **Build Tool**: Vite

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or cloud-based)


Install backend dependencies:

cd server
npm install-Installs frontend dependencies


cd ../client
npm install
Set up environment variables:
Create a .env file in the server directory:

**Server.env file**
PORT=5000
MONGO_URI=mongodb://localhost:27017/mjkmernbagtrackerdb
Create a .env file in the client directory:


**Client .env file**
VITE_API_URL=http://localhost:5000/api
 

### Steps

1. **Clone the repository:**
   git clone https://github.com/yourusername/mern-bug-tracker.git
   cd mern-bug-tracker

## Conclusion

This MERN Bug Tracker application includes:

1. **Full-stack implementation** with React (Vite), Express.js, Node.js, and MongoDB
2. **Comprehensive testing** with Jest (backend) and React Testing Library (frontend)
3. **Robust error handling** with error boundaries and Express middleware
4. **Beautiful UI** with responsive design and modern styling
5. **Debugging features** including detailed logging and error tracking
6. **Complete documentation** with installation and testing instructions

The application satisfies all requirements from the assignment, including:
- CRUD operations for bugs
- Testing at multiple levels (unit, integration, component)
- Debugging techniques for both frontend and backend
- Error boundary implementation
- Comprehensive documentation

To run the application:
1. Start MongoDB
2. Run backend: `cd server && npm run dev`
3. Run frontend: `cd client && npm run dev`

The application will be accessible at `http://localhost:5173`


**Testing using Node.js console**
Node.js Inspector:
node --inspect server.js

**Testing with chrome inspector**
chrome://inspect in Chrome



**🧪 Running Tests**
 
npm test  # For CLI mode
npm run test:ui  # For GUI mode
npm run test:coverage  # For coverage report

🤝 Contribution
Contributions are welcome! Please open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License.


