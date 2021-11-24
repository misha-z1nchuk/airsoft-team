import {Router} from "express";
const router = Router();
import {UserService} from "../services/UserService";
import userController from '../controllers/userController'

router.post('/registration', userController.registration)


module.exports = router
