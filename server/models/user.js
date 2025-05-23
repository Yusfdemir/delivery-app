const db = require('../config/config')
const bcrypt = require('bcryptjs')

const User = {};

User.create = async (user,result)=>{
    const hash = await bcrypt.hash(user.password,10)
    const sql = `
        INSERT INTO users (email, name, lastname, phone, image, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    db.query(
        sql,
        [user.email,user.name,user.lastname,user.phone,user.image,hash,new Date(),new Date()],
        (err,res)=>{
            if(err){
                console.log("Error ", err)
                result(err,null)
            }
            else{
                console.log("Success Created ", res.insertId);
                result(null,res.insertId)
            }
        }
    )
}

User.findByEmail = (email,result)=>{
    const sql = `
        SELECT U.id, U.email, U.name, U.lastname, U.image, U.phone, U.password, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char),
                    'name',R.name,
                    'image',R.image,
                    'route',R.route
                )
            ) AS roles
        FROM users AS U
        INNER JOIN user_has_roles AS UHR
        ON UHR.id_user = U.id
        INNER JOIN roles AS R
        ON UHR.id_role = R.id
        WHERE email = ?
        GROUP BY U.id
    `;
    db.query(
        sql,
        [email],
        (err,user)=>{
            if(err){
                console.log("Error ", err)
                result(err,null)
            }
            else{
                console.log('User Role Defined',user[0]);
                result(null,user[0]);
            }
        }
    )
}

User.findById = (id,result)=>{
    const sql = `
        SELECT U.id, U.email, U.name, U.lastname, U.image, U.phone, U.password, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char),
                    'name',R.name,
                    'image',R.image,
                    'route',R.route
                )
            ) AS roles
        FROM users AS U
        INNER JOIN user_has_roles AS UHR
        ON UHR.id_user = U.id
        INNER JOIN roles AS R
        ON UHR.id_role = R.id
        WHERE U.id = ?
        GROUP BY U.id
    `;
    db.query(
        sql,
        [id],
        (err,user)=>{
            if(err){
                console.log("Error ", err)
                result(err,null)
            }
            else{
                console.log('User Role Defined',user[0]);
                result(null,user[0]);
            }
        }
    )
}

User.findDeliveryMen = (result)=>{
    const sql = `
        SELECT CONVERT(U.id, char) AS id, U.email, U.name, U.lastname, U.image, U.phone
        FROM users AS U
        INNER JOIN user_has_roles AS UHR
        ON UHR.id_user = U.id
        INNER JOIN roles AS R
        ON R.id = UHR.id_role
        WHERE R.id = 2;
    `;

    db.query(
        sql,
        (err,data)=>{
            if(err){
                console.log("Error ", err)
                result(err,null)
            }
            else{
                result(null,data);
            }
        }
    )
}

module.exports = User;