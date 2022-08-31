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

async function deleteEntry(table, req, res) {
  const entryToDeleteSql = `select * from ${table} where id =${req.params.id}`;
  const sqlQuery = `delete from ${table} where id=${req.params.id}`;
  const result = await db.query(entryToDeleteSql);
  res.status(201).json(result.rows);
  db.query(sqlQuery);
}

async function updateEntry(table, req, res) {
  let sqlQuery = `update ${table} set `;
  for (const key in req.body) {
    sqlQuery += `${key}="${req.body[key]}",`;
  }

  sqlQuery = sqlQuery.slice(0, -1) + ` where id=${req.params.id}`;
  console.log(sqlQuery);
  db.query(sqlQuery);
  const entryToUpdateSql = `select * from ${table} where id =${req.params.id}`;
  console.log(req.body);
  const result = await db.query(entryToUpdateSql);
  res.status(201).json(result.rows);
}

module.exports = { getAll, getbyID, createNewEntry, deleteEntry, updateEntry };
