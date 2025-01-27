# Blogger
Blogger is an AI-driven blogging platform built with cutting-edge technologies to simplify content creation and discovery. With features like personalized recommendations, community engagement, and AI-assisted blogging, it empowers users to share their thoughts and explore trending content effortlessly.

## 🚀 Features
### ✍️ AI-Powered Blogging
Create, edit, and optimize blog posts with the help of Next AI SDK.
### 🌟 Personalized Recommendations
Vector-Based Recommendations: Powered by Neon DB with PostgreSQL and vector search for accurate content suggestions.
Trending Filtering: Discover the latest popular blogs.
### 🔒 Authentication
Secure user authentication with NextAuth and Google Authentication.
### 💬 Community Engagement
Like, comment, and interact with blogs from other users.
### 📊 Performance Insights
Monitor and improve blog performance with real-time analytics.
## 🛠️ Tech Stack
```
Frontend: Next.js
Backend: Next.js API Routes
Database: Neon DB with PostgreSQL (including vector-based search for recommendations)
Authentication: NextAuth with Google Authentication
AI: Next AI SDK for content generation and recommendation systems
Testing: Cypress (end-to-end testing) and Jest (unit and integration testing)
Containerization: Docker
```
# 🖥️ Installation
Prerequisites
Node.js (v16 or later)
Docker installed
PostgreSQL database credentials (Neon DB recommended)
Steps
## Clone the Repository
```bash
git clone https://github.com/Navani001/blogger
cd blogger
```

## Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
#### .env.local
```
GOOGLE_GENERATIVE_AI_API_KEY=<your-google-ai-api-key>
AUTH_GOOGLE_SECRET=<your-google-auth-secret>
AUTH_GOOGLE_ID=<your-google-auth-id>
NEXTAUTH_URL=<your-nextauth-url>
NEXTAUTH_SECRET=<your-nextauth-secret>
AUTH_SECRET=<your-auth-secret>
```

#### .env.development.local
```
DATABASE_URL=<your-database-url>
DATABASE_URL_UNPOOLED=<your-database-url-unpooled>
PGDATABASE=<your-database-name>
PGHOST=<your-database-host>
PGHOST_UNPOOLED=<your-database-host-unpooled>
PGPASSWORD=<your-database-password>
PGUSER=<your-database-user>
POSTGRES_DATABASE=<your-database-name>
POSTGRES_HOST=<your-database-host>
POSTGRES_PASSWORD=<your-database-password>
POSTGRES_PRISMA_URL=<your-prisma-database-url>
POSTGRES_URL=<your-postgres-url>
POSTGRES_URL_NON_POOLING=<your-postgres-url-non-pooling>
POSTGRES_URL_NO_SSL=<your-postgres-url-no-ssl>
POSTGRES_USER=<your-database-user>
```
Use Docker to start the development environment:

```bash
docker-compose up --build
```

## Access the Application
Open your browser and visit:

```bash
http://localhost:3000
```
## 🧪 Testing
### End-to-End Testing with Cypress
Run Cypress tests:

```
npm run cypress
```
### Unit & Integration Testing with Jest
Run Jest tests:
```
npm run test
```
## 📚 Usage
Sign Up: Create an account using Google Authentication.
Create Blogs: Use AI tools to write and publish blogs.
Discover Content: Explore personalized and trending recommendations.
Engage: Like and comment on blogs to connect with the community.
## 📦 Docker
To build and run the Docker container manually:
```bash
docker build -t blogger .  
docker run -p 3000:3000 --env-file .env blogger  
```

## 🤝 Contributing
Contributions are welcome!

### Fork the repository.
Create a new branch:
```bash
git checkout -b feature/your-feature-name
```
Commit your changes:
```
git commit -m "Add your message here"
```
Push to the branch:
```
git push origin feature/your-feature-name
```

Submit a pull request.
Refer to CONTRIBUTING.md for more details.

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 📧 Contact
For support or inquiries, reach out at:
navaneetha2006krishnan@gmail.com

This template is tailored to include all the technologies and workflows you mentioned while being beginner-friendly and concise.

