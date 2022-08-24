const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const db = require("../../db");
const { response } = require("../server");

router.get("/", async (req, res) => {
  console.log("type", req.query.type);
  let sqlQuery = "select * from books";
  const params = [];
  if (req.query.type) {
    sqlQuery += " WHERE type = $1";
    params.push(req.query.type);
  }

  console.log(sqlQuery);
  const qResult = await db.query(sqlQuery, params);
  res.json({ books: qResult.rows });
});

router.get("/:id", async (req, res) => {
  const sqlQuery = `select * from books where id = ${req.params.id}`;
  console.log("query:", sqlQuery);
  const result = await db.query(sqlQuery);
  console.log("result:", result);
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const newBook = { ...req.body };
  console.log("newBook:", newBook);
  let sqlQuery = `insert into books(title, type, author, topic, publicationDate, pages) values ('${newBook.title}','${newBook.type}','${newBook.author}','${newBook.topic}','${newBook.publicationdate}',${newBook.pages})`;
  console.log("query:", sqlQuery);
  await db.query(sqlQuery);
  res.status(201).json(newBook);
});

router.delete("/:id", async (req, res) => {
  const bookToDeleteSql = `select * from books where id =${req.params.id}`;
  const sqlQuery = `delete from books where id=${req.params.id}`;
  const result = await db.query(bookToDeleteSql);
  res.status(201).json(result.rows);
  db.query(sqlQuery);
});

module.exports = router;
