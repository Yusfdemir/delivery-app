const db = require("../config/config")

const Product = {};

Product.findByCategory = (id_category, result)=>{
    const sql = `
        SELECT CONVERT(P.id,char) AS id, P.name, P.description, P.price, P.image1, P.image2, P.image3, CONVERT(P.id_category, char) AS id_category
        FROM products AS P
        WHERE P.id_category = ?
    `;
    db.query(
        sql,
        [id_category],
        (err,data)=>{
            if(err){
                console.log("Error : ",err)
                result(err,null)
            }
            else{
                console.log("Products: ", data)
                result(null,data)
            }
        }
    )
}

Product.findByNameAndCategory = (name,id_category, result)=>{
    const sql = `
        SELECT CONVERT(P.id,char) AS id, P.name, P.description, P.price, P.image1, P.image2, P.image3, CONVERT(P.id_category, char) AS id_category
        FROM products AS P
        WHERE P.id_category = ? AND LOWER(P.name) LIKE ?
    `;
    db.query(
        sql,
        [id_category,`%${name.toLowerCase()}%`],
        (err,data)=>{
            if(err){
                console.log("Error : ",err)
                result(err,null)
            }
            else{
                console.log("Products: ", data)
                result(null,data)
            }
        }
    )
}

module.exports = Product;