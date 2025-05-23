import { Router } from "express";
import { loginUser, myProfile, registerUser } from "./controller";
import { isAuth } from "./middleware";

const router = Router();
router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/profile',isAuth, myProfile)

export default router