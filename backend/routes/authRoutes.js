import {Router} from "express";
import { login, logout, register, test,me, fetchtoken } from "../controllers/authController.js";

const router=Router();
// console.log(Router)

router.post("/login",login);
router.post("/logout",logout);
router.post("/register",register);
router.get("/test",test);
router.get("/me",me);
router.post("/fetchtoken",fetchtoken);

export default router;