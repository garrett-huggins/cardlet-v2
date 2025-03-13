# Cardlet V2

This is the second version of Cardlet, a simple Quizlet clone that allows users to create, study, and share flashcards. This version includes a new design, improved functionality, and a more user-friendly interface.

> The [first version](https://github.com/garrett-huggins/cardlet) was created as a project for a college course. This version was created as a personal project to improve my skills as a developer and to create a more polished product.

## Features

- Create, edit, and delete flashcards
- Study flashcards using a simple interface
- Share flashcards with other users (via a unique id)

## Technologies

### Frontend

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)

### Backend

- [Supabase](https://supabase.io/)
- [Clerk](https://clerk.dev/)

## Development

### Requirements

- [Node.js](https://nodejs.org/) (v18.18 or higher)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/garrett-huggins/cardlet-v2.git
```

2. Install the dependencies:

```bash
cd cardlet-v2
npm install
```

3. Create a `.env` file in the root directory and copy the contents of `.env.example` into it. Fill in the required values.

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
