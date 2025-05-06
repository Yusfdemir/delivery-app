const db = require("../config/config")

const roles={
    getUserRoles(userId,callback){
        const sql = `
            SELECT R.name
            FROM roles R
            INNER JOIN user_has_roles UHR
            ON UHR.id_role = R.id
            WHERE UHR.id_user = ?
        `;
        db.query(
            sql,
            [userId],
            (err,roles)=>{
                if(err){
                    return callback(err,null)
                }
                callback(null,roles)
            }
        )
    },

    hasRole(userId,roleName,callback){
        this.getUserRoles(userId,(err,roles)=>{
            if(err){
                return callback(err,false)
            }

            const hasRole= roles.some(role => role.name === roleName)
            callback(null,hasRole)
        })
    }
}

module.exports = roles;