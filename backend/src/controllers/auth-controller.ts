import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import { UserService } from "../service/user-service";
interface CustomRequest extends Request {
    user?: any;
}
export class AuthController {

    constructor() {
    }

    register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const userService = new UserService();

        let user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        try {
            const existingUser = await userService.findByEmail(email);
            if (existingUser) {
                return res.status(409).send('Email already in use');
            }
            user = await userService.createUser(user);
        } catch (e) {
            return res.status(500).send('An error occurred');
        }

        user.password = '';
        res.send(user);
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userService = new UserService();

        let user: User;
        try {
            user = await userService.findOneOrFail(email);
        } catch (error) {
            return res.status(404).send('User not found');
        }

        console.log(password, user.password);
        if (password !== user.password) {
            return res.status(401).send('Incorrect Password');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.send({ token });
    };

    getCurrentUser = async (req: CustomRequest, res: Response) => {
        const userService = new UserService();

        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }

        try {
            const user = await userService.findOneOrFailToken({ where: { id: req.user.userId } });
            return res.send(user);
        } catch (error) {
            return res.status(401).send('Invalid token');
        }
    };


}
