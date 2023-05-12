import { Request, Response } from "express";
import { User } from "src/users/entities/user.entity";
import { ContextUser } from "./contextUser.entity";
type Ctx = {
    req: Request & {
        user?: ContextUser;
    };
    res: Response;
    user?: User;
};
export default Ctx;
