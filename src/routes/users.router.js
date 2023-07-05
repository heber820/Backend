import { Router } from "express";
import passport from "passport";
import '../passport/passportStrategies.js'
import { signupUser, loginUser, getGithub, logout, changePassword, changeRole, uploadDocs } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.js";

const usersRouter = Router()

//POST

usersRouter.post('/signup', signupUser)

usersRouter.post('/login', loginUser)

usersRouter.post('/changePassword', changePassword)

const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'product', maxCount: 10 }, { name: 'identification', maxCount: 1 }, { name: 'address', maxCount: 1 }, { name: 'account', maxCount: 1 }])
usersRouter.post('/:uid/documents', cpUpload, uploadDocs)

//PUT
usersRouter.put('/premium/:uid', changeRole)

//GET
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