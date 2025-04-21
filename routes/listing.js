const express = require("express");
const router =express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}= require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get( wrapAsync(listingController.index))//index route
 .post(isLoggedIn,//create route
   
    upload.single('listing[image]'),
    validateListing,
     wrapAsync(listingController.createListing )
);



//New route
router.get("/new",isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing))//show route
.put( isLoggedIn,isOwner,upload.single('listing[image]'),
    validateListing, wrapAsync(listingController.updateListing))//update route (ctrl+d for same multiple changing)
.delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));//DELETE Route


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm)
);


module.exports = router;
