const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const db = require("../../db");
const { response } = require("../server");

const { getAll, getbyID, createNewEntry } = require("../domain/routerMethods");

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
  const bookToDeleteSql = `select * from books where id =${req.params.id}`;
  const sqlQuery = `delete from books where id=${req.params.id}`;
  const result = await db.query(bookToDeleteSql);
  res.status(201).json(result.rows);
  db.query(sqlQuery);
});

module.exports = router;
