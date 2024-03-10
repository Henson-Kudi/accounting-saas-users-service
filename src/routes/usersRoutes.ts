import { Router } from "express";
import { UsersController } from "../controllers";

const router = Router();

router.route("/").get(UsersController.getUsers)
// .post(UsersController.addUser);
// router
//     .route("/:id")
//     .get(UsersController.getUser)
//     .put(UsersController.updateUser)
//     .delete(UsersController.deleteUser);

export default router;
