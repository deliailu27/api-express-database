const express = require("express");
const router = express.Router();
const db = require("../../db");

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

module.exports = router;
