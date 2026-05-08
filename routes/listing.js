const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.get("/search" , wrapAsync(ListingController.searchListing)); // search route 

router.route("/")
.get(wrapAsync(ListingController.index)) //index route
.post(isLoggedIn,  
  upload.single("image"),
  validateListing , 
  (ListingController.createListing)); //create route


//new route
router.get("/new" , isLoggedIn, ListingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(ListingController.showListing)) //show individual route
.put(isLoggedIn , isOwner , upload.single("image"), validateListing, wrapAsync(ListingController.updateListing)) //update route
.delete(isLoggedIn, isOwner , wrapAsync(ListingController.destroyListing)); //delete route


//edit route
router.get("/:id/edit", isLoggedIn, isOwner ,ListingController.renderEditForm);

module.exports = router;
