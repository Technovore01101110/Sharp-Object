import express, { Router }  from "express";
import {fileURLToPath} from "url";
import path from "path";
import { json } from "stream/consumers";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', async (req, res) =>{
    const page = Number(req.query.page) || 1;
    const search = req.query.k;
    const limit = 10;
    let offset;


    if (page == undefined){
        offset = 0;
    } else{
        offset = (page - 1) * 10;
    }

    // Get count of products.
    let countRes;

    if (search == undefined){
        countRes = await fetch("http://127.0.0.1:3500/api/products/count");
    } else{
        countRes = await fetch(`http://127.0.0.1:3500/api/products/count?k=${search}`)
    }
    const countDict = await countRes.json();
    const count = countDict.count

    const totalPages = Math.ceil(count / limit);

    if (page > totalPages) {
        return res.redirect(`/products?page=${totalPages}`);
    }
    if (page < 1) {
        return res.redirect(`/products?page=1`)
    }

    // Get the product page data.
    let product_data;

    if(search != undefined){
        product_data = await fetch(`http://127.0.0.1:3500/api/products?offset=${offset}&limit=${limit}&key=${search}`)
    }else {
        product_data = await fetch(`http://127.0.0.1:3500/api/products?offset=${offset}&limit=${limit}`);
    }
    
    const products = await product_data.json()
    console.log(products)
    products.forEach(product => {
        product.cost = Number(product.cost).toFixed(2);
    });

    // Return data, page number, and total pages.
    res.status(202).render(path.join(__dirname, "..", "views", "products.ejs"), { products, page, totalPages })
})

export default router;