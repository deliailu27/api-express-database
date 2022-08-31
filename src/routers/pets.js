const express = require("express");
const router = express.Router();
const db = require("../../db");

const {
  getAll,
  getbyID,
  createNewEntry,
  deleteEntry,
  updateEntry,
} = require("../domain/routerMethods");

router.get("/", async (req, res) => {
  getAll("pets", req, res);
});

router.get("/:id", async (req, res) => {
  getbyID("pets", req.params.id, req, res);
});

router.post("/", async (req, res) => {
  createNewEntry("pets", req, res);
});

router.delete("/:id", async (req, res) => {
  deleteEntry("pets,req,res");
});

router.put("/:id", async (req, res) => updateEntry("pets", req, res));

module.exports = router;
