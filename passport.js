const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Adm = require('./models/adm')


isValidPassword = async function (newPassword, existiongPassword) {
    try {
        
        return await bcrypt.compare(newPassword, existiongPassword);
    } catch (error) {
        throw new Error(error);
    }
}

passport.use("localAdm",
    new LocalStrategy(async(username,password,done)=>{
        console.log(username)
        try {
            const user = await Adm.findByUsername(username)
            console.log("user", user)
            if(user.length > 0) {
                console.log("password",password)
                const isMatch = await isValidPassword(password,user[0].password);
                // console.log(isMatch)
                if(!isMatch){
                    return done(null,{id:0,});
                }
                done(null,user[0]);
            }else{
                return done(null,{id:0,});
            }
        } catch (error) {
            done(error,false);
        }
    })
)