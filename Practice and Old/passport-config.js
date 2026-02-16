import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from 'bcrypt';


function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        console.log("LOGIN ATTEMPT", email)
        
        const user = getUserByEmail(email);
        console.log(`user ${user}`)
        if (user == null){
            return done(null, false, {message: 'No user with that email.'})
        }

        try{
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect'})
            }
        }
        catch (e){
            console.log(e)
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.email))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
    })
}

export default initialize;