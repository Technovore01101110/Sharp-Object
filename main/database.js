import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
}).promise()

// const result = await pool.query("SELECT * FROM customer")
// 

async function insert(){
    const result = await pool.query()
}

export async function get_table(table) {
    const customer_data = await pool.query(`SELECT * FROM ${table}`)
    const customer_info = customer_data[0]
    // console.log(`Hello, ${customer_info.first_name} ${customer_info.last_name}`)

    return customer_data[0];
}

export async function get_featured_products(limit){
    const product_data = await pool.query(`SELECT name, ROUND(cost, 2) AS cost,CASE WHEN amount = 0 THEN "Out"
                                           WHEN amount <= 100 THEN CONCAT(amount, " left")
                                           ELSE "High" END AS stock 
                                           FROM product
                                           ORDER BY rating LIMIT ${limit}`)
    return product_data[0];
}

export async function get_products(offset, limit, key = null){
    let data;
    
    if (key != null){
        const tokens = key.split(" ").filter(Boolean);
        const likeClauses = tokens.map(() => `name LIKE ?`).join(" OR ");
        const params = tokens.map(t => `%${t}%`);

        data = await pool.query(`SELECT name, cost,CASE WHEN amount = 0 THEN "Out"
                                   WHEN amount <= 100 THEN CONCAT(amount, " left")
                                   ELSE "High" END AS stock 
                                   FROM product
                                   WHERE ${likeClauses}
                                   ORDER BY rating LIMIT ${limit} OFFSET ${offset}`, params)
    } else {
    data = await pool.query(`SELECT name, cost,CASE WHEN amount = 0 THEN "Out"
                                   WHEN amount <= 100 THEN CONCAT(amount, " left")
                                   ELSE "High" END AS stock 
                                   FROM product
                                   ORDER BY rating LIMIT ${limit} OFFSET ${offset}`)
    }
    return data[0];
}

export async function get_product_count(search = null){
    let data;
    
    if(search == null){
        data = await pool.query(`SELECT COUNT(*) AS count FROM product`)
    } else {
        const tokens = search.split(" ").filter(Boolean);
        console.log(`Tokens: ${tokens}`)
        const likeClauses = tokens.map(() => `name LIKE ?`).join(" OR ");
        const params = tokens.map(t => `%${t}%`);

        data = await pool.query(`SELECT COUNT(*) AS count FROM product WHERE ${likeClauses}`, params)
    }

    return data[0]

}

// console.log(`Customer name: ${customer_data[first_name]} ${customer_data[last_name]}`)