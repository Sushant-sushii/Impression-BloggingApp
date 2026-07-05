# Impression Blog App

A full-stack blogging application built with React, Vite, Express, and MongoDB.

## Features
- User registration and login
- Create, view, and delete blog posts
- Personal My Blogs section
- Logout flow with cookie-based session handling

## Local development

### Frontend
1. Open the Frontend folder
2. Install dependencies with `npm install`
3. Start the app with `npm run dev`

### Backend
1. Open the Backend folder
2. Install dependencies with `npm install`
3. Create a `.env` file with at least:
   - `MONGO_URI`
   - `JWT_SECRET`
4. Start the API with `npm run dev`

## Environment variables

### Frontend
Set the following variable in Vercel:
- `VITE_BASE_URL`: the public URL of your backend API

### Backend
Set the following variables in Vercel or your hosting platform:
- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional)

## Vercel deployment

### Frontend
1. Import the Frontend folder into Vercel
2. Use the build command: `npm run build`
3. Use the output directory: `dist`
4. Add the `VITE_BASE_URL` environment variable

### Backend
The Backend folder now includes a Vercel-compatible server entry file for deployment as a Node API.
