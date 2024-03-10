import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    return res.success!({
        code: 201,
        data: {
            message: "Teams gotten successfully",
        },
    });
});

export default router;
