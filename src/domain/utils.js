/*
function buildWhereClause(sql, columns, constraint = "AND") {
  if (columns.length) {
    sql += " WHERE ";
  }
  const mappedCols = columns.map((col, i) => `${col}=$${i + 1}`);
  return sql + mappedCols.join(`${constraint}`);
}*/

function selector(table, id) {
  let sql = `select * from ${table}`;
  if (id) {
    sql += ` where id =${id}`;
  }

  return sql;
}

module.exports = { selector };
