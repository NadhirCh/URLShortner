Features
Frontend: Built with Vue.js for a modern, responsive user interface.
Backend: Powered by Node.js with Express for RESTful API functionality.
Database:
MongoDB: Stores URL mappings.
Redis: Caches frequently accessed data for performance.
Dockerized: Easily deployable with Docker Compose.

.
├── frontend/             
│   ├── public/
│   ├── src/
│   ├── Dockerfile          
│   └── package.json
├── backend/                
│   ├── src/
│   ├── Dockerfile         
│   └── package.json
├── docker-compose.yml      

Run the application : 
docker-compose up --build

Access the App:

Frontend: http://localhost:8080
Backend: http://localhost:3000
             

