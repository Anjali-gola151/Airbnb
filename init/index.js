const initData = require("./data.js");
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

async function main () {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main()
.then((res)=> {
   console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

const initDB = async() => {
   await Listing.deleteMany({}); 
    initData.data = initData.data.map((obj) =>({...obj , owner: new mongoose.Types.ObjectId("69e4b81d75bf7f69fd33e875"), }))
 await Listing.insertMany(initData.data); 
    
    console.log("data was innitialize");

}

initDB();