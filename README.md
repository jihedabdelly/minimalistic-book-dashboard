# Minimalistic Book Dashboard

The application allows users to manage a list of books via a simple dashboard with authentication.

## 🚀 Live Demo
- **Frontend (React on Netlify):** [Live App](https://graceful-gumption-44f224.netlify.app/)
- **Backend (NestJS on Render):** [API](https://minimalistic-book-dashboard.onrender.com)

## 🛠 Tech Stack
### **Frontend:**
- React (with TypeScript)
- Apollo Client (GraphQL)
- Chakra UI (for UI components)
- Auth0 (for authentication)
- Netlify (deployment)

### **Backend:**
- NestJS (with TypeScript)
- GraphQL (Apollo Server)
- TypeORM (SQLite for database)
- Auth0 (JWT-based authentication)
- Render (deployment)

## 🔥 Features
- User authentication via **Auth0**
- CRUD operations for managing books
- **GraphQL API** for efficient data fetching
- **Dark/Light mode toggle** for better UI experience
- **Fully deployed frontend & backend** for easy access
- **Responsive UI** for all screens sizes


## 📜 API Endpoints (GraphQL)
- **`getBooks`** → Fetch all books
- **`addBook(name, description)`** → Add a new book
- **`updateBook(id, name, description)`** → Edit a book
- **`deleteBook(id)`** → Remove a book

