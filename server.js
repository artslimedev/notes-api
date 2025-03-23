import http from "http";
import url from "url";
import { createClient } from "@supabase/supabase-js";

const dbUrl = process.env.DB_URL;
const dbKey = process.env.DB_KEY;
const PORT = process.env.PORT;

const supabase = createClient(dbUrl, dbKey);

const fetchNotes = async () => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) {
    throw new Error("Could not find notes");
  }
  return data;
};

const createNote = async (body) => {
  const { title, content } = JSON.parse(body);
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content }]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const updateNote = async (body, id) => {
  const { title, content } = JSON.parse(body);
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;

  const { data, error } = await supabase
    .from("notes")
    .update(updateData)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const deleteNote = async (id) => {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      if (req.method === "GET" && parsedUrl.pathname === "/api/notes") {
        const data = await fetchNotes();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
        return;
      }

      if (req.method === "POST" && parsedUrl.pathname === "/api/addNote") {
        await createNote(body);
        const updatedNotes = await fetchNotes();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedNotes));
        return;
      }

      if (
        req.method === "PUT" &&
        parsedUrl.pathname.startsWith("/api/updateNote/")
      ) {
        const id = parsedUrl.pathname.split("/")[3];
        await updateNote(body, id);
        const updatedNotes = await fetchNotes();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedNotes));
        return;
      }

      if (
        req.method === "DELETE" &&
        parsedUrl.pathname.startsWith("/api/deleteNote/")
      ) {
        const deletedId = parsedUrl.pathname.split("/")[3];
        await deleteNote(deletedId);
        const updatedNotes = await fetchNotes();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedNotes));
        return;
      }

      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "This route is invalid" }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
