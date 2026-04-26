const Entry = require("../models/entryModel");
const validator = require("validator");
const classifyMood = require("../utils/classifyMood");
const mongoose = require("mongoose");

const classifyMoodEntry = async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) return res.status(422).json({ message: "Content required." });
  try {
    const mood = await classifyMood(content);
    res.status(200).json({ mood });
  } catch (err) {
    res.status(500).json({ message: "Mood classification failed." });
  }
};

const createEntry = async (req, res) => {
  const { date, title, content, mood } = req.body;
  const loggedUser = req.user;

  if (!title || !content)
    return res
      .status(422)
      .json({ message: "Please submit with required fields!" });

  if (!validator.isDate(date)) {
    return res.status(422).json({
      message: "Please provide a valid date!",
    });
  }

  if (title.length > 20) {
    return res.status(422).json({
      message: "Title length should not be more than 20 characters!",
    });
  }

  if (content.length > 1500) {
    return res.status(422).json({
      message: "Content length should not be more than 1500 characters",
    });
  }

  try {
    const saveEntry = await Entry.create({
      createdBy: loggedUser._id,
      date,
      title,
      mood: mood || "🙂",
      content,
    });

    res.status(201).json({
      message: "Entry added successfully.",
      saveEntry,
    });
  } catch (error) {
    console.error("Error adding entry.: ", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const getEntries = async (req, res) => {
  const loggedUser = req.user;

  try {
    const entries = await Entry.find({ createdBy: loggedUser._id })
      .populate("createdBy", "firstName lastName")
      .sort({ date: -1 });

    res
      .status(200)
      .json({ message: "Entries fetched successfully.", data: entries });
  } catch (error) {
    console.error("Error fetching entries!: ", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const getEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findOne({
      _id: entryId,
      createdBy: loggedUser._id,
    }).populate("createdBy", "firstName lastName");

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or does not belong to the logged-in user.",
      });
    }

    res
      .status(200)
      .json({ message: "Entry fetched successfully.", data: entry });
  } catch (error) {
    console.error("Error fetching this entry.: ", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const updateEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;
  const { date, title, content, mood } = req.body;

  if (!title || !content)
    return res
      .status(422)
      .json({ message: "Please submit with required fields!" });

  if (!validator.isDate(date)) {
    return res.status(422).json({
      message: "Please provide a valid date!",
    });
  }

  if (title.length > 20) {
    return res.status(422).json({
      message: "Title length should not be more than 20 characters!",
    });
  }

  if (content.length > 1500) {
    return res.status(422).json({
      message: "Content length should not be more than 1500 characters",
    });
  }

  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: entryId, createdBy: loggedUser._id },
      { date, title, content, mood: mood || "🙂" },
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or not updated due to permissions!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry updated successfully.", data: entry });
  } catch (error) {
    console.error("Error updating this entry.: ", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const bulkDeleteEntries = async (req, res) => {
  const loggedUser = req.user;
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(422).json({ message: "No entry IDs provided." });

  try {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    const result = await Entry.deleteMany({
      _id: { $in: objectIds },
      createdBy: loggedUser._id,
    });
    res.status(200).json({ message: `${result.deletedCount} entries deleted.` });
  } catch (error) {
    console.error("Error bulk deleting entries:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

const deleteEntry = async (req, res) => {
  const loggedUser = req.user;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findOneAndDelete({
      _id: entryId,
      createdBy: loggedUser._id,
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found or not deleted due to permissions!",
      });
    }

    res
      .status(200)
      .json({ message: "Entry deleted successfully.", data: entry });
  } catch (error) {
    console.error("Error deleting this entry.: ", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const searchEntries = async (req, res) => {
  const loggedUser = req.user;
  const queryText = req.query.text;

  if (!queryText?.trim()) {
    return res.status(400).json({ message: "Search text is required." });
  }

  if (queryText.length > 100) {
    return res
      .status(422)
      .json({ message: "Search string cannot exceed 100 charactere." });
  }

  try {
    const entries = await Entry.find({
      $and: [
        {
          $or: [
            { title: { $regex: queryText, $options: "i" } },
            { content: { $regex: queryText, $options: "i" } },
          ],
        },
        { createdBy: loggedUser._id },
      ],
    }).sort({ date: -1 });

    res.status(200).json({
      message:
        entries.length === 0
          ? "No entries found."
          : "Entries fetched successfully.",
      data: entries,
    });
  } catch (error) {
    console.error("Error searching the entry.", error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = {
  classifyMoodEntry,
  createEntry,
  bulkDeleteEntries,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  searchEntries,
};
