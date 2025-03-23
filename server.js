import http from "http";
import url from "url";
import { createClient } from "@supabase/supabase-js";

const dbURL = process.env.DB_URL;
const dbKey = process.env.DB_KEY;
const PORT = process.env.PORT;

const supabase = createClient(dbURL, dbKey);

const fetchNotes = async () => {
  const { data, error } = await supabase.from("notes").select("*");

  if (error) {
    console.log("Supabase error:", error);
    return null;
  }

  return data;
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
        console.log("Received GET request for /api/notes");
        const data = await fetchNotes();

        if (!data) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Failed to fetch notes" }));
          return;
        }

        console.log("Received notes data:", data);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
        return;
      }

      if (req.method === "POST" && parsedUrl.pathname === "/api/addNote") {
        const { title, content } = JSON.parse(body);
        console.log("Inserting note into database...");

        const { error } = await supabase
          .from("notes")
          .insert([{ title, content }]);

        if (error) {
          console.log("Supabase error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
          return;
        }

        console.log("Note added successfully");
        const updatedNotes = await fetchNotes(); // Fetch updated notes
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedNotes));
        return;
      }

      if (
        req.method === "PATCH" &&
        parsedUrl.pathname.startsWith("/api/updateNote/")
      ) {
        const id = parsedUrl.pathname.split("/")[3];
        const { content } = JSON.parse(body);
        console.log("Updating note in database...");

        const { error } = await supabase
          .from("notes")
          .update({ content })
          .eq("id", id);

        if (error) {
          console.log("Supabase error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
          return;
        }

        console.log("Note updated successfully");
        const updatedNotes = await fetchNotes(); // Fetch updated notes
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedNotes));
        return;
      }

      if (
        req.method === "DELETE" &&
        parsedUrl.pathname.startsWith("/api/deleteNote/")
      ) {
        const deleteId = parsedUrl.pathname.split("/")[3];

        console.log("Deleting the note...");
        const { error } = await supabase
          .from("notes")
          .delete()
          .eq("id", deleteId);

        if (error) {
          console.log("Supabase error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
          return;
        }

        console.log("Note successfully deleted");
        res.statusCode = 200;
        await fetchNotes();
        res.end(`Successfully deleted the note with the id: ${deleteId}`);
        return;
      }

      // Handle unsupported routes
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Route not found" }));
    } catch (error) {
      console.error("Server error:", error);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
