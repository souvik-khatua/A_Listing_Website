const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData= require("./data.js");
//const nesting = require("../models/listing");
const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{    //calling main fn
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){  //connecting with db
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"67fa198a428473ac8919eaa9"}) );
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();