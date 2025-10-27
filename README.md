# 🏫 CIT-U Campus Connect: Forum + Lost and Found 🌐

**Campus Connect** is a **Spring Boot + React web system** designed for the **Cebu Institute of Technology – University (CIT-U)** community.  
It serves as a **centralized hub** for campus discussions, announcements, and **Lost & Found management**, helping students stay connected, informed, and engaged.

---

## 💡 Problem Statement

CIT-U students often rely on **scattered Facebook groups, Messenger chats, and word-of-mouth** for updates or lost item recovery.  
This fragmented system leads to:

- ❌ Missed announcements due to **information overload**
- 📱 Lost-and-found posts buried under memes or unrelated content
- 😟 Anxiety when losing IDs, wallets, or gadgets with **no central verification platform**
- 💬 Poor communication between **student organizations, faculty, and students**

---

## 💡 Proposed Solution

To address these issues, **Team AbaTiUr** developed **Campus Connect** —  
a **forum + lost-and-found** web system that consolidates campus interaction into one reliable platform.

### 🎯 Goals
- Centralize **student discussions**, **announcements**, and **lost-and-found** posts  
- Provide a **user-friendly**, **responsive**, and **secure** interface  
- Encourage **community engagement** and faster item recovery  
- Strengthen the connection between students, faculty, and organizations

---

## 🚀 Core Features

- 🧭 **Announcements Feed** – unified hub for campus-wide updates  
- 💬 **Forum Section** – post discussions, organize replies, and connect with peers  
- 🔍 **Lost & Found System** – report and track lost or found items  
- 🔔 **Real-time Notifications** – stay updated instantly  
- 📱 **Responsive Design** – optimized for desktop and mobile  
- 👤 **User Authentication** – secure sign-in for students and staff  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- **React.js** – modern UI library  
- **Tailwind CSS** – responsive and fast styling  
- **Axios** – HTTP client for API integration  

### ⚙️ Backend
- **Spring Boot (Java)** – REST API and business logic  
- **Spring Data JPA + MySQL** – database integration and ORM  
- **Spring Security** – authentication and access control  

### 🌐 Others
- **RESTful API Architecture**
- **Maven Build Tool**
- **GitHub for version control**

---

## 📦 Local Setup

### 🖥️ Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

Access via:
👉 http://localhost:5173
 (or depending on your Vite/React setup)

⚙️ Backend (Spring Boot)

Open the backend folder in your IDE (IntelliJ or Eclipse)

Update application.properties:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/campusconnect
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```
Run the Spring Boot application:
```bash
mvn spring-boot:run
```
The API will run at:
👉 http://localhost:8080/api/

## 👥 Team Members

| Name                             | Role                | CIT-U Email                                |
|----------------------------------|---------------------|--------------------------------------------|
| Treasure Louise S. Abadinas      | Project Manager     | treasurelouise.abadinas@cit.edu            |
| Jay Yan C. Tiongzon              | Backend Developer   | jayyan.tiongzon@cit.edu                    |
| Lichael Yashua E. Ursulo         | Frontend Developer  | lichaelyashua.ursulo@cit.edu               |



