import express from "express";
import {register,login,logout} from "../controllers/user.controller.js"
import { loginValidation, registerValidation } from "../validations/user.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validUser } from "../middlewares/authUser.middleware.js";
const router=express.Router();

router
    .route("/register")
    .post(validate(registerValidation),register)

router 
    .route("/login")
    .post(validate(loginValidation),login)

router
    .route("/logout")
    .get(validUser,logout)

export default router;