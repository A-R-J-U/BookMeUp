import router from "express";
import {
  signup,
  signin,
  signout,
  getUser,
  verifyEmail,
} from "../Controllers/auth.js";
import { verify } from "../Middleware/Auth_middleware.js";

const userRouter = router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/signout", verify, signout);
userRouter.get("/", verify, getUser);
userRouter.get("/verify/:token", verifyEmail);

export default userRouter;
