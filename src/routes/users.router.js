import { Router } from "express";
import passport from "passport";
import '../passport/passportStrategies.js'
import { signupUser, loginUser, getGithub, logout, changePassword, changeRole } from "../controllers/users.controller.js";


const usersRouter = Router()
// const productManager = new ProductManager() 

usersRouter.post('/signup', signupUser)

usersRouter.post('/login', loginUser)
// admin: 'adminCoder@coder.com','adminCod3r123'

usersRouter.post('/changePassword', changePassword)

usersRouter.put('/premium/:uid', changeRole)

usersRouter.get(
    '/loginGithub',
    passport.authenticate('githubLogin', { scope: ['user:email'] })
);

usersRouter.get(
    "/github",
    passport.authenticate("githubLogin", { failureRedirect: "/errorLogin" }),
    getGithub
);


usersRouter.get('/logout', logout)

export default usersRouter