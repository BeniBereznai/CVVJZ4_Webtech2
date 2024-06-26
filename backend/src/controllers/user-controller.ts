import { Request, Response } from "express";
import { UserService } from "../service/user-service";
import { CustomRequest } from "../model/customer-request";


export class UserController {
    async getAll(req: Request, res: Response) {
        const userService = new UserService();
        const users = await userService.getAllUsers();
        res.send(users);
    }

    async update(req, res) {
        const userService = new UserService();

        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }

        try {
            const user = await userService.findOneOrFailToken({ where: { id: req.user.userId } });
            const updatedUser = await userService.updateUser(req.user.userId, req.body);
            return res.send(updatedUser);
        } catch (error) {
            return res.status(500).send({ error: 'An error occurred while updating the user.' });
        }
    }

    async delete(req: CustomRequest, res: Response) {
        const userService = new UserService();
        const user = await userService.findOneOrFailToken({ where: { id: req.user.userId } });

        await userService.deleteUser(Number(user.id));
        res.send({ message: "User deleted" });
    }
}
