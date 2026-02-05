import express, { Router }  from "express";
import {fileURLToPath} from "url";
import path from "path";
import { json } from "stream/consumers";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', async (req, res) =>{
    const page = req.query.page;
    const search = req.query.k;
    // const filter = req.query.filter;
    let offset;


    if (page == undefined || page == 1){
        offset = 0;
    } else{
        offset = (page - 1) * 10;
    }

    let product_data;

    if(search != undefined){
        product_data = await fetch(`http://127.0.0.1:3500/api/products?offset=${offset}&limit=10&key=${search}`)
    }else {
        product_data = await fetch(`http://127.0.0.1:3500/api/products?offset=${offset}&limit=10`);
    }
    
    
    const products = await product_data.json()



    res.status(202).render(path.join(__dirname, "..", "views", "products.ejs"), { products })
})

export default router;