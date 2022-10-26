const db = require('../configuration/dbConfig')

module.exports ={
    findByUsername: async(username)=>{
        return new Promise(function(resolve, reject) {
            db.any(
                "select id, username, password from  admin_tbl where username=($1)",[username]
            )
            .then(function(result) { 
                // console.log("result",result);
                resolve(result);
             })
            .catch(function(err) { 
                // console.log("err",err);
                reject(err)
            })
        });


    },
    	findByAdminId: async (id) => {
		return new Promise(function (resolve, reject) {
			db.any("select * from admin_tbl where id=($1) and status='1'", [id])
				.then(function (data) {
                    // console.log(data);
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

    addStudentInfo:async(student_data)=>{
        // console.log("student_data", student_data);
        return new Promise((resolve,reject)=>{
            db.one(
                "INSERT INTO student_table(stdnt_class,stdnt_roll_no,stdnt_sec,stdnt_name) VALUES ($1,$2,$3,$4) RETURNING student_id",
                [
                    student_data.stdnt_class,
                    student_data.stdnt_roll_no,
                    student_data.stdnt_sec,
                    student_data.stdnt_name
                ]
            )
            .then(function (data) {
                // console.log(data)
                resolve(data);
            })
            .catch(function (err) {
               console.log(err);
                reject(err);
            });
        })
    },
    addStudentResult:async(student_data,result_part1)=>{
        // console.log("result_part1", result_part1);
              return  new Promise((resolve,reject)=>{
                    db.one(
                        "INSERT INTO student_result(sub,BA_num,FA_num,Oral_num1,Oral_num2,student_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING result_id",
                        [
                            result_part1.sub,
                            result_part1.BA_num,
                            result_part1.FA_num,
                            result_part1.Oral_num1,
                            result_part1.Oral_num2,
                            student_data.student_id
                    
                        ]
                    )
                    .then(function (data) {
                        console.log(data)
                        resolve(data);
                    })
                    .catch(function (err) {
                       console.log(err);
                        reject(err);
                    });
                })


    },

    



}