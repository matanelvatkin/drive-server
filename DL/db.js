const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const MONGO_URL = "mongodb+srv://matanel:0526193031@cluster0.x4zq8ri.mongodb.net/drive?retryWrites=true&w=majority";

async function connect() {
  try {
    mongoose.connect(
      MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ).then(()=>console.log("db connection Success")).catch(error=>{
      console.log(error);
    throw error;
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { connect };
