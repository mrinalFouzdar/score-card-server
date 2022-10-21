const db = require('../configuration/dbConfig')

module.exports ={
    findByUsername: async(username)=>{
        return new Promise(function(resolve, reject) {
            db.any(
                "select id, username, password from  admin_tbl where username=($1)",[username]
            )
            .then(function(result) { 
                console.log("result",result);
                resolve(result);
             })
            .catch(function(err) { 
                console.log("err",err);
                reject(err)
            })
        });
    },
    	findByAdminId: async (id) => {
		return new Promise(function (resolve, reject) {
			db.any("select * from admin_tbl where id=($1) and status='1'", [id])
				.then(function (data) {
                    console.log(data);
					resolve(data);

				})
				.catch(function (err) {
                    console.log(err);
					var errorText = common.getErrorText(err);
					var error = new Error(errorText);
					reject(error);
				});
		});
	},



}