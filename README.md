# Modern Portfolio & Admin Dashboard

A premium, high-performance portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Firebase**. Featuring a dark-themed, red-and-black aesthetic with a fully functional admin dashboard for real-time content management.

## 🚀 Features

- **Dynamic Content**: Manage projects and professional skills directly from the admin panel.
- **Admin Dashboard**: Secure login area to handle messages, skills, and projects.
- **Real-time Messages**: Contact form integration with instant Firebase updates and admin review system.
- **Modular Sections**: Dedicated sections for Introduction, Skills, Experience, Education, and Projects.
- **Premium UI/UX**: Dark mode aesthetic, smooth transitions, and responsive design.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore, Auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS)
- Firebase Account

### 2. Installation
```bash
git clone <your-repo-url>
cd my-portfolio
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your site.
Access `/dashboard` to manage your portfolio.

## 🔒 Security Rules
To deploy Firestore security rules:
```bash
firebase deploy --only firestore:rules
```

## 📝 License
This project is licensed under the MIT License.
