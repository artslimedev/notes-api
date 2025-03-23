// const { createClient } = require("@supabase/supabase-js");

// const supabaseURL = process.env.DB_URL;
// const supabaseKey = process.env.DB_KEY;
// const supabase = createClient(supabaseURL, supabaseKey);

// const fetchNotes = async () => {
//   const { data, error } = await supabase.from("notes").select("*");
//   if (error) throw error;
//   return data;
// };

// const insertNote = async (title, content) => {
//   const { error } = await supabase.from("notes").insert([{ title, content }]);
//   if (error) throw error;
// };

// const updateNote = async (id, content) => {
//   const { error } = await supabase
//     .from("notes")
//     .update({ content })
//     .eq("id", id);
//   if (error) throw error;
// };

// const deleteNote = async (id) => {
//   const { error } = await supabase.from("notes").delete().eq("id", id);
//   if (error) throw error;
// };

// module.exports = { fetchNotes, insertNote, updateNote, deleteNote };
