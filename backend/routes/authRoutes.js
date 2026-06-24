import {Router} from "express";
import { login, logout, register, test,me, google, callbackGoogle } from "../controllers/authController.js";

const router=Router();
// console.log(Router)

router.post("/login",login);
router.post("/logout",logout);
router.post("/register",register);

router.get("/test",test);
router.get("/me",me);
router.get("/google",google);
router.get("/callback/google",callbackGoogle);

export default router;