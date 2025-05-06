const passport = require("passport");
const productController = require("../controllers/productController")

module.exports = (app)=>{
 
    app.get('/api/products/findByCategory/:id_category',productController.findByCategory)
    app.get('/api/products/findByNameAndCategory/:id_category/:name',productController.findByNameAndCategory)
}