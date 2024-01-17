const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an E-Mail"],
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please add a valid E-Mail",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a password"],
      minlength: [8, "password must have at least eight(8) characters"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character",
      ],
    },
    role: {
      type: Number,
      default: 0, //regular user - 1 admin user
    },
  },
  { timestamps: true }
);
// encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// verify password
userSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

// get token
userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 86400 //24h in seconds
    })
}

module.exports = mongoose.model("User", userSchema);


// OAuth2
/* const oauthUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('oauthUser', oauthUserSchema); */
