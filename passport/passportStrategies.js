import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersModel } from "../src/dao/models/users.model.js";
import {hashPassword, comparePasswords} from '../utils.js';
import { Strategy as GitHubStrategy } from "passport-github2";

//passport local
passport.use('signup', new LocalStrategy({
    usernameField: 'email',//especificar que mi campo no es username, sino email
    passwordField: 'password',
    passReqToCallback: true //habilita recibir toda la info por req
},async(req, email, password, done)=>{
    const user = await usersModel.find({email})
    if(user.length!==0){
        return done(null, false)
    }
    const hashNewPassword = await hashPassword(password)
    const newUser = {...req.body, password:hashNewPassword}
    //guardado del hash
    const newUserBD = await usersModel.create(newUser)
    done(null, newUserBD)
}))


passport.use('login', new LocalStrategy({
    usernameField: 'email',//especificar que mi campo no es username, sino email
    passwordField: 'password',
    passReqToCallback: true //habilita recibir toda la info por req
},async(req, email, password, done)=>{
    const user = await usersModel.findOne({email})
    if(user.length!==0){
        const isPass = await comparePasswords(password, user.password)
        if(isPass){
        return done(null, user)
        }
    }else{
        return done(null, false)
    }
}))


//passport github
passport.use('githubLogin', new GitHubStrategy({
    clientID: 'Iv1.ace2735b78049d89',
    clientSecret: '6b3465805c90ef9107705ce01a05442a0f39f4ec',
    callbackURL: "http://localhost:8080/users/github"
  }, async (accessToken, refreshToken, profile, done) => {
    const usuario = await usersModel.findOne({email:profile._json.email})
    return done(null, usuario)
  }
));





//siempre setear estas dos funciones por default para funcionar internamente
//1
passport.serializeUser((user, done)=>{
    done(null, user._id)
})
//2
passport.deserializeUser(async(_id, done)=>{
    const user = await usersModel.findById(_id)
    done(null, user)
})