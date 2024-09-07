require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const DatabaseConnection = require("./database/db");
const Userschema = require("./models/user.model");
const GoogleUser = require("./models/google.user");

const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const OAuth2oStrategy = require("passport-google-oauth20").Strategy;

//Google Oauth2.O
const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

app.use(cors());

app.use(express.json()); // Parse incoming requests with JSON payloads

app.use(express.urlencoded({ extended: true }));

//Setup Session  -> it will create a id in encrypted from, when we do google login.
app.use(
  session({
    secret: "1ase258fgv9qw3fbi5opjnbg581fcbui",
    resave: false,
    saveUninitialized: true,
  })
);

//Setup Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2oStrategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile Value: ", profile);

      try {
        let availUser = await GoogleUser.findOne({ googleId: profile.id });

        if (!availUser) {
          availUser = new GoogleUser({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await availUser.save();
        }
        return done(null, availUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((availUser, done) => {
  done(null, availUser);
});

passport.deserializeUser((availUser, done) => {
  done(null, availUser);
});

// initialize auth google login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/",
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

// SIGNUP
app.post(
  "/api/auth/signup",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      const existingUser = await Userschema.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Userschema({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ msg: "Account created successfully" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ msg: "Server error. Please try again later." });
    }
  }
);

// LOGIN
app.post(
  "/api/auth/login",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await Userschema.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // If credentials are correct, generate a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token with a secret key (you can define a secret key in your .env file)
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "Login successful" });
        }
      );
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ msg: "Server error. Please try again later." });
    }
  }
);

// Database Connection
DatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  });
