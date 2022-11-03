const { resolve, reject } = require('bluebird');
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
    findStudenDetails: async(studenet_info)=>{
        return new Promise((resolve,reject)=>{
            db.any("select * from student_table where stdnt_class =($1) and stdnt_sec=($2) and stdnt_roll_no=($3) ",
            [
                studenet_info.stdnt_class,
                studenet_info.stdnt_sec,
                studenet_info.stdnt_roll_no
            ]
            )
            .then(data=>{
                console.log(data);
                if(data.length > 0){
                    resolve({success: true})
                }else{
                    resolve({success:false})
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    },

    addStudentInfo:async(student_data)=>{
        // console.log("student_data", student_data);
        return new Promise((resolve,reject)=>{
            db.one(
                "INSERT INTO student_table(stdnt_class,stdnt_roll_no,stdnt_sec,stdnt_name,status) VALUES ($1,$2,$3,$4,$5) RETURNING student_id",
                [
                    student_data.stdnt_class,
                    student_data.stdnt_roll_no,
                    student_data.stdnt_sec,
                    student_data.stdnt_name,
                    student_data.status
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
                           ( result_part1.sub).trim(),
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

    getStudentDeltails: async()=>{

        return new Promise((resolve, reject)=>{
            db.any("select * from student_table")
            .then(function(result) { 
                // console.log("result",result);
                resolve(result);
             })
            .catch(function(err) { 
                // console.log("err",err);
                reject(err)
            })
        })
    },
    getStudentResultByID: async(id)=>{
        return new Promise((resolve,reject)=>{
            db.any("select * from student_result where student_id=($1)",[id])
            .then((data)=>{
                console.log(data);
                resolve(data)
            })
            .catch((err)=>{
                console.log(err);
                reject(err)
            })
        })
    },

    updateStudentInfo:async(student_info)=>{
        return new Promise((resolve,reject)=>{
            db.result("Update student_table set stdnt_name=($1), stdnt_roll_no=($2), stdnt_sec=($3),stdnt_class=($4) where student_id=($5)",
           [
            student_info.stdnt_name,
            student_info.stdnt_roll_no,
            student_info.stdnt_sec,
            student_info.stdnt_class,
            student_info.student_id
           ]
            )
            .then(data =>{
                // console.log("database",data);
                resolve(data)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
        })
    },

    updateStudentResult: async(result_part1)=>{
        return new Promise((resolve,reject)=>{
            db.result("Update student_result set sub=($1), ba_num=($2), fa_num =($3), oral_num1 =($4), oral_num2=($5) where  student_id=($6) and result_id=($7)",
            [
                result_part1.sub,
                result_part1.BA_num,
                result_part1.FA_num,
                result_part1.Oral_num1,
                result_part1.Oral_num2,
                result_part1.student_id,
                result_part1.result_id,
            ]
            )
            .then((data)=>{
                console.log("database",data);
                resolve(data)
            })
            .catch((err)=>{
                console.log(err)
                reject(err)
            })
        })
    },

    deleteResult: async(id)=>{
        return new Promise((resolve,reject)=>{
            db.result("Update student_table set status='t' where student_id=($1)", [id])
            .then((data)=>{
                console.log(data);
                resolve(data);
            
            })
            .catch((err)=>{
                console.log(err);
                reject(err)
            })
        })
    }

    



}