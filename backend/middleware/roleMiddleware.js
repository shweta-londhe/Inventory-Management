const User = require("../models/User");

const adminOnly = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message:
          "Admin Access Required",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = adminOnly;