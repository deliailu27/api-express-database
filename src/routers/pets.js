const express = require("express");
const router = express.Router();
const db = require("../../db");

const { getAll, getbyID, createNewEntry } = require("../domain/routerMethods");

router.get("/", async (req, res) => {
  getAll("pets", req, res);
});

router.get("/:id", async (req, res) => {
  getbyID("pets", req.params.id, req, res);
});

router.post("/", async (req, res) => {
  createNewEntry("pets", req, res);
});

module.exports = router;
