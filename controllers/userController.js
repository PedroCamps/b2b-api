const User = require("../models/User");

const generateReferenceCode = () => {
  return Math.random().toString(36).substring(2, 10);
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, telephone, instagramId, dob, gender, referenceCode } =
      req.body;
console.log(referenceCode);
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Ensure referenceCode is provided
    if (!referenceCode) {
      return res.status(400).json({ message: "Reference code is required" });
    }

    let referrers = [];
    let generatedReferenceCodes = [];

    const referrer = await User.findOne({
      "generatedReferenceCodes.code": referenceCode,
      "generatedReferenceCodes.expired": false,
    });

    if (referrer) {
      referrer.generatedReferenceCodes = referrer.generatedReferenceCodes.map(
        (codeObj) =>
          codeObj.code === referenceCode
            ? { ...codeObj, expired: true }
            : codeObj
      );
      await referrer.save();
      referrers.push(referrer._id);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid or expired reference code" });
    }

    const code1 = generateReferenceCode();
    const code2 = generateReferenceCode();
    generatedReferenceCodes.push({ code: code1 }, { code: code2 });

    const newUser = new User({
      name,
      email,
      telephone,
      instagramId,
      dob,
      gender,
      referenceCode,
      referrers,
      generatedReferenceCodes,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("referrers");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
