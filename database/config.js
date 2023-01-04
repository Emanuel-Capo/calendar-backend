const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("error al inicializar la BD");
  }
};

module.exports = {
  dbConection
};
