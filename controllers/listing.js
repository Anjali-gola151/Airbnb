const Listing = require("../models/listing");
const axios = require("axios");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};



module.exports.renderNewForm = (req, res) => {  // new form 
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {  // show listing 
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};


module.exports.createListing = async (req, res) => { // create listing 
    try {

        if (!req.file) {
            req.flash("error", "Image required!");
            return res.redirect("/listings/new");
        }

        const url = req.file.path;
        const filename = req.file.filename;

        let newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        // GEOLOCATION
        const location = req.body.listing.location;

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

            if (data.length > 0) {
                newListing.geometry = {
                    type: "Point",
                    coordinates: [
                        parseFloat(data[0].lon),
                        parseFloat(data[0].lat)
                    ]
                };
            }

        } catch (err) {
            console.log("Geo error:", err.message);
        }

        await newListing.save();

        req.flash("success", "Listing created!");
        res.redirect("/listings");

    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};



module.exports.renderEditForm = async (req, res) => { // edit form 
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};



module.exports.updateListing = async (req, res) => { //update listing
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {  // delete listing 
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};



module.exports.searchListing = async (req, res) => {  // search 
    try {
        const searchText = req.query.search;

        const listings = await Listing.find({
            $or: [
                {
                    country: {
                        $regex: searchText,
                        $options: "i"
                    }
                },
                {
                    location: {
                        $regex: searchText,
                        $options: "i"
                    }
                }
            ]
        });

        res.render("listings/search.ejs", { listings });

    } catch (err) {
        console.log(err);
        res.status(500).send("Search Error");
    }
};