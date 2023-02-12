const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
