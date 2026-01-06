🛡️ InsurAI – Corporate Policy Automation System

InsurAI is a full-stack insurance management platform that automates corporate insurance policy creation, validation, claims processing, and renewals using modern web technologies. The system reduces manual effort, improves accuracy, and provides secure role-based access for users, employees, and HR/admins.

📌 Problem Statement

In the insurance industry, corporate clients require customized insurance policies involving multiple manual steps such as:

Policy creation

Validation & compliance checks

Claim processing

Renewal management

Traditional systems rely heavily on documentation and human verification, leading to:

Delays

Errors

Inconsistent policy handling

InsurAI addresses these issues by automating insurance workflows with a secure and scalable architecture.

🎯 Objectives

Automate corporate insurance policy management

Provide secure login and role-based access

Simplify policy application and claim processing

Reduce human errors and processing time

Enable employees to verify and manage policies efficiently

🏗️ System Architecture Frontend (React) ↓ REST API calls Backend (Spring Boot) ↓ JPA / Hibernate Database (MySQL) ↓ JWT Authentication & Authorization

🧑‍💼 User Roles 👤 User

Register & login

Apply for new insurance policies

Upload claim images/documents

View applied and approved policies

👨‍💻 Employee

Login securely

View user policy requests

Verify claims and policies

Update policy status

🛠️ Admin / HR

Manage employees

Monitor system activities

Oversee policies and claims

🔐 Authentication & Security

JWT (JSON Web Token) based authentication

Secure REST APIs

Role-based authorization

Password encryption using BCrypt

Protected routes for employees and users

🛠️ Tech Stack Frontend

React.js

TypeScript

Tailwind CSS

React Router

Axios

Backend

Java

Spring Boot

Spring Security

JWT

JPA / Hibernate

Database

MySQL

Tools

Maven

Git & GitHub

Postman

VS Code

📂 Project Structure InsurAI-Project │ ├── backend │ ├── controller │ ├── service │ ├── repository │ ├── entity │ ├── security │ └── dto │ ├── frontend │ ├── pages │ ├── components │ ├── services │ ├── context │ └── routes │ └── README.md

🔄 Core Features

RESTful API architecture

Secure JWT-based login system

Policy creation and tracking

Claim submission with image upload

Employee verification dashboard

Clean frontend-backend separation

▶️ How to Run the Project Backend (Spring Boot) cd backend mvn clean spring-boot:run

Backend runs on:

http://localhost:8080

Frontend (React) cd frontend npm install npm run dev

Frontend runs on:

http://localhost:5173

🧪 API Testing

Tested using Postman

Endpoints include:

/api/auth/register

/api/auth/login

/api/policies

/api/claims

🚀 Future Enhancements

AI-based policy recommendation system

NLP-powered document verification

Cloud deployment (AWS / Render)

Notification system (Email / SMS)

Advanced analytics dashboard

👨‍🎓 Developer

Pavan Kalyan B.Tech – Computer Science Engineering Business Development Associate Aspiring Full Stack Java Developer

⭐ Conclusion

InsurAI is a secure, scalable, and efficient insurance automation platform that modernizes corporate insurance workflows using Spring Boot, React, REST APIs, and JWT authentication.
  # Enterprise UI Prototype for InsurAI

  This is a code bundle for Enterprise UI Prototype for InsurAI. The original project is available at https://www.figma.com/design/858qtA2VWcMMCJeW5iGhOh/Enterprise-UI-Prototype-for-InsurAI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
