const app = require("./app");
const connection = require("./db/connections");

const port = process.env.PORT || 8081;

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(console.log(err.message));
    process.exit(1);
  });
