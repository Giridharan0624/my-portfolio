# Agent Development Guide – Next.js + Firebase Portfolio

This file is designed to be used by an **AI coding agent** (Cursor, Copilot Workspace, Devin, Sweep, etc.) to automatically build your portfolio website.

Copy this file into your project root as:

```
AGENT_DEV_GUIDE.md
```

Then tell your agent to: **“Follow AGENT_DEV_GUIDE.md”**

---

## 🎯 Project Goal

Build a production-ready personal portfolio website using:

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Firebase (Auth + Firestore)

The site must be responsive, fast, SEO-friendly, and easy to extend.

---

## 🧱 Core Pages

1. Home `/`
2. About `/about`
3. Projects `/projects`
4. Contact `/contact`
5. Admin Dashboard `/dashboard` (protected)

---

## 📁 Required Folder Structure

The agent MUST generate the following structure:

```
app/
  layout.tsx
  page.tsx
  about/page.tsx
  projects/page.tsx
  contact/page.tsx
  dashboard/page.tsx

components/
  Navbar.tsx
  Footer.tsx
  Hero.tsx
  ProjectCard.tsx
  ContactForm.tsx

firebase/
  config.ts
  auth.ts
  projects.ts

styles/

public/

.env.local.example
```

---

## 🔧 Tech Requirements

### Next.js
- App Router
- Server Components by default
- Client Components where needed

### Styling
- Tailwind CSS
- Mobile-first
- Clean modern layout

### Firebase
- Email/password authentication
- Firestore for projects + messages

---

## 🔐 Firebase Data Models

### Collection: `projects`

```json
{
  "title": "string",
  "description": "string",
  "image": "string",
  "github": "string",
  "demo": "string",
  "tech": ["string"],
  "createdAt": "timestamp"
}
```

### Collection: `messages`

```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "createdAt": "timestamp"
}
```

---

## 🔐 Authentication Rules

- Only authenticated users may access `/dashboard`
- Only authenticated users may write to `projects`
- Anyone may read `projects`
- Anyone may write to `messages`

---

## 🧠 Agent Tasks (Strict Order)

### Phase 1 – Setup

1. Create Next.js project with TypeScript + Tailwind
2. Install Firebase
3. Configure Firebase client
4. Create env template file

---

### Phase 2 – Layout

- Build Navbar
- Build Footer
- Global layout.tsx
- Responsive navigation

---

### Phase 3 – Pages

#### Home
- Hero section
- Skills section
- Featured projects (from Firestore)

#### About
- Static content component

#### Projects
- Fetch all projects from Firestore
- Grid layout using ProjectCard

#### Contact
- ContactForm
- Submit to Firestore
- Show success message

#### Dashboard
- Login screen
- Auth guard
- Create / Delete projects

---

### Phase 4 – Firebase Integration

- Implement project fetch
- Implement contact form submit
- Implement admin CRUD

---

### Phase 5 – Polish

- SEO metadata
- Loading states
- Error handling
- Animations (optional)
- Dark mode (optional)

---

## 🧪 Quality Requirements

The agent must ensure:

- TypeScript strict mode
- No console errors
- ESLint clean
- Mobile responsive
- Lighthouse score > 90

---

## 🔒 Firestore Security Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /messages/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

---

## 📦 Environment Variables Template

Create `.env.local.example`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 🤖 Agent Instructions

When running, the agent should:

- Commit logical steps
- Write clean reusable components
- Prefer server components for data fetching
- Use client components only where required
- Add comments for complex logic

---

## ✅ Completion Criteria

The project is done when:

- All pages render correctly
- Projects load from Firestore
- Contact form stores messages
- Admin dashboard works
- Auth protection works
- App builds without errors

---

## 🧩 Optional Enhancements

- Blog section
- Image upload (Firebase Storage)
- Analytics
- CMS editor
- Multi-language support

---

## 📌 Usage

In your AI agent tool prompt, use:

> Build this project by strictly following AGENT_DEV_GUIDE.md

---

End of file.

