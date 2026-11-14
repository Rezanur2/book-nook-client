# 📚 BookNook — A Small Online Library

[![Live Site](https://img.shields.io/badge/Live_Site-Vercel-762F3D?style=for-the-badge&logo=vercel&logoColor=white)](https://booknook-frontend-gray.vercel.app/)
[![Server API](https://img.shields.io/badge/Server_API-Live-1E293B?style=for-the-badge&logo=express&logoColor=white)](https://book-nook-server-swart.vercel.app/)
[![Client Repo](https://img.shields.io/badge/Client_Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rezanur2/book-nook-client)
[![Server Repo](https://img.shields.io/badge/Server_Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rezanur2/book-nook-server)

**BookNook** is a modern, responsive full-stack library management application. Built for book enthusiasts and readers, it provides an intuitive platform to browse rare editions, add new volumes, borrow books with dynamic inventory tracking, and manage personal bookshelves with complete security.

---

## 🌐 Live Deployments & Repository Links

* **Live Client Website:** [https://booknook-frontend-gray.vercel.app](https://booknook-frontend-gray.vercel.app/)
* **Live Server API:** [https://book-nook-server-swart.vercel.app](https://book-nook-server-swart.vercel.app/)
* **Client GitHub Repository:** [https://github.com/Rezanur2/book-nook-client](https://github.com/Rezanur2/book-nook-client)
* **Server GitHub Repository:** [https://github.com/Rezanur2/book-nook-server](https://github.com/Rezanur2/book-nook-server)

---

## ✨ Key Features

1. **🔐 Authentication & User Registration**
   * Email and password registration with client-side password strength validation (minimum 6 characters, uppercase, and lowercase requirement).
   * Seamless **Google OAuth 2.0** single sign-on with automatic redirect and status notifications.
   * Secure session management powered by **BetterAuth** and JWT verification across private routes.

2. **📖 Book Catalog & Instant Categorization**
   * Responsive catalog showcasing book cover, author, category, available copies, and creation timestamp.
   * Dynamic category filter pills (`All`, `Fiction`, `Science`, `History`, `Kids`, `Others`) for instant client-side filtering.
   * Detailed book view with real-time stock status badges (`Available` vs `Waitlist`).

3. **🤝 Interactive Borrow & Return System**
   * **Borrow Modal:** Authenticated users can borrow books by selecting a return date.
   * **Stock Integrity:** Automatically decrements `availableCopies` in real-time and prevents double borrowing of the same volume by the same user.
   * **My Borrows Dashboard:** Dedicated dashboard displaying all active borrowed books with both **Borrow Date** and **Return Date** badges.
   * **Return Book:** One-click return functionality that removes the borrow record and automatically increments available copies.

4. **✍️ User Book Management (My Books)**
   * Private dashboard showing only the volumes contributed by the logged-in reader.
   * **Update Book:** In-place modal dialog to edit title, author, category, copies, cover image, and description.
   * **Safe Deletion:** Custom `AlertDialog` confirmation modal (no default browser alerts) to safely delete books from both the UI and database.

5. **🎨 Archival Aesthetic & Mobile-First UI**
   * Warm literary theme styled with warm paper tones, vellum cards, and Playfair serif typography.
   * Hero slider with auto-advancing slides and book details.
   * Custom branded 404 Not Found page with a direct "Back to Home" navigation button.
   * Fully responsive across mobile smartphones, tablets, laptops, and ultra-wide displays.

---

## 🛠️ Technology Stack & Dependencies

### Client (Frontend)
* **Framework:** Next.js 16 (App Router, Turbopack) & React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4, DaisyUI v5
* **Components & UI:** Base UI, Lucide React icons
* **Slider:** Swiper
* **Authentication:** BetterAuth Client (`better-auth`)

### Server (Backend)
* **Runtime:** Node.js
* **Framework:** Express.js (v5)
* **Database:** MongoDB Native Driver
* **Token Verification:** `jose` (JWT verification)
* **Utilities:** CORS, Dotenv

---

## 🚀 Local Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.18 or higher recommended)
* [npm](https://www.npmjs.com/)
* Active [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the Repositories
```bash
git clone https://github.com/Rezanur2/book-nook-client.git
git clone https://github.com/Rezanur2/book-nook-server.git
```

### 2. Configure Environment Variables

#### Client Configuration (`book-nook-client/.env`):
```env
NEXT_PUBLIC_SERVER_URL=https://book-nook-server-swart.vercel.app
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_uri
```

#### Server Configuration (`book-nook-server/.env`):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
BETTER_AUTH_SECRET=your_auth_secret_key
```

### 3. Run Locally

#### Start the Server:
```bash
cd book-nook-server
npm install
node index.js
```

#### Start the Client:
```bash
cd book-nook-client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the library.

---

## 📄 License
This project is open-source and created for educational purposes.
