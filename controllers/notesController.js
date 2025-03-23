// const {
//   fetchNotes,
//   insertNote,
//   updateNote,
//   deleteNote,
// } = require("../models/notesModel");

// const getNotes = async (req, res) => {
//   try {
//     const data = await fetchNotes();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     await insertNote(title, content);
//     res.status(201).json({ message: "Note added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const editNote = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     const { content } = req.body;
//     await updateNote(id, content);
//     res.status(200).json({ message: "Note updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const removeNote = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     await deleteNote(id);
//     res
//       .status(200)
//       .json({ message: `Successfully deleted the note with the id: ${id}` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { getNotes, createNote, editNote, removeNote };
