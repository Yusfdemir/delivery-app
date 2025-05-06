const passport = require("passport");
const categoryController = require("../controllers/categoryController")

module.exports = (app)=>{
    app.post('/api/categories/create',passport.authenticate('jwt',{session:false}), categoryController.create);
    
    app.get('/api/categories/getAll',categoryController.getAll)
}