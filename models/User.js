const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  instagramId: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  referenceCode: { type: String, unique: true },
  referrers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  generatedReferenceCodes: [
    {
      code: { type: String },
      expired: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
