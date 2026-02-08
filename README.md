

# SomoLink AI 

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Open-source, AI-powered connectivity and learning platform that provides solar-driven internet access, cached educational content, and real-time analytics for schools and surrounding communities across Africa.

---

## Project Structure

```
.
├── somolink frontend/   # Vite frontend project
├── SomoLink backend/   # Java Spring Boot backend project
└── README.md
```

---

## Overview

SomoLink AI enables reliable connectivity and educational resources for remote communities using solar-powered internet and AI-driven analytics. The platform consists of two main components:

### Frontend
* **Framework:** Vite
* **Responsibilities:**
    * User interface for students, teachers, and admins
    * Visualization of real-time analytics
    * Consumption of backend APIs
      **Setup:**
```bash
cd somolink frontend
# install dependencies
# start development server
```
### Backend
* **Framework:** Java Spring Boot
* **Database:** PostgreSQL v17
* **Responsibilities:**
    * API endpoints for frontend consumption
    * Authentication and authorization
    * Data persistence and retrieval
    * Real-time analytics and caching educational content
    * Integration with Mikrotik devices for connectivity

**Setup:**
```bash 
cd SomoLink backend 
# install dependencies 
# start backend service 
```
### Backend Dependencies
* Spring Boot Starters: web, security, validation, data JPA, data MongoDB, configuration processor
* Database: PostgreSQL (runtime)
* Security: Spring Security, JWT (jjwt-api, jjwt-impl, jjwt-jackson)
* Networking: Mikrotik Java library, Apache HttpClient, OkHttp, Commons Net
* Utilities: BouncyCastle, Apache Commons Text, Lombok (optional)
* Testing: Spring Boot starter test, Spring Security test
