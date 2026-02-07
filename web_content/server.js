import express  from "express";
import {fileURLToPath} from "url";
import path from "path";
// import { profileEnd } from "console";
import product_Router from "./routes/products.js"
import api_router from "./routes/api.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express('view engine', 'ejs');
const PORT = 3500;

app.set('view engine')

app.use(express.static("public"));
app.use(express.json());
app.use('/api', api_router)

app.get("/", async (req, res) =>{
    const response = await fetch("http://127.0.0.1:3500/api/products/featured")
    const products = await response.json()

    products.forEach(product => {
        product.cost = Number(product.cost).toFixed(2);
    });

    res.status(202).render(path.join(__dirname, "views", "index.ejs"), {products});
})

app.get("/contact", (req, res) =>{
    res.status(202).sendFile(path.join(__dirname, "views", "contact.html"));
})

app.use('/products', product_Router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})