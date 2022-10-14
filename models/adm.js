const db = require('../configuration/dbConfig')

module.exports ={
    findByUsername: async(username)=>{
        return new Promise(function(resolve, reject) {
            db.any(
                "select id, username, password from  admin_tbl where username=($1)",[username]
            )
            .then(function(result) { 
                resolve(result);
             })
            .catch(function(err) { 
                reject(err)
            })
        });
    }



}