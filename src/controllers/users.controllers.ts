import { Request, Response } from "express";
import { UsersRepo } from "../use-cases";
import mongoose from "mongoose";
import { User } from "../schema-entities/interRefs";

export async function createUser(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        console.log("creating user");
        // make sure to validate especially req.body to ensure data correctness

        // const data = new User(req.body);

        // const connection = req.dbConn;

        // const created = await UsersRepo.createUser(connection, data);

        return res.success!({
            data: "Hello world",
            message: "Thats good",
            code: 201,
        });
    } catch (err: any) {
        console.log(err);
        return res.internalServerError!({
            data: err?.toString(),
            message: err?.message,
        });
    }
}

export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        // const dbConn = req?.dbConn!;

        // const data = await UsersRepo.findUsers(dbConn, {});

        return res.success!({
            data: "Hello world",
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        const companyid: string | undefined = req.params?.id;

        const newUserData = new User({
            email: "newuser@email.co",
            fullName: "New user first",
            password: "new user encrypted password",
            phone: "+971564897312",
            manager: new mongoose.Types.ObjectId("65ac73be9e0cdd0217482069"),
            whatsApp: "+971564987236",
            company: "65ac73be9e0cdd0217482068",
        });

        const addedUser = await UsersRepo.createUser(req?.dbConn!, newUserData);

        return res.success!({
            data: {
                message: `Hello you are getting single user data: ${companyid}`,
                ...addedUser,
            },
        });
    } catch (err: any) {
        console.error(err);
        return res.internalServerError!({
            message: err?.message,
        });
    }
}

export const addUser = async function (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const body = req.body;
        console.log(body);
        return res.success!({
            data: { ...body },
        });
    } catch (err: any) {
        return res.internalServerError!({ message: err?.message });
    }
};
export const updateUser = async function (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const body = req.body;
        const userId: string | undefined = req.params?.id;
        return res.success!({
            data: { ...body, updatedUserId: userId },
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
};
export const deleteUser = async function (
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const userId: string | undefined = req.params?.id;
        return res.success!({
            data: {
                deletedUser: userId,
            },
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
};
