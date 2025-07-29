# Courses Frontend – IIT Bombay Internship

This is the frontend of the **Courses Management System** developed as part of the IIT Bombay Full Stack Internship Assignment. The frontend is built using **ReactJS** and communicates with a Java Spring Boot backend.

## 🖥️ Technologies Used

- ReactJS (with functional components)
- React Router DOM
- Axios
- Tailwind CSS
- REST API Integration


## 🚀 How to Run the Application

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Run Locally

```bash
# Clone the repository
git clone https://github.com/siddheshm303/courses-frontend-iitb.git
cd courses-frontend-iitb

# Install dependencies
npm install

# Start the development server
npm start
```
Frontend will be available at:
http://localhost:5173/

⚠️ Make sure your backend (Spring Boot) is running at http://localhost:8080/api/<endpoints>.

## 🐳 Docker (Optional for Deployment)
To build a Docker image for the frontend:
```bash
# Build production build
npm run build

# Then use the Dockerfile to create an image
docker build -t siddheshm303/courses-frontend .

# Or use docker-compose
docker-compose up --build
```

## 🧑‍💻 Author
### Siddhesh Vilas Mulik

📧 siddheshm303@gmail.com

🌍 Thane, Maharashtra

🌐 GitHub Profile

## 📜 License
This project is for educational/internship purposes only.


---

