async function get_products(){
    const response = await fetch('/api/products/featured')
    const product_data = await response.json()


    
    let html = ``

    for (let i_product = 0; i_product < product_data.length; i_product++){
        const product_info = product_data[i_product]
        html += product_template("/images/NO_Image.png", 'No Image', product_info.name,
                                 product_info.cost, product_info.stock)
    }


    console.log(html)

    const product_sect = document.getElementById('hproducts')

    product_sect.innerHTML = html
}

function product_template(image_path, alternate, product_name, product_price,
                          stock)
{
    const template = `
    <section class="product">
        <img src="${image_path}" alt="${alternate}">
        <a href="#"><h3>${product_name}</h3></a>
        <div class="product_info">
            <h4>${stock}</h4>
            <h4>${product_price}</h4>
        </div>
    </section>
    `

    return template
}

get_products();