# Kanban Board App

A full-stack Kanban board application built with **React** (frontend) and **Strapi** (backend). This app allows users to manage projects and tasks using a drag-and-drop Kanban interface.

---

## Live Demo

Try the app here:  
👉 [Live demo](https://sunny-lebkuchen-82113c.netlify.app/)

---

### Hosting & Deployment

- **Frontend:** Deployed on [Netlify](https://www.netlify.com/)  
- **Backend:** Powered by [Render](https://render.com/)  

---

## Features

- **Project Management:** Create, view, and delete projects.
- **Task Management:** Add, edit, delete, and move tasks between statuses (columns).
- **Kanban Board:** Drag-and-drop tasks between columns.
- **Backlog:** View and manage tasks not yet assigned to a status.
- **Pagination:** Paginate backlog tasks for large projects.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Strapi

---

## Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/pgm-2425-programming-4/final-project-casverheye
cd final-project-casverheye
```


## Folder Structure

```
final-project-casverheye/
│
├── client/Jammin/         # React frontend
│
└── server/                # Strapi backend
```


### 2. Install Dependencies

#### Frontend

```bash
cd client/Jammin
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3. Run the Backend (Strapi)

```bash
cd server
npm run develop
```

- The Strapi admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin).

### 4. Run the Frontend (React)

```bash
cd client/Jammin
npm run dev
```

- The React app will be available at [http://localhost:5173](http://localhost:5173).

---


## Author

Cas Verheye as part of an assignment for a programming course at Arteveldehogeschool.
