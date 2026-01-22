

// Main Dynamics

// nav dynamics

function toggle_nav(){
    let nav = document.getElementById("navbar")
    let menu_button = document.getElementById("menu_button")
    nav.classList.toggle("open");
}

const nav = document.getElementById("nav-wrapper")
const nav_offset = nav.offsetTop;
const hero = document.getElementById("hero")
const banner = document.getElementById("banner")
const contact_page = document.getElementById("contact_page")


function toggle_sticky(){
    if (window.pageYOffset >= nav_offset){
        nav.classList.add('sticky')
        console.log(nav_offset)
        if (hero) {
            hero.classList.add('sticky')
        } else if (banner) {
            banner.classList.add('sticky')
        } else if(contact_page){
            contact_page.classList.add('sticky')
        }
    } else {
        nav.classList.remove('sticky')
        if (hero) {
            hero.classList.remove('sticky')
        } else if (banner) {
            banner.classList.remove('sticky')
        } else if(contact_page){
            contact_page.classList.remove('sticky')
        }
        
        
    }
}

window.addEventListener('scroll', toggle_sticky)
document.getElementById("menu_button").addEventListener("click", toggle_nav)