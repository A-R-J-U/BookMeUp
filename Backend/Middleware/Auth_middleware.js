import jwt from "jsonwebtoken";

const verify = async (req, res, next) => {
  try {
    const token = req.cookies?.Authorization;

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token found in cookies Login" });

    const authToken = token.split(" ")[1];

    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      req.user = {
        email: decoded.email,
        id: decoded.id,
      };
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "Invalid Token" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

export { verify };
