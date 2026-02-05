import express  from "express";
import {fileURLToPath} from "url";
import path from "path";
import {get_featured_products} from "../database.mjs"
import {get_products} from "../database.mjs"
const router = express.Router();

router.get("/products/featured", async (req, res) => {
    const products = await get_featured_products(5);
    console.log(products);
    res.status(202).json(products);
})

router.get("/products", async (req, res) =>{
    const limit = req.query.limit;
    const offset = req.query.offset;
    const key = req.query.key;
    
    let products;

    if (key != undefined){
        products = await get_products(offset, limit, key)
    } else{
        products = await get_products(offset, limit)
    }
    res.json(products)

})

export default router;