const mongoose = require('mongoose');

connectdb().catch(err => console.log(err));

async function connectdb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StockBazar');
  console.log("connected to db");
}
module.exports=connectdb;