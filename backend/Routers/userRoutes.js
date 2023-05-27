const express = require("express");
const Registeruser = require("../Models/UserSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../MiddleWare/MiddleWareToken")
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    let newUser = await Registeruser.create({
      email,
      password: hashPassword,
      confirmpassword: hashPassword
    });
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      let exists = await Registeruser.findOne({ email });
      if (!exists) {
        return res.status(400).json({ msg: "User Not Found" });
      }
      const isMatch = await bcrypt.compare(password, exists.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      let payload = {
        user: {
          id: exists.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, msg: "Login Successfully" });
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
  
})
router.get("/profile", middleware, async (req, res) => {
    try {
      const user = await Registeruser.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Exclude sensitive information like password
      res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  });
module.exports = router;
