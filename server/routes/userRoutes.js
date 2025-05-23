import { Router } from "express";
import {validatePassword} from '../middleware/validationMiddleware.js'
const router = Router();
import {
  createUser,
  deleteUser,
  findUserByEmail,
  getAllUsers,
  getUser,
  login,
  updateUser,
  verifyToken,
} from "../controller/userController.js";
router.route("/").get(getAllUsers).post(validatePassword,createUser);
router.route("/:id").delete(deleteUser).patch(updateUser).get(getUser);
router.route("/find/user").get(findUserByEmail)
router.route("/login/user").post(login)
router.route("/verifytoken/user").get(verifyToken)


// localhost:5000/user/
export default router;
