const User = require("../models/user");
const passport = require("passport");


module.exports.renderSignupForm = (req , res) => {
    res.render("users/signup.ejs");

}


module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });
    await User.register(newUser, password);

    // ✅ auto login
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to wanderlust!");
      res.redirect("/listings");
    });

  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req , res) => {
    res.render("users/login.ejs")
}

module.exports.login = async(req, res) => {
    req.flash("success", "welcome to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    req.session.redirectUrl = null;
    res.redirect(redirectUrl);

};


  module.exports.logout = (req , res , next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
            
        }

        req.flash("success" , "You are logged out!");
        res.redirect("/listings");
    })
}