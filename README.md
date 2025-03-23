# Notes API

A simple RESTful API for managing personal notes, built with Node.js and Supabase.

## Features

- Create, read, update, and delete notes
- Organize notes with tags
- Search notes by content or tags

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Supabase](https://supabase.com/) account and project setup

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/artslimedev/notes-api.git
   cd notes-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

   Replace `your_supabase_url` and `your_supabase_key` with your actual Supabase project credentials.

4. Start the server:

   ```bash
   node server.js
   ```

   The API will be accessible at `http://localhost:3000`.

## API Endpoints

- `GET /api/notes` - Retrieve all notes
- `POST /api/addNote` - Create a new note
- `PUT /api/updateNote/:id` - Create a new note
- `DELETE /api/deleteNote/:id` - Delete a specific note by ID

## Database Schema

The notes are stored in a Supabase table with the following structure:

- `id` (UUID): Primary key
- `title` (string): Title of the note
- `content` (text): Content of the note
- `tags` (array of strings): Tags associated with the note
- `created_at` (timestamp): Timestamp of when the note was created
- `updated_at` (timestamp): Timestamp of the last update to the note

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of requests. In case of errors, the response includes a JSON object with an `error` field describing the issue.

## Logging

The server logs incoming requests and errors to the console for debugging purposes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
