import { Router } from "express";
const router = Router();
import { createUser, deleteUser, getAllUsers, updateUser } from "../controller/userController.js";

router.route('/').get(getAllUsers)
router.route('/:id').post(createUser).delete(deleteUser).patch(updateUser)

export default router;