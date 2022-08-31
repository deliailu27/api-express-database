const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const db = require("../../db");
const { response } = require("../server");

const {
  getAll,
  getbyID,
  createNewEntry,
  deleteEntry,
  updateEntry,
} = require("../domain/routerMethods");

router.get("/", async (req, res) => {
  getAll("books", req, res);
});

router.get("/:id", async (req, res) => {
  getbyID("books", req.params.id, req, res);
});

router.post("/", async (req, res) => {
  createNewEntry("books", req, res);
});

router.delete("/:id", async (req, res) => {
  deleteEntry("books", req, res);
});

router.put("/:id", async (req, res) => updateEntry("books", req, res));

module.exports = router;
