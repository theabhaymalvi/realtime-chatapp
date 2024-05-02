const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const User = require("../models/User")
const dotenv = require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "helloworld";

// 1. Register User
const registerUser = async (req,res) => {
  console.log(req.body);
    const {name, email, password, pic} = req.body;

    // checking existing user
    const user = await User.findOne({email: email});
    if(user) return res.status(400).json({error: "A user is already registered."});

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const payload = await User.create({
        name: name,
        email: email,
        password: encryptedPassword,
        pic: pic,
    });
    if(!payload) return res.status(400).json({error: "Some error occured while storing"});

    // creating authToken to verify user
    const authToken = jwt.sign(payload.toJSON(), JWT_SECRET_KEY);
    console.log(payload, authToken);
    return res.status(200).json({
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      pic: payload.pic,
      status: payload.status,
      token: authToken
    });
}; 

// 2. Logging in User
const loginUser = async (req,res) => {

    try {
        let user = await User.findOne({email: req.body.email});
        // no user with given email found
        if(!user) return res.status(400).json({error: "Please enter correct email address"});
        
        // password matching
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatch) return res.status(400).json({error: "Please enter correct password"});

        console.log(user);

        // creating authToken
        const authToken = jwt.sign(user.toJSON(), JWT_SECRET_KEY);

        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          status: user.status,
          token: authToken,
        });
    } catch (err) {
        res.status(500).json({error: "Internal Server Error"});
    }
};

// 3. Search users using search bar
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

// 4. Update status of user between available and busy
const updateStatus = asyncHandler(async(req, res) => {
  const newStatus = req.body.status;

  if(newStatus != 'Available' && newStatus != 'Busy')
  {
    res.status(400).json("Status value is not allowed");
  }

  const result = await User.updateOne(
    { _id: req.user._id},
    { $set: { status: newStatus}}
  )

  res.json("Status updated successfully");
});

module.exports = {
    registerUser,
    loginUser,
    allUsers,
    updateStatus
};