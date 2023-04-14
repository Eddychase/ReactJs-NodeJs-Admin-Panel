import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (!decoded || !decoded.id) {
  throw new Error("Invalid token");
}

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      req.user = {};
      return next(createError(403, "Token is not valid!"));
    }

    req.user = decoded;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized!" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized!" });
    }
  });
};
