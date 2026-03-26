
Welcome to my portfolio project! TaskFlow is a full-stack task management web application built to be clean, responsive, and efficient. I built this to demonstrate my understanding of modern web development and industry standards.

Tech Stack -

Frontend:
- React (Vite)
- Tailwind CSS
- Shadcn/ui (custom tailored components with an 8px grid system)
- Recharts for dashboard analytics
- Lucide React for crisp iconography

Backend:
- Node.js & Express
- MongoDB with Mongoose (with proper indexing on `userId`)
- JSON Web Tokens (JWT) for secure authentication
- Bcrypt.js for password hashing

 How to Run

1- Clone & Setup:
   Ensure you have Node.js installed.
   
2- Backend Execution:
   Navigate into the `/backend` folder.
   Ensure there is a `.env` file one level up (or inside the backend folder) with `PORT`, `DB_CONNECT_STRING`, and `JWT_KEY`.
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3- Frontend Execution:
   Navigate into the `/frontend` folder in a separate terminal.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

API Endpoints

Authentication (`/api/auth`)
- `POST /register` - Register a new user (`email`, `password`)
- `POST /login` - Authenticate an existing user

 Tasks (`/api/tasks`)
All task routes require a valid JWT Bearer token in the `Authorization` header.*
- `GET /` - Retrieve tasks for the logged-in user. 
  - Query Params: `status`, `priority`, `search` (case-insensitive), `sortBy` (`dueDate`, `priority`), `page` (default: 1), `limit` (default: 10).
  - Response: `{ tasks, total, page, pages }`
- `POST /` - Create a new task.
- `PUT /:id` - Update an existing task.
- `DELETE /:id` - Delete a task.
 
Challenges I Overcame:

Building this project taught me a lot about connecting the frontend to the backend seamlessly. 

One of the main challenges was JWT implementation. Initially, I struggled with how to persist state across page reloads. I learned to utilize the React Context API to manage the global authentication state, storing the token in `localStorage` and automatically attaching it to standard Axios headers. This provided a really clean DX and solved the issue gracefully.

Another challenge was the complex filtering logic on the dashboard. At first, I was fetching all tasks and filtering them using plain JavaScript array methods on the client. I quickly realized that as the app grows, this isn't scalable. I rewrote the backend `taskController` to consume `req.query` parameters and utilize Mongoose's powerful querying capabilities (including case-insensitive regex for search). This made the UI much faster and offloaded the heavy lifting to the database.

*Thanks for checking out my work! Let me know if you have any feedback.*
