import express, { Router }  from "express";
import {fileURLToPath} from "url";
import path from "path";
import { json } from "stream/consumers";
import bcrypt from "bcrypt";

const users = []
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.use(express.urlencoded({extended: false}))


router.get("/login", (req, res) =>{
    res.render(path.join(__dirname, "..", "views", "login.ejs"))
})

router.get("/register", (req, res) =>{
    res.render(path.join(__dirname, "..", "views", "register.ejs"))
})

router.get("/profile", (req, res) =>{

})

router.post('/register', async (req, res) =>{
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

router.post("/login", async (req, res)=>{
    const user = users.find(user => user.name = req.body.name)
    if (user == null){
        return res.status(400).send('Cannot find User')
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        } else{
            res.send('Failed')
        }
    } catch (error){
        console.log(error)
        res.status(500).send()
    }
})

export default router;