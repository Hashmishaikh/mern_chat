import User from "../model/user.model.js";

export const getUsersSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //that $ne is used so all user will be listed except the current or logged in user which is you
    res.status(200).json(filterUsers)
  } catch (error) {
    console.log("Error in getusersidebar controller ", error.message);
    res.send(500).json({ error: "Internal Server Error" });
  }
};
