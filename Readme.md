🔹 1. Introduction

GitHub is one of the most widely used platforms for open-source collaboration. However, exploring repositories efficiently can be time-consuming. The GitHub Project Explorer is a full-stack web application designed to simplify repository search, analysis, and management.

This project provides users with:

Repository search by name, language, and stars

Interactive data visualizations for repository insights

Ability to bookmark repositories and add personal notes

🔹 2. Objectives

Build a responsive web app with modern frontend technologies.

Integrate GitHub API to fetch repository data.

Provide data visualization for better insights.

Implement bookmarking and note-taking functionality using a backend database.

Deploy the app on reliable cloud platforms for public access.

🔹 3. Technologies Used
Frontend

React.js – Component-based UI library

TailwindCSS – Utility-first CSS framework for styling

React Hooks – State & lifecycle management

Backend

Node.js – Runtime environment

Express.js – Web framework for REST APIs

MongoDB Atlas – NoSQL database for bookmarks & notes

Deployment

Render – Hosting backend & database connection

Vercel – Hosting frontend (React app)

Other Tools

Chart.js & React-ChartJS-2 – Data visualization (Pie, Bar, Line charts)

GitHub REST API – Repository data fetching

Git – Version control

🔹 4. System Architecture

Frontend (React + Tailwind)

User searches repositories

Displays results & charts in modal views

Allows bookmarking & note-taking

Backend (Node + Express + MongoDB)

Handles API requests for bookmarks & notes

Stores data in MongoDB Atlas

Acts as middleware between frontend and database

External API

GitHub REST API provides repository data

🔹 5. Features

✅ Search repositories by name, language, stars
✅ Display repo details in modal view
✅ Interactive charts (Languages, Issues/PRs, Weekly Commits)
✅ Bookmark repositories
✅ Add/edit notes to saved bookmarks
✅ Responsive design for mobile & desktop
✅ Full-stack deployment (Render + Vercel)

🔹 6. Results

Successfully deployed frontend & backend.

Application runs seamlessly with real-time GitHub data.

Bookmarks and notes are stored persistently in MongoDB.

Charts provide clear repository insights.

🔹 7. Challenges & Solutions

Issue: Mismatch between saveBookmark and addBookmark caused deployment errors.
Solution: Fixed import/export consistency and redeployed.

Issue: Environment variables not loading on Vercel.
Solution: Configured VITE_API_URL properly in Vercel settings.

Issue: ChartJS hook errors.
Solution: Properly registered ChartJS elements in main.jsx.

🔹 8. Future Enhancements

Add authentication (GitHub/Google login).

Pagination & infinite scrolling for repo search.

Dark mode support.

Export bookmarks to PDF/CSV.

Deploy with custom domain.

🔹 9. Conclusion

The GitHub Project Explorer demonstrates the power of combining frontend, backend, and third-party APIs to deliver a complete full-stack solution. It not only showcases technical skills in React, Node.js, MongoDB, and deployment but also solves a real-world problem for developers who explore GitHub frequently.