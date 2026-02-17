import express, { Router }  from "express";
import {fileURLToPath} from "url";
import path from "path";
import bcrypt from "bcrypt";
import {users} from "../server.js"
import jwt from "jsonwebtoken"
import { find_account } from "../database.js";
import { requireAuth, requireNoAuth } from "../auth.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(express.urlencoded({extended: false}))

router.get("/login", requireNoAuth, (req, res) => {
    res.render(path.join(__dirname, "..", "views", "login.ejs"))
})

router.get("/register", requireNoAuth, (req, res) =>{
    res.render(path.join(__dirname, "..", "views", "register.ejs"))
})

router.get("/profile", requireAuth, (req, res) =>{
    const name = req.user.first_name
    res.render(path.join(__dirname, "..", "views", "profile.ejs"), {name})
})

router.post('/register', requireNoAuth, async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)


        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email, 
            password: hashedPassword,
        }

        users.push(user)

        res.redirect('/user/login')
    } catch (error) {
        console.log(error)
        res.status(500).redirect('/user/register');
    }
    console.log(users)
})

router.post("/login", requireNoAuth, async (req, res) =>{
    const user = users.find(user => req.body.email === user.email)
    console.log(user)
    if (!user || !(await bcrypt.compare(req.body.password, user.password))){
        return res.render("../views/login.ejs", {error: "Invalid credentials"})
    }

    const token = jwt.sign({ 
        id: user.customer_id,
        first_name: user.first_name,
        last_name: user.last_name
    },
         process.env.ACCESS_SECRET_TOKEN,
        {expiresIn: "1min"});

    res.cookie("token", token, {httpOnly: true});
    res.redirect('/');
})

router.get("/logout", requireAuth, async (req, res) =>{
    res.clearCookie("token")
    return res.redirect("/")
})

export default router;