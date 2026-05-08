const Listing = require("../models/listing");

module.exports.index = async(req , res) => { //index
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
};

module.exports.renderNewForm = (req , res) => { // new 
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req , res) => { //show listing
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
          path: "author",
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error" , "Listing you requested for does not exist") ;
         return res.redirect("/listings");
    }
    res.render("listings/show.ejs" , {listing});

};

// module.exports.createListing = async(req , res , next) => {  //create listing
//     let url = req.file.path; 
//     let filename = req.file.filename;
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = {url , filename};
//     await newListing.save();
//     req.flash("success" , "New Listing Created!");
//     res.redirect("/listings");
// };

const axios = require("axios");
module.exports.createListing = async (req, res) => {
    try {

        console.log("🔥 createListing HIT");

        // 📍 location
        const location = req.body.listing.location;

        // 🖼️ IMAGE SAFETY CHECK
        if (!req.file) {
            console.log("❌ No image uploaded");
            req.flash("error", "Image upload failed!");
            return res.redirect("/listings/new");
        }

        const url = req.file.path;
        const filename = req.file.filename;

        // 🌍 Geocoding API
        let geometry = undefined;

        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${location}&format=json`,
                {
                    headers: {
                        "User-Agent": "AirbnbClone/1.0"
                    }
                }
            );

            const data = response.data;

            if (data && data.length > 0) {
                const lon = parseFloat(data[0].lon);
                const lat = parseFloat(data[0].lat);

                geometry = {
                    type: "Point",
                    coordinates: [lon, lat]
                };
            } else {
                console.log("❌ No location found in API");
            }

        } catch (geoErr) {
            console.log("❌ Geocoding failed:", geoErr.message);
        }

        // 🏠 CREATE LISTING
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        if (geometry) {
            newListing.geometry = geometry;
        }

        await newListing.save();

        // 🔥 SUCCESS LOG
        console.log("=== SAVED SUCCESSFULLY ===");
        console.log("TITLE:", newListing.title);
        console.log("IMAGE:", newListing.image);
        console.log("GEOMETRY:", newListing.geometry);

        // 🎉 FLASH SUCCESS
        req.flash("success", "New Listing Created!");

        res.redirect("/listings");

    } catch (err) {
        console.error("ERROR:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error" , "Listing you requested for does not exist") ;
         return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" , "/upload/w_250")
    res.render("listings/edit.ejs", { listing , originalImageUrl });
};

module.exports.updateListing = async(req , res) => {  // update listing
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
     
    if (typeof req.file !== "undefined") {
    let url = req.file.path; 
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();

    }

     req.flash("success" , "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req , res , next) => {  //delete listing
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
     req.flash("success" , "Listing Deleted!");
    res.redirect("/listings");

}

module.exports.searchListing = async(req , res) => {
    const searchText = req.query.search;
    const listings = await Listing.find({

        $or: [
            {
                country:  {
                   $regex: searchText,
                   $options: "i",
            }
        },
        {
            location: {
                $regex: searchText,
                $options: "i",
            }
        }

        ]
    });

    res.render("listings/search.ejs" , {listings});
}