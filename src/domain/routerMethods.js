const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const db = require("../../db");
const { response } = require("../server");

const { selector } = require("./utils");

async function getAll(table, req, res) {
  let sqlQuery = selector(table);
  const params = [];
  if (req.query.type) {
    sqlQuery += " WHERE type = $1";
    params.push(req.query.type);
  }

  console.log(sqlQuery);
  const qResult = await db.query(sqlQuery, params);
  res.json({ books: qResult.rows });
}

async function getbyID(table, id, req, res) {
  const sqlQuery = selector(table, id);
  console.log("query:", sqlQuery);
  const result = await db.query(sqlQuery);
  console.log("result:", result);
  res.json(result.rows);
}

async function createNewEntry(table, req, res) {
  const Values = Object.values(req.body).map((value) => {
    return `'${value}'`;
  });

  const newEntry = { ...req.body };
  console.log("new entry", newEntry);
  console.log("object values:", Object.values(req.body));
  let sqlQuery = `insert into ${table} (${Object.keys(
    req.body
  ).toString()}) values (${Values})`;

  console.log("query:", sqlQuery);
  await db.query(sqlQuery);
  res.status(201).json(newEntry);
}

module.exports = { getAll, getbyID, createNewEntry };
