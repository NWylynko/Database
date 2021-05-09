import Database from "./dist";

(async () => {

  const db = await Database("mysql")

  db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

})()

