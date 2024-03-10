import { Request, Response, Router } from "express";

// Routers
import usersRoutes from "./usersRoutes";
import teamsRoutes from "./teamsRoutes";
import { updateDatabaseConnections } from "../utils/db";

const router = Router();

// router.use(async (req: Request, res: Response, next) => {
//     try {
//         const authUser = req?.user ?? {
//             email: "65ac73be9e0cdd0217482068_users_db",
//         };

//         const dbConn = updateDatabaseConnections(authUser?.email);

//         req.dbConn = dbConn;
//         next();
//     } catch (err) {
//         const errorMessage = new Error("Internal server error");
//         next(errorMessage);
//     }
// });

router.use("/", usersRoutes);
router.use("/teams", teamsRoutes);

export default router;
