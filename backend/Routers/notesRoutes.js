const express = require("express");
const notesSchema = require("../Models/NoteSchema");
const router = express.Router();
const authenticate = require("../MiddleWare/MiddleWareToken");

router.use(express.json());

// Protected routes
router.post("/notes", authenticate, async (req, res) => {
  try {
    const note = await notesSchema.create(req.body);
    res.status(201).send({ note });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getNotes", authenticate, async (req, res) => {
  try {
    const notes = await notesSchema.find();
    res.status(200).send({ notes });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getNotes/:id", authenticate, async (req, res) => {
  try {
    const note = await notesSchema.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ note });
  } catch (err) {
    res.status(400).send(err);
  }
});


router.delete("/deleteNotes/:id", authenticate, async (req, res) => {
  try {
    const note = await notesSchema.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ note, msg: "Deleted Successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/updateNotes/:id", authenticate, async (req, res) => {
  try {
    const note = await notesSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ note, msg: "Updated Successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
