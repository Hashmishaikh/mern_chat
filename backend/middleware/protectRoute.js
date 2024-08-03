import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;
    const authHeader = req.headers.authorization;
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ error: "Unauthorized - no token provided" });
    // }
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res
          .status(401)
          .json({ error: "Unauthorized - no token provided" });
      }
    
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no token provided" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error in protected route middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
