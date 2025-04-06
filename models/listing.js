const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description: String,
    image:{
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zWifWgK-Dbh0IuyJT-LHUnBlgz1j4LQ4Jg&s",
        type:String,
    set:(v) => v ==="" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zWifWgK-Dbh0IuyJT-LHUnBlgz1j4LQ4Jg&s" : v,
    },
    price: { type: Number, default: 0 },
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing)=>{

    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});//mongoose middleware
    }
   
});


const Listing= mongoose.model("Listing", listingSchema);
module.exports= Listing;

